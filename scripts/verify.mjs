import { readFile, stat } from "node:fs/promises";
import assert from "node:assert/strict";
import { load } from "cheerio";
import sharp from "sharp";
const routes = JSON.parse(await readFile("dist/routes.json", "utf8"));
const config = JSON.parse(await readFile("vercel.json", "utf8"));
assert.equal(config.redirects.length, 78);
for (const r of config.redirects)
  assert.equal(
    r.source,
    encodeURI(decodeURI(r.source)),
    "Vercel redirect source must be URL encoded",
  );
const documents = new Map();
const anchors = new Map();
for (const r of routes) {
  const html = await readFile(
    r.path === "/" ? "dist/index.html" : `dist${r.path}.html`,
    "utf8",
  );
  documents.set(r.path, html);
  anchors.set(
    r.path,
    new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1])),
  );
}
const titles = new Set(),
  descriptions = new Set();
let links = 0,
  whatsapps = 0;
for (const [path, html] of documents) {
  const $ = load(html);
  assert.equal($("h1").length, 1, `${path}: h1`);
  assert.equal($("main").length, 1);
  assert.equal($("html").attr("lang"), "pt-BR");
  assert(!titles.has($("title").text()), `${path}: duplicate title`);
  titles.add($("title").text());
  const description = $("meta[name=description]").attr("content");
  assert(!descriptions.has(description));
  descriptions.add(description);
  assert.equal(
    $("link[rel=canonical]").attr("href"),
    `https://www.gf10.com.br${path}`,
  );
  assert.equal(
    $('meta[property="og:url"]').attr("content"),
    `https://www.gf10.com.br${path}`,
  );
  assert.equal(
    $('meta[property="og:image"]').attr("content"),
    "https://www.gf10.com.br/og/gf10.jpg",
  );
  assert.equal(
    $('script:not([type="application/ld+json"])').length,
    1,
    "Only progressive share enhancement",
  );
  assert.equal($("script[src]").attr("src"), "/share.js");
  assert.equal($(".floating-actions").length, 1);
  assert.equal($("#share-dialog [data-network]").length, 6);
  if (
    path === "/criacao-de-sites-curitiba" ||
    path === "/criacao-de-sites-brasil" ||
    path.startsWith("/brasil/")
  ) {
    assert.equal($(".local-art img").length, 1);
    const art = $(".local-art img");
    assert.equal(art.attr("width"), "250");
    assert.equal(art.attr("height"), "250");
    assert.equal(art.attr("loading"), "lazy");
    const dimensions = await sharp("dist" + art.attr("src")).metadata();
    assert.equal(dimensions.width, 250);
    assert.equal(dimensions.height, 250);
  }
  const json = JSON.parse($('script[type="application/ld+json"]').text());
  assert(json["@graph"].length >= 2);
  assert.equal($('a[href^="tel:"],a[href^="mailto:"],form').length, 0);
  assert(
    !$.html().includes("98700-1004") && !$.html().includes("554192721004"),
  );
  if (path === "/404")
    assert($("meta[name=robots]").attr("content").includes("noindex"));
  for (const a of $("a[href]").toArray()) {
    const href = $(a).attr("href");
    links++;
    if (href.startsWith("https://wa.me/")) {
      const u = new URL(href);
      assert.equal(u.pathname, "/5541992721004");
      assert(u.searchParams.get("text")?.length > 30);
      whatsapps++;
      continue;
    }
    if (!href.startsWith("/") && !href.startsWith("#")) continue;
    const url = new URL(href, `https://www.gf10.com.br${path}`);
    assert(documents.has(url.pathname), `${path}: missing ${href}`);
    if (url.hash)
      assert(
        anchors.get(url.pathname).has(decodeURIComponent(url.hash.slice(1))),
        `${path}: missing anchor ${href}`,
      );
  }
  for (const img of $("img").toArray()) {
    assert($(img).attr("alt") !== undefined);
    assert($(img).attr("width"));
    assert($(img).attr("height"));
    await stat("dist" + $(img).attr("src"));
  }
}
const sitemap = load(await readFile("dist/sitemap.xml", "utf8"), { xml: true });
assert.equal(
  sitemap("url").length,
  routes.filter((r) => r.kind !== "404" && !r.noindex).length,
);
for (const r of routes.filter((r) => r.noindex)) {
  assert(
    load(documents.get(r.path))("meta[name=robots]")
      .attr("content")
      .includes("noindex"),
  );
  assert(
    !sitemap("loc")
      .toArray()
      .some((l) => sitemap(l).text().endsWith(r.path)),
  );
}
for (const loc of sitemap("loc").toArray()) {
  assert(documents.has(new URL(sitemap(loc).text()).pathname));
}
const ico = await readFile("dist/favicon.ico");
assert.equal(ico.readUInt16LE(4), 3);
assert.deepEqual([ico[6], ico[22], ico[38]], [16, 32, 48]);
for (const [file, size] of [
  ["apple-touch-icon.png", 180],
  ["web-app-manifest-192x192.png", 192],
  ["web-app-manifest-512x512.png", 512],
]) {
  const m = await sharp("dist/" + file).metadata();
  assert.equal(m.width, size);
  assert.equal(m.height, size);
}
const og = await sharp("dist/og/gf10.jpg").metadata();
assert.equal(og.width, 1200);
assert.equal(og.height, 630);
assert.equal(
  load(documents.get("/criacao-de-sites-curitiba"))(".neighborhoods li").length,
  76,
); // Campo Comprido is in two regions.
const cities = [...documents]
  .filter(([p]) => routes.some((r) => r.path === p && r.kind === "region"))
  .reduce((sum, [, html]) => sum + load(html)(".city-list article").length, 0);
assert.equal(cities, 27);
console.log(
  `PASS: ${routes.length} HTML pages, ${links} links, ${whatsapps} contextual WhatsApp links, ${sitemap("url").length} sitemap entries, 27 capitals, ${routes.filter(r=>r.noindex).length} territorial references (75 Curitiba), OG and favicon dimensions.`,
);
