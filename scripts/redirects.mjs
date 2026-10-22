import { createServer } from "vite";
import { writeFile } from "node:fs/promises";
const v = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  const { districts, slug } = await v.ssrLoadModule("/data/coverage.ts");
  const redirects = [
    {
      source: "/cidade/Curitiba",
      destination: "/criacao-de-sites-curitiba",
      permanent: true,
    },
  ];
  const seen = new Set();
  for (const d of districts)
    for (const n of d.names.split("|"))
      if (!seen.has(n)) {
        seen.add(n);
        redirects.push({
          source: "/bairro/" + encodeURIComponent(n),
          destination: "/criacao-de-sites-curitiba#regional-" + slug(d.name),
          permanent: true,
        });
      }
  for (const [n, regional] of [
    ["CIC", "cic"],
    ["Alto da XV", "matriz"],
  ])
    redirects.push({
      source: "/bairro/" + encodeURIComponent(n),
      destination: "/criacao-de-sites-curitiba#regional-" + regional,
      permanent: true,
    });
  await writeFile(
    "vercel.json",
    JSON.stringify(
      {
        buildCommand: "npm run build",
        outputDirectory: "dist",
        cleanUrls: true,
        trailingSlash: false,
        redirects,
        headers: [
          {
            source: "/(.*)",
            headers: [
              { key: "X-Content-Type-Options", value: "nosniff" },
              {
                key: "Referrer-Policy",
                value: "strict-origin-when-cross-origin",
              },
            ],
          },
        ],
      },
      null,
      2,
    ),
  );
} finally {
  await v.close();
}
