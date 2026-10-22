import { createServer } from "vite";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { mkdir, cp, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  const { default: App, pages } = await vite.ssrLoadModule("/App.tsx");
  const { SITE_URL } = await vite.ssrLoadModule("/data/site.ts");
  const escape = (s) =>
    s
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;");
  await mkdir("dist", { recursive: true });
  await cp("public", "dist", { recursive: true });
  for (const page of pages) {
    const url = SITE_URL + page.path;
    const graph = [
      {
        "@type": "Organization",
        "@id": SITE_URL + "/#organization",
        name: "GF10 / Suprema Sites Express",
        url: SITE_URL + "/",
        logo: SITE_URL + "/web-app-manifest-512x512.png",
      },
      {
        "@type": "WebSite",
        "@id": SITE_URL + "/#website",
        name: "GF10",
        url: SITE_URL + "/",
        inLanguage: "pt-BR",
        publisher: { "@id": SITE_URL + "/#organization" },
      },
    ];
    if (page.kind !== "404")
      graph.push({
        "@type": "WebPage",
        "@id": url + "#webpage",
        url,
        name: page.title,
        description: page.description,
        inLanguage: "pt-BR",
        isPartOf: { "@id": SITE_URL + "/#website" },
      });
    const html = `<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="format-detection" content="telephone=no"><title>${escape(page.title)}</title><meta name="description" content="${escape(page.description)}"><meta name="robots" content="${page.kind === "404" || page.noindex ? "noindex,follow" : "index,follow,max-image-preview:large"}"><link rel="canonical" href="${url}"><meta property="og:type" content="website"><meta property="og:locale" content="pt_BR"><meta property="og:site_name" content="GF10 / Suprema Sites Express"><meta property="og:title" content="${escape(page.title)}"><meta property="og:description" content="${escape(page.description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${SITE_URL}/og/gf10.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="GF10 — criação de sites em Curitiba e no Brasil. WhatsApp para conversar sobre seu projeto."><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(page.title)}"><meta name="twitter:description" content="${escape(page.description)}"><meta name="twitter:image" content="${SITE_URL}/og/gf10.jpg"><meta name="theme-color" content="#020617"><link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="icon" href="/favicon-96x96.png" type="image/png" sizes="96x96"><link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180"><meta name="apple-mobile-web-app-title" content="GF10 Sites"><link rel="manifest" href="/site.webmanifest"><link rel="stylesheet" href="/style.css"><script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replaceAll("<", "\\u003c")}</script></head><body>${renderToStaticMarkup(React.createElement(App, { page }))}<script src="/share.js" defer></script></body></html>`;
    const target =
      page.path === "/" ? "dist/index.html" : `dist${page.path}.html`;
    await mkdir(resolve(target, ".."), { recursive: true });
    await writeFile(target, html);
  }
  const indexed = pages.filter((p) => p.kind !== "404" && !p.noindex);
  await writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${indexed.map((p) => `<url><loc>${SITE_URL + p.path}</loc></url>`).join("")}</urlset>`,
  );
  await writeFile(
    "dist/robots.txt",
    `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`,
  );
  await writeFile(
    "dist/llms.txt",
    `# GF10 / Suprema Sites Express\n\nCriação de sites com foco em Curitiba e atendimento remoto no Brasil. Não há garantia de rankings ou citações.\n\n## Conteúdo\n${indexed.map((p) => `- [${p.title}](${SITE_URL + p.path}): ${p.description}`).join("\n")}\n`,
  );
  await writeFile(
    "dist/routes.json",
    JSON.stringify(
      pages.map(({ path, kind, noindex }) => ({
        path,
        kind,
        noindex: !!noindex,
      })),
      null,
      2,
    ),
  );
  console.log(
    `SSG: ${indexed.length} páginas indexáveis + ${pages.filter((p) => p.noindex).length} fichas noindex + 404; HTML completo; compartilhamento progressivo em JavaScript.`,
  );
} finally {
  await vite.close();
}
