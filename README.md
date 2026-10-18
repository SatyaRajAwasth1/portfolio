# satyarajawasthi.com.np

Personal site: writing, research and projects. Built with Astro, Tailwind and MDX.

```sh
yarn install
yarn dev        # http://localhost:4321
yarn build      # static site in ./dist
```

## Where things live

| What | File |
|---|---|
| Bio, roles, links, "now", experience, education, interests | `src/site.config.ts` |
| Posts | `src/content/blog/<slug>.mdx` |
| Projects (case studies) | `src/content/projects/<slug>.mdx` |
| Log of talks, events, milestones | `src/data/activities.json` |
| Colors and fonts (light and dark) | `src/styles/global.css` (top of file) |
| Post types (formats) and statuses | `src/lib/taxonomy.ts` |

## Built-in features

- **RSS:** `/rss.xml` lists every published post.
- **Social previews:** `src/pages/og` generates a 1200x630 image per post, project, and main page at build time.
- **Search:** `yarn build` runs Pagefind after Astro and writes the index to `dist/pagefind`. Search only works on
  the built site (`yarn build && yarn preview`), not in `yarn dev`.
- **Comments:** Giscus, configured under `giscus` in `src/site.config.ts`. Comments stay hidden until the IDs are set.

## Adding content

```sh
yarn new post "Title of the post"
yarn new post "Raft, read closely" --format deep-dives
yarn new project "SwiftCache"
```

New files start with `draft: true`: they show in `yarn dev` but not in the production build.
Remove the line to publish.

### Post frontmatter

```yaml
title: "..."
description: "..."            # shown under the title and in link previews
date: "2026-10-18"
updated: "2026-11-02"         # optional
format: "deep-dives"          # engineering-diaries | deep-dives | reviews-opinions | quick-overviews | best-practices | research-notes
status: "evolving"            # optional: draft | evolving | evergreen
tags: ["distributed-systems"]
featured: true                # optional: pin to the home page
showTOC: true                 # optional: defaults to on when a post has 3+ headings
```

Every post has one format (its type, shown highlighted in listings) and any number of tags (its subjects).
Add a new format in `src/lib/taxonomy.ts`.

`deep-dives`, `research-notes` and `quick-overviews` posts get the research header: status, updated date, and a
"Cite this" block with BibTeX. The other formats get a lighter header.

### Project frontmatter

```yaml
title: "SwiftCache"
summary: "One line on what it is."
date: "2025-12-01"
area: "Storage systems"
type: "engineering"           # engineering | research | open-source
role: "Final-year major project"
stack: ["Go", "Redis protocol"]
tags: ["distributed-systems"]
links:
  repo: "https://github.com/you/swiftcache"   # shown as the Source link; "Not public yet" when missing
  paper: "https://..."                        # optional
  demo: "https://..."                         # optional
```

### Components available in every post

```mdx
<Callout type="info|warning|error|success" title="Optional">Text</Callout>
<Note>Text</Note>
<Quote author="Leslie Lamport">A distributed system is one in which ...</Quote>
<Figure src="/images/x.png" alt="..." caption="..." number={1} />
<Sidenote>Shown in small type below the line it annotates.</Sidenote>
<References items={[{ label: "Lamport, L. Time, Clocks ... 1978.", href: "https://..." }]} />
```
