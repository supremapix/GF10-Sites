import { readFile, stat, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
import sharp from "sharp";
const d = JSON.parse(await readFile("data/national-territory.json", "utf8"));
const routes = JSON.parse(await readFile("dist/routes.json", "utf8"));
const paths = new Set(routes.map((r) => r.path));
let units = 0,
  maps = 0,
  largest = 0;
const examples = [];
for (const [city, c] of Object.entries(d.collections)) {
  assert.equal(new Set(c.units.map((u) => u.slug)).size, c.units.length);
  assert(c.source.startsWith("https://"));
  for (const u of c.units) {
    const route = `/brasil/${city}/${c.category}/${u.slug}`;
    assert(paths.has(route), route);
    assert(u.name && u.code && u.groupLabel);
    if (u.path) {
      maps++;
      assert(
        u.bounds[0] >= -75 &&
          u.bounds[2] <= -32 &&
          u.bounds[1] >= -35 &&
          u.bounds[3] <= 6,
      );
      assert(!/NaN|Infinity/.test(u.path));
    }
    const size = (await stat(`dist${route}.html`)).size;
    largest = Math.max(largest, size);
    const art = await sharp(
      `dist/images/local/national/${u.key}-250.webp`,
    ).metadata();
    assert.equal(art.width, 250);
    assert.equal(art.height, 250);
    units++;
  }
  examples.push({
    city,
    unit: [...c.units].sort((a, b) => b.name.length - a.name.length)[0],
    category: c.category,
  });
}
assert.equal(Object.keys(d.collections).length, 26);
assert.equal(units, 3570);
assert.equal(maps, 3532);
const sheet = await sharp({
  create: { width: 1500, height: 1250, channels: 3, background: "#fff" },
})
  .composite(
    examples.map((e, i) => ({
      input: `public/images/local/national/${e.unit.key}-250.webp`,
      left: (i % 6) * 250,
      top: Math.floor(i / 6) * 250,
    })),
  )
  .png()
  .toBuffer();
await writeFile("qa/national-art.png", sheet);
await writeFile(
  "qa/national-data-results.json",
  JSON.stringify(
    {
      capitalCollections: 26,
      additionalReferenceRoutes: units,
      referenceRoutesIncludingCuritiba: units + 75,
      maps,
      withoutMap: units - maps,
      largestNationalHTMLBytes: largest,
      examples: examples.map(
        (e) => `/brasil/${e.city}/${e.category}/${e.unit.slug}`,
      ),
    },
    null,
    2,
  ),
);
console.log({ units, maps, largestNationalHTMLBytes: largest });
