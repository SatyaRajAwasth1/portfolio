#!/usr/bin/env node
// Creates a new post or project with its frontmatter filled in.
//   yarn new post "Consensus without the math"
//   yarn new post "Raft, read closely" --format deep-dives
//   yarn new project "SwiftCache"
// Formats are defined in src/lib/taxonomy.ts.
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FORMATS = ["engineering-diaries", "deep-dives", "reviews-opinions", "quick-overviews", "best-practices", "research-notes"];

const [type, ...rest] = process.argv.slice(2);
function flag(name, fallback) {
  const i = rest.indexOf(name);
  return i >= 0 ? rest.splice(i, 2)[1] : fallback;
}
const format = flag("--format", "engineering-diaries");
const title = rest.join(" ").trim();

if (!["post", "project"].includes(type) || !title) {
  console.error('Usage: yarn new <post|project> "Title" [--format <format>]');
  process.exit(1);
}
if (type === "post" && !FORMATS.includes(format)) {
  console.error(`Unknown format "${format}". Use one of: ${FORMATS.join(", ")}`);
  process.exit(1);
}

const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const today = new Date().toISOString().slice(0, 10);
const dir = join("src", "content", type === "post" ? "blog" : "projects");
const file = join(dir, `${slug}.mdx`);

if (existsSync(file)) {
  console.error(`${file} already exists.`);
  process.exit(1);
}

const researchStyle = ["deep-dives", "research-notes", "quick-overviews"].includes(format);

const post = `---
title: "${title}"
description: ""
date: "${today}"
format: "${format}"
${researchStyle ? 'status: "draft"\n' : ""}tags: []
draft: true
---

Start writing here. Remove \`draft: true\` when it is ready to publish.
`;

const project = `---
title: "${title}"
summary: ""
date: "${today}"
area: ""
type: "engineering"
role: ""
stack: []
tags: []
draft: true
---

## Overview

What the project is and the problem it addresses.

{/*
  Add sections as you write them up. Suggested structure:
  ## Design      How it works.
  ## Trade-offs  What you chose not to do, and why.
  ## Outcome     Results, what you learned, what you would change.
*/}
`;

mkdirSync(dir, { recursive: true });
writeFileSync(file, type === "post" ? post : project);
console.log(`Created ${file}`);
