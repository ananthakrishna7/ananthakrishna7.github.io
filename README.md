# Portfolio

A static bilingual portfolio built with Hugo and styled with light and dark palettes based on IBM Carbon, with IBM Plex. GitHub Actions deploys the generated site to GitHub Pages.

## Run locally

Use Hugo 0.170.1 (standard or extended).

```sh
hugo server
```

`hugo --minify` builds into `.pages/`. In GitHub Pages settings, select **GitHub Actions** as the source if it is not already selected. Pull requests run the build. The `main` branch deploys it.

## Update the site

- Edit `content/resume.md` and `content/resume.ja.md` for the English and Japanese résumé. Both can be printed or saved as a PDF from the browser.
- The projects page uses `data/projects.json`, a snapshot of public, non-fork repositories. The build refreshes it when GitHub is reachable. Run `python3 scripts/sync-projects.py` to refresh it locally.
- Set `spotify` and `spotifyLabel` in `hugo.toml` to display a public Spotify selection. Add a URL to `donations` to display a support link.
- To display a rotating thoughts panel, add `data/thoughts.json` containing an array of strings.

## Write bilingual blog posts

Each post is an independent Markdown file. English uses plain `.md` and appears under `/blog/`. Japanese uses `.ja.md` and appears under `/ja/blog/`.

```text
content/blog/
├── _index.md          # English blog index
├── _index.ja.md       # Japanese blog index
├── home-lab.md        # English post
├── home-lab.ja.md     # Optional Japanese counterpart written in your own words
└── origami.ja.md      # Japanese-only post
```

A matching basename pairs the pages so the language switch opens the counterpart. To use different filenames or slugs for a pair, set the same `translationKey` in both files. For an independent post, use its own basename and omit `translationKey`. The language switch on an unpaired post opens the other language's blog index.

Create a Japanese draft with `hugo new content blog/origami.ja.md` and change its title, summary, and body. Preview drafts with `hugo server -D`; publish by removing `draft: true`. The blog graph uses links in the Markdown.

IBM Plex is distributed under the SIL Open Font License. See `static/fonts/OFL.txt`.

The footer uses [IBM Carbon icons](https://github.com/carbon-design-system/carbon/tree/bec2dad9deecded6c3e397c799571e3e57bc9bc2/packages/icons/src/svg/32) under the Apache License 2.0. See `static/icons/carbon/LICENSE`.
