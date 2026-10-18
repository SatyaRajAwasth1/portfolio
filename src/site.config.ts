// Everything about you that appears across the site lives here.
// Edit this file to change your bio, links, "now" status, experience or education.

export const site = {
  name: "Satya Raj Awasthi",
  url: "https://satyarajawasthi.com.np",
  email: "hello@satyarajawasthi.com.np",
  avatar: "https://avatars.githubusercontent.com/u/77236280?v=4",

  // One-line description used in <meta> tags and social previews.
  description:
    "Software engineer and researcher. Writing on backend systems, distributed systems, and software engineering practice.",

  // Introduction shown on the home and about pages. Each string is a paragraph; [text](url) makes a link.
  intro: [
    "I am a Software Engineer, Software Researcher, and Developer Advocate. Currently, I work at [Niural AI](https://www.niural.com) as a Software Engineer II and am pursuing my graduate studies (MSc in Computer Engineering) at [NCIT](https://www.ncit.edu.np).",
    "Previously, I worked at [eSewa](https://www.esewa.com?utm_source=satyarajawasthi_portfolio&utm_medium=referral&utm_campaign=personal_profile) as a Software Engineer, where I contributed to the backend systems of the platform. I was part of various student tech communities and open-source initiatives, including being a [GitHub Campus Expert](https://githubcampus.expert/SatyaRajAwasth1/) and an active member of the [Nepal Open Source Community (NOSK)](https://nosk.org.np). I founded [Nepal Tek Community (NTK)](https://tekcommunity.ncit.edu.np) while I was an undergraduate student of Software Engineering at [Nepal College of Information Technology (NCIT)](https://www.ncit.edu.np), affiliated with [Pokhara University (PU)](https://www.pu.edu.np).",
  ],

  now: {
    updated: "2026-10-18",
    items: [
      "Working as a Software Engineer II at Niural AI.",
      "First year of the MSc in Computer Engineering at NCIT, Pokhara University.",
      "Turning notes from work and coursework into longer write-ups on this site.",
    ],
  },

  research: {
    // Paragraphs shown on /research. [text](url) makes a link and **text** makes it bold.
    interests: [
      "My broad research interests lie in **Software Engineering**, **Programming Systems**, **Databases**, and **Distributed Systems**, and especially in the problems that sit at their intersections.",
      "I am also interested in **applied artificial intelligence and machine learning** where it meets these areas: using AI to build, operate, and improve software systems, and engineering the systems that make AI reliable in practice.",
      "More broadly, I want to understand how we can design and build intelligent, reliable, and adaptive software systems: systems that can monitor, reason about, and improve their own performance and behavior over time.",
    ],
  },

  nav: [
    { label: "Writing", href: "/writing" },
    { label: "Research", href: "/research" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
  ],

  socials: [
    // icon: github | linkedin | x | youtube
    { label: "GitHub", href: "https://github.com/SatyaRajAwasth1", icon: "github" },
    { label: "LinkedIn", href: "https://linkedin.com/in/SatyaRajAwasth1", icon: "linkedin" },
    { label: "X (Twitter)", href: "https://twitter.com/SatyaRajAwasth1", icon: "x" },
    { label: "YouTube", href: "https://www.youtube.com/@SatyaRajAwasth1", icon: "youtube" },
  ],

  // Comments on posts via Giscus (GitHub Discussions). Get these values from https://giscus.app
  // after enabling Discussions on the repo and installing the Giscus app. Leave empty to hide comments.
  giscus: {
    repo: "SatyaRajAwasth1/portfolio",
    repoId: "",
    category: "",
    categoryId: "",
  },

  // Set these to a file in /public (e.g. "/cv/industry.pdf") to show download links on /about.
  cv: {
    industry: "",
    academic: "",
  },

  experience: [
    {
      role: "Software Engineer II",
      org: "Niural AI",
      href: "https://www.niural.com",
      start: "2025-12",
      end: "",
      note: "Backend systems.",
    },
    {
      role: "Software Engineer",
      org: "eSewa",
      href: "https://www.esewa.com",
      start: "2023-03",
      end: "2025-12",
      note: "Backend systems of the eSewa digital payments platform.",
    },
  ],

  education: [
    {
      degree: "MSc in Computer Engineering",
      org: "Nepal College of Information Technology (NCIT), Pokhara University",
      href: "https://www.ncit.edu.np",
      start: "2026",
      end: "",
    },
    {
      degree: "BE in Software Engineering",
      org: "Nepal College of Information Technology (NCIT), Pokhara University",
      href: "https://www.ncit.edu.np",
      start: "",
      end: "2025",
    },
  ],

  community: [
    { label: "GitHub Campus Expert", href: "https://githubcampus.expert/SatyaRajAwasth1/" },
    { label: "Member, Nepal Open Source Community (NOSK)", href: "https://nosk.org.np" },
    { label: "Founder, Nepal Tek Community (NTK)", href: "https://tekcommunity.ncit.edu.np" },
  ],
} as const;

export type Site = typeof site;
