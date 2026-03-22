/**
 * Lambda@Edge (Viewer Request) for dynamic Open Graph meta tags.
 *
 * When a social-media crawler (Slack, Discord, Twitter, etc.) requests a page,
 * this function intercepts the request and returns a lightweight HTML response
 * with the correct OG/Twitter Card meta tags for that route. Normal browser
 * requests pass through unchanged to the SPA.
 *
 * To update OG metadata, edit the PAGES and PROJECTS objects below.
 * To add a new project OG image, drop a 1200x630 PNG into public/og/<id>.png
 * and reference it in the project's `image` field.
 */

const SITE_URL = "https://codeblackwell.ai";
const SITE_NAME = "LeChristopher Blackwell";
const DEFAULT_IMAGE = `${SITE_URL}/og/default.png`;

// ── Crawler detection ────────────────────────────────────────
const CRAWLER_AGENTS = [
  "facebookexternalhit",
  "Facebot",
  "Twitterbot",
  "LinkedInBot",
  "Slackbot",
  "Slack-ImgProxy",
  "Discordbot",
  "WhatsApp",
  "TelegramBot",
  "Applebot",
  "Googlebot",
  "bingbot",
  "iMessageBot",
];

// ── Page-level OG metadata ───────────────────────────────────
const PAGES = {
  "/": {
    title: `${SITE_NAME} | Full-Stack Engineer & AI Specialist`,
    description:
      "Building the future with AI. Full-stack engineer specializing in LLMs, data pipelines, and scalable web applications.",
    image: DEFAULT_IMAGE,
  },
  "/home": {
    title: `${SITE_NAME} | Full-Stack Engineer & AI Specialist`,
    description:
      "Building the future with AI. Full-stack engineer specializing in LLMs, data pipelines, and scalable web applications.",
    image: DEFAULT_IMAGE,
  },
  "/projects": {
    title: `Projects | ${SITE_NAME}`,
    description:
      "AI systems that democratize complex technology. Fine-tuned LLMs, multi-agent orchestration, and natural language to structured data.",
    image: DEFAULT_IMAGE,
  },
  "/experience": {
    title: `Experience | ${SITE_NAME}`,
    description:
      "Professional experience in full-stack engineering, AI/ML integration, and scalable web applications.",
    image: DEFAULT_IMAGE,
  },
  "/education": {
    title: `Education | ${SITE_NAME}`,
    description:
      "Education and certifications in software engineering and artificial intelligence.",
    image: DEFAULT_IMAGE,
  },
  "/contact": {
    title: `Contact | ${SITE_NAME}`,
    description: "Get in touch with LeChristopher Blackwell.",
    image: DEFAULT_IMAGE,
  },
  "/opensource": {
    title: `Open Source | ${SITE_NAME}`,
    description:
      "Open source contributions and community involvement.",
    image: DEFAULT_IMAGE,
  },
  "/beyond": {
    title: `Beyond Code | ${SITE_NAME}`,
    description:
      "Passions and interests beyond software engineering.",
    image: DEFAULT_IMAGE,
  },
};

// ── Project-level OG metadata ────────────────────────────────
// Matched by path: /projects/prove, /projects/crack, etc.
const PROJECTS = {
  prove: {
    title: `PROVE | ${SITE_NAME}`,
    description:
      "Your skills, verified by code. Ingests your resume and GitHub repos into a Neo4j knowledge graph, then lets anyone query your abilities with cited evidence and proficiency scores.",
    image: `${SITE_URL}/og/prove.png`,
  },
  crack: {
    title: `C.R.A.C.K. | ${SITE_NAME}`,
    description:
      "Your complete penetration testing arsenal. 1,487 commands, 32 attack chains, and 50 cheatsheets unified in CLI, Electron GUI, and Claude AI integration.",
    image: `${SITE_URL}/og/crack.png`,
  },
  betterprompts: {
    title: `BetterPrompts | ${SITE_NAME}`,
    description:
      "Transform any prompt into perfection. 12 optimization techniques powered by fine-tuned DeBERTa-v3 that improve AI output quality by 40%.",
    image: `${SITE_URL}/og/betterprompts.png`,
  },
  "agent-blackwell": {
    title: `Agent_Blackwell | ${SITE_NAME}`,
    description:
      "Five minds, one mission. Orchestrates specialized AI agents to automate the complete software development lifecycle with production-ready output.",
    image: `${SITE_URL}/og/agent-blackwell.png`,
  },
  "d3-gallery": {
    title: `D3 Visualization Gallery | ${SITE_NAME}`,
    description:
      "Teaching AI to see data. 800+ TypeScript/React components bridging natural language to interactive D3.js visualizations.",
    image: `${SITE_URL}/og/d3-gallery.png`,
  },
  aura: {
    title: `A.U.R.A | ${SITE_NAME}`,
    description:
      "Ask questions, get answers. StarCoder fine-tuned with PEFT/LoRA converts natural language to precise JSON queries.",
    image: `${SITE_URL}/og/aura.png`,
  },
  liblearner: {
    title: `LibLearner | ${SITE_NAME}`,
    description:
      "Train your own intelligence. Extract code from any repository, process functions and classes, and fine-tune custom T5 models specialized on your codebase.",
    image: `${SITE_URL}/og/liblearner.png`,
  },
};

// ── Handler ──────────────────────────────────────────────────
export const handler = async (event) => {
  const request = event.Records[0].cf.request;
  const ua = ((request.headers["user-agent"] || [{}])[0].value || "").toLowerCase();

  // Pass through non-crawler requests unchanged
  const isCrawler = CRAWLER_AGENTS.some((agent) => ua.includes(agent.toLowerCase()));
  if (!isCrawler) return request;

  // Resolve path to OG metadata
  const rawPath = request.uri.replace(/\/$/, "") || "/";
  let meta;

  // Check for project-specific path: /projects/<id>
  const projectMatch = rawPath.match(/^\/projects\/(.+)$/);
  if (projectMatch && PROJECTS[projectMatch[1]]) {
    meta = PROJECTS[projectMatch[1]];
  } else {
    meta = PAGES[rawPath] || PAGES["/"];
  }

  // If a project-specific image doesn't exist, fall back to default
  // (Lambda@Edge can't check S3, so we rely on the image existing at deploy time)
  const url = `${SITE_URL}${rawPath}`;

  return {
    status: "200",
    statusDescription: "OK",
    headers: {
      "content-type": [{ value: "text/html; charset=utf-8" }],
      "cache-control": [{ value: "public, max-age=300" }],
    },
    body: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}">
  <meta property="og:title" content="${meta.title}">
  <meta property="og:description" content="${meta.description}">
  <meta property="og:image" content="${meta.image}">
  <meta property="og:url" content="${url}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${SITE_NAME}">
  <meta property="og:locale" content="en_US">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${meta.title}">
  <meta name="twitter:description" content="${meta.description}">
  <meta name="twitter:image" content="${meta.image}">
</head>
<body></body>
</html>`,
  };
};
