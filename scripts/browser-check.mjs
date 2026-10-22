import { chromium } from "@playwright/test";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import assert from "node:assert/strict";
import AxeBuilder from "@axe-core/playwright";
await mkdir("qa", { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const results = [];
const routes = JSON.parse(await readFile("dist/routes.json", "utf8"));
try {
  for (const width of [320, 390, 1440]) {
    const page = await browser.newPage({
      viewport: { width, height: 1000 },
      javaScriptEnabled: false,
    });
    for (const route of routes.filter((r) => r.kind !== "404")) {
      const response = await page.goto("http://127.0.0.1:4173" + route.path);
      assert.equal(response.status(), 200);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
      assert(!overflow, `${width}px overflow ${route.path}`);
      assert.equal(await page.locator("h1").count(), 1);
      if (
        ["home", "curitiba", "service", "guide", "region"].includes(
          route.kind,
        ) &&
        (!["service", "guide", "region"].includes(route.kind) ||
          ["sites-e-landing-pages", "planejar-site", "sul"].includes(
            route.path.split("/").at(-1),
          ))
      )
        await page.screenshot({
          path: `qa/${width}-${route.kind}.png`,
          fullPage: true,
        });
    }
    await page.goto("http://127.0.0.1:4173/");
    await page.keyboard.press("Tab");
    assert.equal(
      await page.locator(":focus").textContent(),
      "Pular para o conteúdo",
    );
    await page.keyboard.press("Enter");
    results.push(
      `${width}px: ${routes.filter((r) => r.kind !== "404").length} routes without horizontal overflow; keyboard skip link works with JS disabled`,
    );
    await page.close();
  }
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  for (const path of [
    "/",
    "/criacao-de-sites-curitiba",
    "/criacao-de-sites-brasil",
    "/brasil/sul",
    "/solucoes",
    "/solucoes/sites-e-landing-pages",
    "/guias",
    "/guias/planejar-site",
    "/sitemap",
  ]) {
    await page.goto("http://127.0.0.1:4173" + path);
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    assert.equal(
      audit.violations.length,
      0,
      JSON.stringify({ path, violations: audit.violations }, null, 2),
    );
  }
  results.push(
    "Axe WCAG 2 A/AA + 2.1 AA: zero detected violations across all 9 page templates at 390px.",
  );
  await page.goto("http://127.0.0.1:4173/");
  await page.addStyleTag({ content: "html {font-size:200% !important}" });
  assert(
    !(await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    )),
    "200% text overflow",
  );
  await page.screenshot({ path: "qa/390-text-200.png", fullPage: true });
  await page.goto("http://127.0.0.1:4173/criacao-de-sites-curitiba");
  await page.locator("details summary").first().focus();
  await page.keyboard.press("Enter");
  assert((await page.locator("details").first().getAttribute("open")) !== null);
  const missing = await page.goto("http://127.0.0.1:4173/pagina-inexistente");
  assert.equal(missing.status(), 404);
  const redirect = await page.request.get(
    "http://127.0.0.1:4173/bairro/Port%C3%A3o",
    { maxRedirects: 0 },
  );
  assert.equal(redirect.status(), 308);
  results.push(
    "200% text at 390px: no horizontal overflow; native disclosures keyboard-operable; unknown route 404; old Portão route 308.",
  );
  await writeFile("qa/browser-results.json", JSON.stringify(results, null, 2));
  console.log(results.join("\n"));
} finally {
  await browser.close();
}
