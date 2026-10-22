import sharp from "sharp";
import { readFile, writeFile, mkdir } from "node:fs/promises";
await mkdir("public/images/local", { recursive: true });
const mark = await sharp(await readFile("public/favicon.svg"))
  .resize(40, 40)
  .png()
  .toBuffer();
const territory = JSON.parse(await readFile("data/territory.json", "utf8"));
const { createServer } = await import("vite");
const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
const { capitals } = await vite.ssrLoadModule("/components/Territory.tsx");
await vite.close();
const places = [
  ...capitals.filter((c) => c.key !== "curitiba").map((c) => [c.key, c.name]),
  ...territory.curitiba.map((n) => [n.slug, n.name]),
  ["curitiba", "Curitiba"],
  ["brasil", "Brasil"],
  ["sul", "Sul"],
  ["sudeste", "Sudeste"],
  ["centro-oeste", "Centro-Oeste"],
  ["nordeste", "Nordeste"],
  ["norte", "Norte"],
];
for (const [key, label] of places) {
  const svg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="250" height="250"><rect width="250" height="250" fill="#020617"/><text x="64" y="44" fill="white" font-family="Arial" font-size="30" font-weight="700">GF10</text><path d="M18 70H232" stroke="#65738b"/><text x="18" y="102" fill="#75a4ff" font-family="Arial" font-size="${label.length > 21 ? 14 : label.length > 16 ? 18 : 25}" font-weight="700">${label.replaceAll("&", "&amp;")}</text><text x="18" y="125" fill="#dce3ee" font-family="Arial" font-size="12">ATENDIMENTO REMOTO</text><text x="18" y="154" fill="white" font-family="Arial" font-size="16" font-weight="700">Sites · Lojas · Aplicações</text><text x="18" y="174" fill="#dce3ee" font-family="Arial" font-size="12">Idiomas · Manutenção · SEO</text><rect x="0" y="190" width="250" height="60" fill="#10b981"/><text x="18" y="210" fill="#020617" font-family="Arial" font-size="12" font-weight="700">WHATSAPP</text><text x="18" y="236" fill="#020617" font-family="Arial" font-size="23" font-weight="700">(41) 99272-1004</text></svg>`,
  );
  await sharp(svg)
    .composite([{ input: mark, left: 18, top: 16 }])
    .webp({ lossless: true })
    .toFile(`public/images/local/${key}-250.webp`);
}
const labels = [
  "Sites e landing pages",
  "Lojas virtuais",
  "Sites multilíngues",
  "Aplicativos e PWA",
  "Sistemas e banco de dados",
  "Manutenção e modernização",
  "SEO técnico",
];
const rows = labels
  .map((label, i) => {
    const col = i < 4 ? 0 : 1;
    const row = i < 4 ? i : i - 4;
    const x = 55 + col * 585;
    const y = 300 + row * 85;
    return `<text x="${x}" y="${y}" fill="#10b981" font-family="Arial" font-size="20">0${i + 1}</text><text x="${x + 48}" y="${y}" fill="white" font-family="Arial" font-size="27" font-weight="700">${label}</text><path d="M${x} ${y + 26}h500" stroke="#334155"/>`;
  })
  .join("");
const general = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="720"><rect width="1200" height="720" fill="#020617"/><text x="135" y="95" fill="white" font-family="Arial" font-size="50" font-weight="700">GF10</text><text x="55" y="192" fill="white" font-family="Arial" font-size="46" font-weight="700">Seu próximo passo no digital.</text><text x="55" y="232" fill="#9fb1cb" font-family="Arial" font-size="23">Do site à operação. Uma solução para cada necessidade.</text>${rows}<rect y="625" width="1200" height="95" fill="#10b981"/><text x="55" y="662" fill="#020617" font-family="Arial" font-size="18">PROJETOS SOB AVALIAÇÃO DE ESCOPO</text><text x="55" y="698" fill="#020617" font-family="Arial" font-size="27" font-weight="700">WhatsApp (41) 99272-1004</text><text x="1145" y="686" fill="#020617" font-family="Arial" font-size="22" text-anchor="end">Curitiba + Brasil</text></svg>`,
);
const bigMark = await sharp(await readFile("public/favicon.svg"))
  .resize(62, 62)
  .png()
  .toBuffer();
await writeFile("assets/solucoes-geral.svg", general);
await sharp(general)
  .composite([{ input: bigMark, left: 55, top: 47 }])
  .webp({ quality: 95 })
  .toFile("public/images/solucoes-geral.webp");
console.log(
  "7 local images 250×250 and general seven-service poster generated from exact brand mark.",
);
