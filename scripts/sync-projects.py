"""Refresh the public, non-fork GitHub repositories used by Hugo."""
import json
import os
from pathlib import Path
from urllib.request import Request, urlopen

OWNER = "ananthakrishna7"
SITE = f"{OWNER}.github.io"
OUTPUT = Path(__file__).resolve().parent.parent / "data" / "projects.json"


def main():
    headers = {"Accept": "application/vnd.github+json", "User-Agent": "hugo-portfolio"}
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        headers["Authorization"] = f"Bearer {token}"

    projects = []
    next_page = f"https://api.github.com/users/{OWNER}/repos?type=owner&sort=pushed&per_page=100"
    while next_page:
        request = Request(next_page, headers=headers)
        with urlopen(request, timeout=15) as response:
            for repo in json.load(response):
                if repo["private"] or repo["fork"] or repo["name"] == SITE:
                    continue
                projects.append({
                    "name": repo["name"],
                    "url": repo["html_url"],
                    "description": repo["description"],
                    "language": repo["language"],
                    "stars": repo["stargazers_count"],
                    "forks": repo["forks_count"],
                    "archived": repo["archived"],
                })

            next_page = next((
                entry.split(";")[0].strip(" <>")
                for entry in response.headers.get("Link", "").split(",")
                if 'rel="next"' in entry
            ), None)

    # Keep the three featured projects first, followed by the other public repos.
    featured = ["ragnarok", "placements-knowledgebase", "finances-mern"]
    projects.sort(key=lambda repo: (
        repo["archived"],
        featured.index(repo["name"]) if repo["name"] in featured else len(featured),
    ))
    OUTPUT.write_text(json.dumps(projects, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
