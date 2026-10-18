import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { site } from "../site.config";
import { getPosts } from "../lib/content";
import { FORMATS } from "../lib/taxonomy";

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: `${site.name}: Writing`,
    description: site.description,
    site: context.site ?? site.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.date),
      link: `/writing/${post.slug}/`,
      categories: [FORMATS[post.data.format].label, ...post.data.tags],
    })),
    customData: "<language>en-us</language>",
  });
}
