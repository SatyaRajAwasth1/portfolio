// Every post has one format (its type, shown highlighted) and any number of tags (its subjects).
// Add a format here and it appears everywhere.

// `header` picks the post header style: "research" adds status, updated date, and a
// citation block; "practical" keeps it light.
export const FORMATS = {
  "engineering-diaries": {
    label: "Engineering Diaries",
    description: "Personal stories and lessons from real-world software engineering.",
    header: "practical",
  },
  "deep-dives": {
    label: "Deep Dives",
    description: "In-depth technical explorations of technologies, patterns or concepts.",
    header: "research",
  },
  "reviews-opinions": {
    label: "Tech Reviews & Opinions",
    description: "Insights, critiques, and opinions on tools, frameworks, and trends.",
    header: "practical",
  },
  "quick-overviews": {
    label: "Quick Overviews",
    description: "Concise introductions to new technologies or concepts.",
    header: "research",
  },
  "best-practices": {
    label: "Best Practices",
    description: "Practical guidance that has held up in production.",
    header: "practical",
  },
  "research-notes": {
    label: "Research Notes",
    description: "Notes on papers, experiments, and open questions.",
    header: "research",
  },
} as const;

export type Format = keyof typeof FORMATS;
export const FORMAT_IDS = Object.keys(FORMATS) as [Format, ...Format[]];

export const STATUSES = {
  draft: { label: "Draft", hint: "Early thinking, likely to change" },
  evolving: { label: "Evolving", hint: "The core ideas are stable, details may change" },
  evergreen: { label: "Evergreen", hint: "Settled and kept up to date" },
} as const;

export type Status = keyof typeof STATUSES;
export const STATUS_IDS = Object.keys(STATUSES) as [Status, ...Status[]];

// Project types, shown highlighted on project listings.
export const PROJECT_TYPES = {
  engineering: { label: "Engineering" },
  research: { label: "Research" },
  "open-source": { label: "Open Source" },
} as const;
