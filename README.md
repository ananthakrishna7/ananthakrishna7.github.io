# Portfolio

A static bilingual portfolio built with Hugo and styled with IBM Carbon Gray 100 colors and IBM Plex. GitHub Actions deploys the generated site to GitHub Pages.

## Run locally

Use Hugo 0.170.1 (standard or extended).

```sh
hugo server
```

`hugo --minify` builds into `.pages/`. In GitHub Pages settings, select **GitHub Actions** as the source if it is not already selected. Pull requests run the build. The `main` branch deploys it.

## Update the site

- Edit `content/resume.md` and `content/resume.ja.md` for the English and Japanese résumé. Both can be printed or saved as a PDF from the browser.
- Run `hugo new content blog/my-post.md` to draft a post. Publish by removing `draft: true`. Use a matching `my-post.ja.md` for a Japanese translation. Markdown links to other posts and external references appear as edges in the blog graph.
- The projects page uses `data/projects.json`, a snapshot of public, non-fork repositories. The build refreshes it when GitHub is reachable. Run `python3 scripts/sync-projects.py` to refresh it locally.
- Set `spotify` and `spotifyLabel` in `hugo.toml` to display a public Spotify selection. Add a URL to `donations` to display a support link.
- To display a rotating thoughts panel, add `data/thoughts.json` containing an array of strings.

IBM Plex is distributed under the SIL Open Font License. See `static/fonts/OFL.txt`.
