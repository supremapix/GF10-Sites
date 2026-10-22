import sharp from "sharp";
import { readFile, mkdir } from "node:fs/promises";
const data = JSON.parse(await readFile("data/national-territory.json", "utf8"));
const mark = await sharp(await readFile("public/favicon.svg"))
  .resize(36, 36)
  .png()
  .toBuffer();
const esc = (s) =>
  s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
function wrap(text, max) {
  const lines = [];
  for (const word of text.split(/\s+/)) {
    if (!lines.length || lines.at(-1).length + word.length + 1 > max)
      lines.push(word);
    else lines[lines.length - 1] += " " + word;
  }
  return lines;
}
let count = 0;
for (const [city, c] of Object.entries(data.collections)) {
  const dir = `public/images/local/national/${city}`;
  await mkdir(dir, { recursive: true });
  for (const u of c.units) {
    const lines = wrap(u.name, u.name.length > 26 ? 25 : 19),
      font = u.name.length > 26 ? 15 : 20;
    const label = lines
      .map(
        (line, i) =>
          `<text x="18" y="${91 + i * 22}" fill="#9bbdff" font-family="Arial" font-size="${font}" font-weight="700">${esc(line)}</text>`,
      )
      .join("");
    const svg = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="250" height="250"><rect width="250" height="250" fill="#020617"/><text x="61" y="38" fill="white" font-family="Arial" font-size="28" font-weight="700">GF10</text><text x="18" y="62" fill="#dce3ee" font-family="Arial" font-size="12">${esc(c.name)}</text>${label}<text x="18" y="153" fill="#dce3ee" font-family="Arial" font-size="11">ATENDIMENTO REMOTO</text><text x="18" y="176" fill="white" font-family="Arial" font-size="16" font-weight="700">Sites · Lojas · Sistemas</text><rect y="190" width="250" height="60" fill="#10b981"/><text x="18" y="210" fill="#020617" font-family="Arial" font-size="12" font-weight="700">WHATSAPP</text><text x="18" y="236" fill="#020617" font-family="Arial" font-size="23" font-weight="700">(41) 99272-1004</text></svg>`,
    );
    if (lines.length > 3) throw Error(`Label does not fit: ${u.name}`);
    await sharp(svg)
      .composite([{ input: mark, left: 18, top: 10 }])
      .webp({ lossless: true })
      .toFile(`${dir}/${u.slug}-250.webp`);
    count++;
  }
}
console.log(`${count} national locality images generated at 250x250.`);
