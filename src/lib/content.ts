import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"blog">;
export type Project = CollectionEntry<"projects">;

const isVisible = ({ data }: { data: { draft?: boolean } }) =>
  import.meta.env.PROD ? !data.draft : true;

const byDateDesc = (a: { data: { date: string } }, b: { data: { date: string } }) =>
  b.data.date.localeCompare(a.data.date);

export async function getPosts(): Promise<Post[]> {
  return (await getCollection("blog", isVisible)).sort(byDateDesc);
}

export async function getProjects(): Promise<Project[]> {
  return (await getCollection("projects", isVisible)).sort(byDateDesc);
}

// Featured entries first, then the newest.
export function pickFeatured<T extends { data: { featured?: boolean } }>(items: T[], count: number): T[] {
  const featured = items.filter((i) => i.data.featured);
  const rest = items.filter((i) => !i.data.featured);
  return [...featured, ...rest].slice(0, count);
}

// "2025-05-30" -> "May 30, 2025". Dates are treated as UTC so they never shift a day.
export function formatDate(date: string, style: "long" | "month" = "long"): string {
  const d = new Date(date.length === 7 ? `${date}-01` : date);
  return d.toLocaleDateString("en-US", {
    timeZone: "UTC",
    day: style === "long" ? "numeric" : undefined,
    month: "short",
    year: "numeric",
  });
}

export function readingMinutes(body: string = ""): number {
  const words = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function tagSlug(tag: string): string {
  return tag.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function bibtex(post: Post, url: string, author: string): string {
  const [last, ...rest] = author.split(" ").reverse();
  const firstWord = post.data.title.toLowerCase().match(/[a-z0-9]+/)?.[0] ?? "post";
  const year = post.data.date.slice(0, 4);
  const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  const month = months[Number(post.data.date.slice(5, 7)) - 1];
  return [
    `@online{${last.toLowerCase()}${year}${firstWord},`,
    `  author = {${last}, ${rest.reverse().join(" ")}},`,
    `  title  = {${post.data.title}},`,
    `  year   = {${year}},`,
    `  month  = ${month},`,
    `  url    = {${url}}`,
    `}`,
  ].join("\n");
}

// Splits "text [label](url) and **bold** more" into plain, link, and bold parts for rendering.
export function inlineLinks(text: string): Array<{ text: string; href?: string; strong?: boolean }> {
  const parts: Array<{ text: string; href?: string; strong?: boolean }> = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  for (const m of text.matchAll(re)) {
    if (m.index > last) parts.push({ text: text.slice(last, m.index) });
    parts.push(m[3] ? { text: m[3], strong: true } : { text: m[1], href: m[2] });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last) });
  return parts;
}
