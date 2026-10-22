import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
const base = process.env.GF10_TEST_URL || "http://127.0.0.1:4173";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const context = await browser.newContext({
  viewport: { width: 320, height: 900 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
await page.route("**/*", (route) =>
  new URL(route.request().url()).origin === new URL(base).origin
    ? route.continue()
    : route.abort(),
);
const checked = [];
try {
  for (const route of [
    "/criacao-de-sites-brasil",
    "/brasil/capitais/belo-horizonte",
    "/brasil/capitais/brasilia",
    "/brasil/curitiba/bairros/campo-comprido",
    "/brasil/curitiba/bairros/cidade-industrial",
  ]) {
    assert.equal((await page.goto(base + route)).status(), 200);
    assert(
      !(await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      )),
      route,
    );
    const axe = await new AxeBuilder({ page }).analyze();
    assert.equal(axe.violations.length, 0, JSON.stringify(axe.violations));
    checked.push(route);
    await page.screenshot({
      path: `qa/territory-${route.split("/").at(-1)}.png`,
      fullPage: true,
    });
  }
  await page.goto(base + "/criacao-de-sites-brasil");
  await page.getByLabel("Filtrar capitais").fill("sao");
  assert.equal(await page.locator("[data-place]:visible").count(), 2);
  assert.equal(
    await page.locator("[data-filter-status]").textContent(),
    "2 de 27 localidades encontradas.",
  );
  await page.getByLabel("Filtrar capitais").fill("não-existe");
  assert.equal(await page.locator("[data-place]:visible").count(), 0);
  await page.getByLabel("Filtrar capitais").fill("");
  assert.equal(await page.locator("[data-place]:visible").count(), 27);
  assert.equal(
    (
      await page.goto(base + "/brasil/curitiba/bairros/local-inexistente")
    ).status(),
    404,
  );
  await writeFile(
    "qa/territory-results.json",
    JSON.stringify(
      {
        base,
        checked,
        axeViolations: 0,
        filter: "accent insensitive, empty state and reset passed",
        unknown: 404,
      },
      null,
      2,
    ),
  );
  console.log(
    "Territory templates, Axe, 320px, filters and unknown 404 passed.",
  );
} finally {
  await browser.close();
}
