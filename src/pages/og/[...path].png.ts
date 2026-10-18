// Builds a social preview image for every post, project, and main page, e.g. /og/writing/mcp-overview.png.
import type { APIRoute, GetStaticPaths } from "astro";
import { renderOgImage, type OgCard } from "../../lib/og";
import { getPosts, getProjects } from "../../lib/content";
import { FORMATS, PROJECT_TYPES } from "../../lib/taxonomy";
import { site } from "../../site.config";

export const getStaticPaths: GetStaticPaths = async () => {
  const pages: { path: string; card: OgCard }[] = [
    { path: "default", card: { title: site.name, description: site.description } },
    { path: "writing", card: { label: "Writing", title: "Deep dives, overviews, opinions, and lessons from building software" } },
    { path: "research", card: { label: "Research", title: "Software engineering, programming systems, databases, and distributed systems" } },
    { path: "projects", card: { label: "Projects", title: "Projects and prototypes built while exploring and learning" } },
    { path: "about", card: { label: "About", title: site.name, description: site.description } },
  ];
  for (const post of await getPosts()) {
    pages.push({
      path: `writing/${post.slug}`,
      card: { label: FORMATS[post.data.format].label, title: post.data.title, description: post.data.description },
    });
  }
  for (const project of await getProjects()) {
    pages.push({
      path: `projects/${project.slug}`,
      card: { label: `${PROJECT_TYPES[project.data.type].label} project`, title: project.data.title, description: project.data.summary },
    });
  }
  return pages.map(({ path, card }) => ({ params: { path }, props: { card } }));
};

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgImage((props as { card: OgCard }).card);
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
