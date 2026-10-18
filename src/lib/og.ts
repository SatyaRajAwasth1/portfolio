// Renders the 1200x630 social preview image shown when a page is shared on LinkedIn, X, Slack, etc.
import fs from "node:fs";
import path from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { site } from "../site.config";

const fontDir = path.join(process.cwd(), "node_modules/@fontsource/geist-sans/files");
const font = (weight: number) => fs.readFileSync(path.join(fontDir, `geist-sans-latin-${weight}-normal.woff`));
const fonts = [
  { name: "Geist", data: font(400), weight: 400 as const, style: "normal" as const },
  { name: "Geist", data: font(600), weight: 600 as const, style: "normal" as const },
];

// Same palette as the light theme in global.css.
const color = { paper: "#ffffff", ink: "#111318", ink2: "#4b5160", ink3: "#737a8a", rule: "#e6e8ec", accent: "#2456d3" };

type Node = { type: string; props: Record<string, unknown> & { children?: unknown } };
const h = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
  type,
  props: { style, children },
});

export interface OgCard {
  title: string;
  description?: string;
  // Small blue label above the title, e.g. "Deep Dives" or "Project".
  label?: string;
}

export async function renderOgImage({ title, description, label }: OgCard): Promise<Buffer> {
  const titleSize = title.length > 70 ? 54 : title.length > 40 ? 64 : 76;
  const tree = h(
    "div",
    {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "72px 80px",
      backgroundColor: color.paper,
      fontFamily: "Geist",
      borderTop: `12px solid ${color.accent}`,
    },
    [
      h("div", { display: "flex", flexDirection: "column" }, [
        label ? h("div", { fontSize: 28, fontWeight: 600, color: color.accent, marginBottom: 24 }, label) : null,
        h("div", { fontSize: titleSize, fontWeight: 600, color: color.ink, lineHeight: 1.12, letterSpacing: -1.5 }, title),
        description
          ? h("div", { fontSize: 30, color: color.ink2, lineHeight: 1.4, marginTop: 28, maxWidth: 980 }, description)
          : null,
      ]),
      h(
        "div",
        {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: `2px solid ${color.rule}`,
          paddingTop: 28,
          fontSize: 26,
        },
        [
          h("div", { fontWeight: 600, color: color.ink }, title === site.name ? "Writing, research, and projects" : site.name),
          h("div", { color: color.ink3 }, new URL(site.url).host),
        ],
      ),
    ],
  );

  const svg = await satori(tree as never, { width: 1200, height: 630, fonts });
  return new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
}
