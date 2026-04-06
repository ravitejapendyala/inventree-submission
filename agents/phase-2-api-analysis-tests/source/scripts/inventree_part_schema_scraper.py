#!/usr/bin/env python3
"""
Scrape the InvenTree Parts & Part Categories API schema page and document all
endpoint schemas into Markdown and JSON.

Target page:
    https://docs.inventree.org/en/stable/api/schema/part/

What it extracts:
- Every endpoint listed on the page (e.g. GET /api/part/, POST /api/part/category/)
- Description text
- Input parameters table
- Request body examples and request-body schema blocks
- Response codes, examples, and response-body schema blocks
- Optional schema reference section from the "Schemas" area

Outputs:
- inventree_part_api_schema.md
- inventree_part_api_schema.json

Usage:
    python inventree_part_schema_scraper.py
    python inventree_part_schema_scraper.py --url https://docs.inventree.org/en/stable/api/schema/part/
    python inventree_part_schema_scraper.py --outdir ./outputs/phase-2/source/schema

Dependencies:
    pip install requests beautifulsoup4

Notes:
- This scraper is built for the InvenTree docs page structure shown in the API
  schema documentation. It is intentionally defensive and uses multiple parsing
  fallbacks.
- If the site changes its HTML structure, selectors in this script may need small
  adjustments.
"""

from __future__ import annotations

import argparse
import json
import re
from dataclasses import asdict, dataclass, field
from pathlib import Path
from typing import List, Optional

import requests
from bs4 import BeautifulSoup, Tag

DEFAULT_URL = "https://docs.inventree.org/en/stable/api/schema/part/"
HEADING_RE = re.compile(r"^(GET|POST|PUT|PATCH|DELETE|OPTIONS|HEAD)\s+(/\S+)$")


@dataclass
class Parameter:
    name: str = ""
    location: str = ""
    type: str = ""
    default: str = ""
    nullable: str = ""
    description: str = ""


@dataclass
class ResponseBlock:
    status: str = ""
    content_type: str = ""
    example: str = ""
    schema: str = ""


@dataclass
class EndpointDoc:
    method: str
    path: str
    anchor: str = ""
    description: str = ""
    input_parameters: List[Parameter] = field(default_factory=list)
    request_content_types: List[str] = field(default_factory=list)
    request_example: str = ""
    request_schema: str = ""
    responses: List[ResponseBlock] = field(default_factory=list)


def fetch_html(url: str, timeout: int = 60) -> str:
    headers = {
        "User-Agent": "Mozilla/5.0 (compatible; InvenTreeSchemaScraper/1.0)",
        "Accept-Language": "en-US,en;q=0.9",
    }
    resp = requests.get(url, headers=headers, timeout=timeout)
    resp.raise_for_status()
    return resp.text


def clean_text(text: str) -> str:
    text = text.replace("¶", "").replace("⚠️", "Warning:")
    text = re.sub(r"\r\n?", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def get_heading_text(tag: Tag) -> str:
    return clean_text(" ".join(tag.stripped_strings))


def is_endpoint_heading(tag: Tag) -> bool:
    if not isinstance(tag, Tag):
        return False
    if tag.name not in {"h1", "h2", "h3", "h4"}:
        return False
    return HEADING_RE.match(get_heading_text(tag)) is not None


def nearest_anchor(tag: Tag) -> str:
    if tag.has_attr("id"):
        return str(tag["id"])
    for child in tag.find_all(True):
        if child.has_attr("id"):
            return str(child["id"])
    return ""


def next_endpoint_heading(tag: Tag) -> Optional[Tag]:
    sib = tag.find_next_sibling()
    while sib:
        if is_endpoint_heading(sib):
            return sib
        sib = sib.find_next_sibling()
    return None


def collect_section_nodes(start_heading: Tag) -> List[Tag]:
    nodes: List[Tag] = []
    sib = start_heading.find_next_sibling()
    while sib:
        if is_endpoint_heading(sib):
            break
        # Stop when main Schemas heading begins after endpoints
        if sib.name in {"h1", "h2"} and get_heading_text(sib).lower() == "schemas":
            break
        nodes.append(sib)
        sib = sib.find_next_sibling()
    return nodes


def extract_pre_text(tag: Optional[Tag]) -> str:
    if not tag:
        return ""
    if tag.name == "pre":
        return clean_text(tag.get_text("\n"))
    pre = tag.find("pre")
    return clean_text(pre.get_text("\n")) if pre else ""


def text_between(nodes: List[Tag], start_label: str, stop_labels: set[str]) -> str:
    out: List[str] = []
    capture = False
    for node in nodes:
        text = get_heading_text(node)
        lowered = text.lower()
        if lowered == start_label.lower():
            capture = True
            continue
        if capture and lowered in {s.lower() for s in stop_labels}:
            break
        if capture:
            if node.name == "pre":
                out.append(clean_text(node.get_text("\n")))
            else:
                val = clean_text(node.get_text(" ", strip=True))
                if val:
                    out.append(val)
    return "\n".join(out).strip()


def parse_parameters_table(table: Tag) -> List[Parameter]:
    params: List[Parameter] = []
    rows = table.find_all("tr")
    if not rows:
        return params

    header_cells = [clean_text(th.get_text(" ", strip=True)).lower() for th in rows[0].find_all(["th", "td"])]
    expected = ["parameter", "in", "type", "default", "nullable", "description"]
    if not any(h in header_cells for h in expected):
        return params

    for row in rows[1:]:
        cells = [clean_text(td.get_text(" ", strip=True)) for td in row.find_all(["td", "th"])]
        if not cells:
            continue
        while len(cells) < 6:
            cells.append("")
        params.append(
            Parameter(
                name=cells[0],
                location=cells[1],
                type=cells[2],
                default=cells[3],
                nullable=cells[4],
                description=cells[5],
            )
        )
    return params


def parse_responses(nodes: List[Tag]) -> List[ResponseBlock]:
    responses: List[ResponseBlock] = []
    i = 0
    while i < len(nodes):
        text = get_heading_text(nodes[i])
        if text.startswith("Response "):
            block = ResponseBlock(status=text.replace("Response ", "", 1).strip())
            j = i + 1
            while j < len(nodes):
                t = get_heading_text(nodes[j])
                if t.startswith("Response "):
                    break
                if t.lower() in {"description", "input parameters", "request body"}:
                    j += 1
                    continue
                if not block.content_type and (
                    t.startswith("application/")
                    or t.startswith("multipart/")
                    or t.startswith("text/")
                ):
                    block.content_type = t
                elif t.lower() == "schema of the response body":
                    # Prefer nearest next <pre>
                    k = j + 1
                    while k < len(nodes):
                        if get_heading_text(nodes[k]).startswith("Response "):
                            break
                        schema = extract_pre_text(nodes[k])
                        if schema:
                            block.schema = schema
                            break
                        k += 1
                elif not block.example:
                    example = extract_pre_text(nodes[j])
                    if example:
                        block.example = example
                j += 1
            responses.append(block)
            i = j
            continue
        i += 1
    return responses


def parse_request_body(nodes: List[Tag]) -> tuple[list[str], str, str]:
    content_types: List[str] = []
    request_example = ""
    request_schema = ""

    for idx, node in enumerate(nodes):
        text = get_heading_text(node)
        if text.lower() == "request body":
            j = idx + 1
            while j < len(nodes):
                t = get_heading_text(nodes[j])
                if t.lower() in {"response 200 ok", "response 201 created", "response 204 no content", "response 400 bad request", "response 401 unauthorized", "response 403 forbidden", "response 404 not found", "response 405 method not allowed", "response 500 internal server error"} or t.startswith("Response "):
                    break
                if (
                    t.startswith("application/")
                    or t.startswith("multipart/")
                    or t.startswith("text/")
                ):
                    # Sometimes multiple content types are shown on one line
                    parts = re.findall(r"(?:application|multipart|text)/[\w.+-]+", t)
                    if parts:
                        content_types.extend(parts)
                elif t.lower() == "schema of the request body":
                    k = j + 1
                    while k < len(nodes):
                        nt = get_heading_text(nodes[k])
                        if nt.startswith("Response "):
                            break
                        schema = extract_pre_text(nodes[k])
                        if schema:
                            request_schema = schema
                            break
                        k += 1
                elif not request_example:
                    example = extract_pre_text(nodes[j])
                    if example:
                        request_example = example
                j += 1
            break

    # Deduplicate while preserving order
    unique_ct: List[str] = []
    seen = set()
    for ct in content_types:
        if ct not in seen:
            seen.add(ct)
            unique_ct.append(ct)
    return unique_ct, request_example, request_schema


def parse_endpoint(heading: Tag) -> EndpointDoc:
    heading_text = get_heading_text(heading)
    match = HEADING_RE.match(heading_text)
    if not match:
        raise ValueError(f"Not an endpoint heading: {heading_text}")

    method, path = match.group(1), match.group(2)
    nodes = collect_section_nodes(heading)

    endpoint = EndpointDoc(method=method, path=path, anchor=nearest_anchor(heading))

    # Description
    endpoint.description = text_between(
        nodes,
        start_label="Description",
        stop_labels={"Input parameters", "Request body"},
    )

    # Input parameters table
    for node in nodes:
        if node.name == "table":
            parsed = parse_parameters_table(node)
            if parsed:
                endpoint.input_parameters = parsed
                break

    # Request body
    req_ct, req_ex, req_schema = parse_request_body(nodes)
    endpoint.request_content_types = req_ct
    endpoint.request_example = req_ex
    endpoint.request_schema = req_schema

    # Responses
    endpoint.responses = parse_responses(nodes)

    return endpoint


def parse_schema_reference_section(soup: BeautifulSoup) -> dict:
    result: dict = {}
    schemas_heading = None
    for tag in soup.find_all(["h1", "h2", "h3"]):
        if get_heading_text(tag).lower() == "schemas":
            schemas_heading = tag
            break
    if not schemas_heading:
        return result

    sib = schemas_heading.find_next_sibling()
    current_name = None
    while sib:
        if sib.name in {"h1", "h2"} and sib is not schemas_heading:
            break
        if sib.name in {"h3", "h4"}:
            current_name = get_heading_text(sib)
            result[current_name] = {"description": "", "schema": "", "example": ""}
        elif current_name:
            text = get_heading_text(sib)
            if text.lower() == "schema of the response body":
                result[current_name]["schema"] = extract_pre_text(sib.find_next_sibling())
            elif sib.name == "pre":
                pre = extract_pre_text(sib)
                if pre:
                    if not result[current_name]["example"]:
                        result[current_name]["example"] = pre
                    elif not result[current_name]["schema"]:
                        result[current_name]["schema"] = pre
            else:
                val = clean_text(sib.get_text(" ", strip=True))
                if val and text.lower() != "application/json":
                    existing = result[current_name].get("description", "")
                    result[current_name]["description"] = (existing + "\n" + val).strip()
        sib = sib.find_next_sibling()
    return result


def render_markdown(url: str, endpoints: List[EndpointDoc]) -> str:
    lines: List[str] = []
    lines.append("# InvenTree Parts API Schema Extraction")
    lines.append("")
    lines.append(f"Source: `{url}`")
    lines.append("")
    lines.append(f"Total endpoints extracted: **{len(endpoints)}**")
    lines.append("")
    lines.append("## Endpoint Index")
    lines.append("")
    for ep in endpoints:
        anchor = f"{ep.method.lower()}-{ep.path.strip('/').replace('/', '-').replace('{', '').replace('}', '')}" or ep.method.lower()
        lines.append(f"- [{ep.method} {ep.path}](#{anchor})")
    lines.append("")

    for ep in endpoints:
        anchor = f"{ep.method.lower()}-{ep.path.strip('/').replace('/', '-').replace('{', '').replace('}', '')}" or ep.method.lower()
        lines.append(f"## {ep.method} {ep.path}")
        lines.append(f"<a id=\"{anchor}\"></a>")
        lines.append("")
        if ep.anchor:
            lines.append(f"Doc anchor: `#{ep.anchor}`")
            lines.append("")
        if ep.description:
            lines.append("### Description")
            lines.append("")
            lines.append(ep.description)
            lines.append("")

        lines.append("### Input Parameters")
        lines.append("")
        if ep.input_parameters:
            lines.append("| Name | In | Type | Default | Nullable | Description |")
            lines.append("|---|---|---|---|---|---|")
            for p in ep.input_parameters:
                lines.append(
                    f"| {p.name or ''} | {p.location or ''} | {p.type or ''} | {p.default or ''} | {p.nullable or ''} | {p.description or ''} |"
                )
        else:
            lines.append("No input parameters table found.")
        lines.append("")

        lines.append("### Request Body")
        lines.append("")
        if ep.request_content_types:
            lines.append("Content types: " + ", ".join(f"`{ct}`" for ct in ep.request_content_types))
            lines.append("")
        if ep.request_example:
            lines.append("#### Example")
            lines.append("")
            lines.append("```json")
            lines.append(ep.request_example)
            lines.append("```")
            lines.append("")
        if ep.request_schema:
            lines.append("#### Schema")
            lines.append("")
            lines.append("```json")
            lines.append(ep.request_schema)
            lines.append("```")
            lines.append("")
        if not ep.request_example and not ep.request_schema:
            lines.append("No request body documented for this endpoint.")
            lines.append("")

        lines.append("### Responses")
        lines.append("")
        if ep.responses:
            for resp in ep.responses:
                lines.append(f"#### {resp.status}")
                lines.append("")
                if resp.content_type:
                    lines.append(f"Content type: `{resp.content_type}`")
                    lines.append("")
                if resp.example:
                    lines.append("**Example**")
                    lines.append("")
                    lines.append("```json")
                    lines.append(resp.example)
                    lines.append("```")
                    lines.append("")
                if resp.schema:
                    lines.append("**Schema**")
                    lines.append("")
                    lines.append("```json")
                    lines.append(resp.schema)
                    lines.append("```")
                    lines.append("")
        else:
            lines.append("No response blocks found.")
            lines.append("")

    return "\n".join(lines).strip() + "\n"


def main() -> None:
    parser = argparse.ArgumentParser(description="Scrape InvenTree part API schema page")
    parser.add_argument("--url", default=DEFAULT_URL, help="Schema page URL")
    parser.add_argument("--outdir", default=".", help="Output directory")
    parser.add_argument("--timeout", type=int, default=60, help="HTTP timeout in seconds")
    args = parser.parse_args()

    outdir = Path(args.outdir)
    outdir.mkdir(parents=True, exist_ok=True)

    html = fetch_html(args.url, timeout=args.timeout)
    soup = BeautifulSoup(html, "html.parser")

    endpoints: List[EndpointDoc] = []
    for heading in soup.find_all(["h1", "h2", "h3", "h4"]):
        if is_endpoint_heading(heading):
            try:
                endpoints.append(parse_endpoint(heading))
            except Exception as exc:
                # Keep scraping even if one section is malformed
                print(f"[WARN] Failed to parse endpoint heading '{get_heading_text(heading)}': {exc}")

    endpoints.sort(key=lambda e: (e.path, e.method))

    payload = {
        "source_url": args.url,
        "endpoint_count": len(endpoints),
        "endpoints": [asdict(ep) for ep in endpoints],
        "schema_reference": parse_schema_reference_section(soup),
    }

    md_path = outdir / "inventree_part_api_schema.md"
    json_path = outdir / "inventree_part_api_schema.json"

    md_path.write_text(render_markdown(args.url, endpoints), encoding="utf-8")
    json_path.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")

    print(f"[OK] Markdown written to: {md_path}")
    print(f"[OK] JSON written to:     {json_path}")
    print(f"[OK] Endpoints parsed:    {len(endpoints)}")


if __name__ == "__main__":
    main()
