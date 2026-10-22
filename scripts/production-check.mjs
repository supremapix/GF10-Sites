/* global fetch */
import { readFile, writeFile } from "node:fs/promises";
import { load } from "cheerio";
import assert from "node:assert/strict";
const base = "https://www.gf10.com.br";
const routes = JSON.parse(await readFile("dist/routes.json", "utf8"));
const results = [];
for (let i = 0; i < routes.length; i += 4) {
  await Promise.all(routes.slice(i, i + 4).map(async route => {
    const response = await fetch(base + route.path);
    const $ = load(await response.text());
    assert.equal(response.status, route.kind === "404" ? 404 : 200, route.path);
    assert.equal($("h1").length, 1);
    assert.equal($('link[rel="canonical"]').attr("href"), base + route.path);
    assert.equal($('meta[property="og:image"]').attr("content"), base + "/og/gf10.jpg");
    assert.equal($('a[href^="tel:"],a[href^="mailto:"],form').length, 0);
    assert.equal($(".floating-actions").length, 1);
    assert.equal($('script[src="/share.js"]').length, 1);
    if (route.noindex) assert($('meta[name="robots"]').attr("content").includes("noindex"));
    const img = $(".local-art img").attr("src");
    if (img) assert.equal((await fetch(base + img)).status, 200, img);
    results.push({path:route.path,status:response.status});
  }));
}
const sitemap = load(await (await fetch(base + "/sitemap.xml")).text(), {xml:true});
assert.equal(sitemap("url").length,routes.filter(r=>r.kind!=="404"&&!r.noindex).length);
for (const r of routes.filter(r=>r.noindex)) assert(!sitemap("loc").toArray().some(loc=>sitemap(loc).text()===base+r.path));
assert.equal((await fetch(base+"/brasil/curitiba/bairros/local-inexistente-gf10")).status,404);
await writeFile("qa/production-results.json",JSON.stringify({checkedAt:new Date().toISOString(),base,results,sitemapEntries:sitemap("url").length},null,2));
console.log(`Production passed: ${results.length} routes, local artwork, share controls, metadata, ${sitemap("url").length} sitemap entries and unknown 404.`);
