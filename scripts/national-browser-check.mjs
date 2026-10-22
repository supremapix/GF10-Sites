import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFile, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
const base = process.env.GF10_TEST_URL || "http://127.0.0.1:4173";
const d = JSON.parse(await readFile("data/national-territory.json", "utf8"));
const browser = await chromium.launch({ channel: "msedge", headless: true });
const context = await browser.newContext({
  viewport: { width: 320, height: 900 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
await page.route("**/*", (r) =>
  new URL(r.request().url()).origin === new URL(base).origin
    ? r.continue()
    : r.abort(),
);
const samples = [];
try {
  for (const city of [
    "rio-branco",
    "sao-paulo",
    "goiania",
    "palmas",
    "brasilia",
    "sao-luis",
  ]) {
    const c = d.collections[city];
    const unit = [...c.units].sort((a, b) => b.name.length - a.name.length)[0];
    const path = `/brasil/${city}/${c.category}/${unit.slug}`;
    assert.equal((await page.goto(base + path)).status(), 200);
    assert.equal(
      await page.locator("h1").textContent(),
      `${unit.name}, ${c.name}`,
    );
    assert(
      !(await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      )),
      path,
    );
    assert.equal(
      (await new AxeBuilder({ page }).analyze()).violations.length,
      0,
      path,
    );
    await page.locator(".local-art img").scrollIntoViewIfNeeded();
    await page.locator(".local-art img").evaluate((img) => img.decode());
    assert.equal(
      await page.locator(".local-art img").evaluate((img) => img.naturalWidth),
      250,
    );
    await page.screenshot({ path: `qa/national-${city}-art.png` });
    await page.addStyleTag({ content: "html{font-size:200%!important}" });
    assert(
      !(await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      )),
      path + " enlarged",
    );
    samples.push(path);
  }
  const c = d.collections.palmas,
    u = c.units.find((u) => !u.path);
  await page.goto(base + `/brasil/palmas/${c.category}/${u.slug}`);
  assert.equal(await page.locator(".territory-map").count(), 0);
  assert(await page.getByText("Referência sem desenho de limites").isVisible());
  await page.goto(base + "/brasil/capitais/brasilia");
  await page
    .getByLabel("Filtrar localidades de Brasília / Distrito Federal")
    .fill("agua quente");
  assert.equal(await page.locator("[data-place]:visible").count(), 1);
  await page
    .getByLabel("Filtrar localidades de Brasília / Distrito Federal")
    .fill("");
  assert.equal(await page.locator("[data-place]:visible").count(), 37);
  await writeFile(
    "qa/national-browser-results.json",
    JSON.stringify(
      {
        base,
        samples,
        axeViolations: 0,
        viewport: 320,
        textZoom: "200%",
        noGeometryFallback: true,
        accentInsensitiveFilter: true,
      },
      null,
      2,
    ),
  );
  console.log(
    "Six national source templates: Axe, 320px, 200% text, loaded artwork, no-map fallback and filters passed.",
  );
} finally {
  await browser.close();
}
