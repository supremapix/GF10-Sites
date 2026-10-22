import sharp from "sharp";
import { mkdir, readFile, writeFile } from "node:fs/promises";
await mkdir("public/og", { recursive: true });
for (const name of ["site-responsivo", "planejamento"])
  for (const width of [640, 1200]) {
    await sharp(`assets/${name}.png`)
      .resize(width)
      .webp({ quality: 80 })
      .toFile(`public/images/${name}-${width}.webp`);
    await sharp(`assets/${name}.png`)
      .resize(width)
      .avif({ quality: 52 })
      .toFile(`public/images/${name}-${width}.avif`);
  }
const svg = await readFile("public/favicon.svg");
for (const [size, name] of [
  [16, "favicon-16x16.png"],
  [32, "favicon-32x32.png"],
  [48, "favicon-48x48.png"],
  [96, "favicon-96x96.png"],
  [180, "apple-touch-icon.png"],
  [192, "web-app-manifest-192x192.png"],
  [512, "web-app-manifest-512x512.png"],
])
  await sharp(svg).resize(size, size).png().toFile(`public/${name}`);
const pngs = await Promise.all(
  [16, 32, 48].map((n) => sharp(svg).resize(n, n).png().toBuffer()),
);
const header = Buffer.alloc(6 + 16 * 3);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(3, 4);
let offset = header.length;
for (let i = 0; i < 3; i++) {
  let p = 6 + 16 * i;
  header[p] = [16, 32, 48][i];
  header[p + 1] = header[p];
  header.writeUInt16LE(1, p + 4);
  header.writeUInt16LE(32, p + 6);
  header.writeUInt32LE(pngs[i].length, p + 8);
  header.writeUInt32LE(offset, p + 12);
  offset += pngs[i].length;
}
await writeFile("public/favicon.ico", Buffer.concat([header, ...pngs]));
await writeFile(
  "public/site.webmanifest",
  JSON.stringify(
    {
      name: "GF10 / Suprema Sites Express",
      short_name: "GF10 Sites",
      lang: "pt-BR",
      id: "/",
      start_url: "/",
      scope: "/",
      display: "standalone",
      background_color: "#f5f3ed",
      theme_color: "#020617",
      icons: [
        {
          src: "/web-app-manifest-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/web-app-manifest-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
      ],
    },
    null,
    2,
  ),
);
// Exact existing SVG mark, composed deterministically; no generated logo or text.
const logo = await sharp(svg).resize(76, 76).png().toBuffer();
const photo = await sharp("assets/site-responsivo.png")
  .resize(490, 630, { fit: "cover" })
  .toBuffer();
const { createServer } = await import("vite");
const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
let phone;
try {
  ({ DISPLAY_WHATSAPP: phone } = await vite.ssrLoadModule("/data/site.ts"));
} finally {
  await vite.close();
}
const overlay = Buffer.from(
  `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:Arial,Helvetica,sans-serif}</style><rect width="710" height="630" fill="#020617"/><text x="145" y="103" fill="#ffffff" font-size="48" font-weight="bold">GF10</text><text x="146" y="129" fill="#a9bbd4" font-size="14" letter-spacing="2">SUPREMA SITES EXPRESS</text><text x="55" y="248" fill="#ffffff" font-size="58" font-weight="bold">Seu negócio tem</text><text x="55" y="316" fill="#ffffff" font-size="58" font-weight="bold">identidade.</text><text x="55" y="384" fill="#75a4ff" font-size="58" font-weight="bold">Seu site também.</text><text x="55" y="453" fill="#d0d9e6" font-size="24">Criação de sites · Curitiba + Brasil</text><rect x="55" y="501" width="570" height="66" fill="#10b981"/><text x="78" y="543" fill="#020617" font-size="28" font-weight="bold">WhatsApp ${phone}</text><text x="1135" y="602" text-anchor="end" fill="white" font-size="16">gf10.com.br</text></svg>`,
);
await sharp({
  create: { width: 1200, height: 630, channels: 3, background: "#020617" },
})
  .composite([
    { input: photo, left: 710, top: 0 },
    { input: overlay, left: 0, top: 0 },
    { input: logo, left: 55, top: 57 },
  ])
  .jpeg({ quality: 88 })
  .toFile("public/og/gf10.jpg");
console.log(
  "Assets: 2 photos × 2 sizes × 2 formats; 7 PNG icons, ICO 16/32/48, original SVG, manifest, OG 1200×630.",
);
