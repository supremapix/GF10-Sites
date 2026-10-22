import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
const base = process.env.GF10_TEST_URL || "http://127.0.0.1:4173";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  reducedMotion: "reduce",
});
let external = 0;
await context.route("**/*", (route) => {
  if (new URL(route.request().url()).origin !== new URL(base).origin) {
    external++;
    return route.abort();
  }
  return route.continue();
});
const page = await context.newPage();
const allRoutes = JSON.parse(await readFile("dist/routes.json", "utf8"));
// Exercise every original route and the longest national route per capital.
// All national HTML, links, metadata and artwork are validated by verify.mjs.
const samples = new Map();
for (const r of allRoutes.filter((r) => r.kind === "territory")) {
  const city = r.path.split("/")[2];
  if (!samples.has(city) || samples.get(city).path.length < r.path.length)
    samples.set(city, r);
}
const routes = allRoutes
  .filter((r) => r.kind !== "territory")
  .concat([...samples.values()]);
try {
  for (const r of routes) {
    await page.goto(base + r.path);
    await page.locator("#share-open").click();
    assert(await page.locator("#share-dialog").evaluate((d) => d.open));
    const canonical = await page
      .locator("link[rel=canonical]")
      .getAttribute("href");
    assert.equal(await page.locator("#share-url").inputValue(), canonical);
    const pinterest = new URL(
      await page.locator('[data-network="Pinterest"]').getAttribute("href"),
    );
    assert.equal(pinterest.searchParams.get("url"), canonical);
    assert.equal(
      pinterest.searchParams.get("media"),
      await page.locator('meta[property="og:image"]').getAttribute("content"),
    );
    const linkedin = new URL(
      await page.locator('[data-network="LinkedIn"]').getAttribute("href"),
    );
    assert.equal(linkedin.searchParams.get("url"), canonical);
    const x = new URL(
      await page.locator('[data-network="X"]').getAttribute("href"),
    );
    assert.equal(x.searchParams.get("text"), await page.title());
    assert.equal(x.searchParams.get("url"), canonical);
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press("Tab");
      assert(
        await page
          .locator(":focus")
          .evaluate((e) => !!e.closest("#share-dialog")),
      );
    }
    await page.keyboard.press("Escape");
    assert.equal(await page.locator(":focus").getAttribute("id"), "share-open");
  }
  await page.goto(base + "/");
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.locator("#share-open").click();
    const violations = (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations;
    assert.equal(violations.length, 0, JSON.stringify(violations));
    for (const target of await page
      .locator(
        ".floating-actions>a,.floating-actions>button,.share-networks>a,#share-close,#share-copy",
      )
      .all()) {
      const box = await target.boundingBox();
      assert(box.width >= 48 && box.height >= 48);
    }
    await page.screenshot({ path: `qa/share-${width}.png`, fullPage: false });
    await page.locator("#share-close").click();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    assert(
      await page.evaluate(
        () =>
          document.querySelector(".fineprint").getBoundingClientRect().bottom <=
          document.querySelector(".floating-actions").getBoundingClientRect()
            .top +
            1,
      ),
      "dock covers footer",
    );
  }
  await page.locator("#share-open").click();
  await page.evaluate(() =>
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: () => Promise.reject(new Error("test denied")) },
    }),
  );
  await page.locator("#share-copy").click();
  assert(
    (await page.locator("#share-status").textContent()).includes(
      "Não foi possível",
    ),
  );
  assert.equal(await page.locator(":focus").getAttribute("id"), "share-url");
  await page.evaluate(() =>
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (value) => {
          window.__copiedTest = value;
        },
      },
    }),
  );
  await page.locator("#share-copy").click();
  assert.equal(
    await page.locator("#share-status").textContent(),
    "Link copiado.",
  );
  assert.equal(
    await page.evaluate(() => window.__copiedTest),
    "https://www.gf10.com.br/",
  );
  await page.keyboard.press("Escape");
  await page.locator("#journey-next").click();
  assert(
    (await page.locator("#journey-status").textContent()).startsWith("Etapa 2"),
  );
  assert.equal(
    await page.locator(".journey-steps li").nth(1).getAttribute("aria-current"),
    "step",
  );
  assert.equal(
    await page
      .locator(".journey-steps li")
      .nth(1)
      .evaluate((e) => getComputedStyle(e).transitionDuration),
    "0s",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addStyleTag({ content: "html{font-size:200%!important}" });
  await page.locator("#share-open").click();
  assert(
    !(await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    )),
  );
  await page.locator("#share-close").click();
  assert.equal(
    external,
    0,
    "No social-network/WhatsApp requests should occur during tests",
  );
  const result = {
    base,
    pages: routes.length,
    modal: "focus trap, Escape, close, return focus",
    clipboard: "rejection fallback and resolved success tested with mocks only",
    viewports: [320, 390, 1440],
    axe: "zero violations with dialog open",
    reducedMotion: "no transition",
    externalRequests: external,
    nationalTemplateSamples: samples.size,
  };
  await writeFile("qa/share-results.json", JSON.stringify(result, null, 2));
  console.log(result);
} finally {
  await browser.close();
}
