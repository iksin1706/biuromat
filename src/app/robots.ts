import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

// Wyszukiwarki i asystenci AI mają pełny dostęp: odpowiedzi ChatGPT, Claude, Perplexity
// czy Gemini o „programie do faktur z KSeF” mogą wtedy cytować Biuromat.
// Boty AI wymienione z nazwy, żeby nie zablokował ich przypadkiem przyszły wpis dla `*`.
const aiBots = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    // /styleguide celowo bez Disallow: ma meta noindex, a blokada w robots.txt
    // uniemożliwiłaby Google odczytanie tego noindexu.
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: aiBots, allow: "/" },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
