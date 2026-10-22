import * as shapefile from "shapefile";
import { writeFile, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
const codes = [
  "1100205",
  "1200401",
  "1302603",
  "1400100",
  "1501402",
  "1600303",
  "1721000",
  "2111300",
  "2211001",
  "2304400",
  "2408102",
  "2507507",
  "2611606",
  "2704302",
  "2800308",
  "2927408",
  "3106200",
  "3205309",
  "3304557",
  "3550308",
  "4106902",
  "4205407",
  "4314902",
  "5002704",
  "5103403",
  "5208707",
  "5300108",
];
const source =
  "https://geoftp.ibge.gov.br/organizacao_do_territorio/malhas_territoriais/malhas_de_setores_censitarios__divisoes_intramunicipais/censo_2022/bairros/shp/BR/BR_bairros_CD2022.zip";
const slug = (s) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const stream = await shapefile.open(
  "tmp/ibge/bairros/BR_bairros_CD2022.shp",
  undefined,
  { encoding: "utf-8" },
);
const cities = {};
const curitiba = [];
let next;
while (!(next = await stream.read()).done) {
  const { properties: p, geometry: g } = next.value;
  if (!codes.includes(p.CD_MUN)) continue;
  const city = (cities[slug(p.NM_MUN)] ||= {
    code: p.CD_MUN,
    name: p.NM_MUN,
    neighborhoods: [],
  });
  city.neighborhoods.push({
    name: p.NM_BAIRRO,
    code: p.CD_BAIRRO,
    district: p.NM_DIST,
  });
  if (p.CD_MUN !== "4106902") continue;
  const rings = g.type === "Polygon" ? g.coordinates : g.coordinates.flat();
  const pts = rings.flat();
  const west = Math.min(...pts.map((p) => p[0])),
    east = Math.max(...pts.map((p) => p[0]));
  const south = Math.min(...pts.map((p) => p[1])),
    north = Math.max(...pts.map((p) => p[1]));
  const factor = Math.cos((((north + south) / 2) * Math.PI) / 180);
  const scale = 260 / Math.max((east - west) * factor, north - south);
  const paths = rings
    .map(
      (r) =>
        r
          .filter((_, i) => i % Math.max(1, Math.floor(r.length / 400)) === 0)
          .map(
            (p, i) =>
              `${i ? "L" : "M"}${(20 + (p[0] - west) * factor * scale).toFixed(1)},${(20 + (north - p[1]) * scale).toFixed(1)}`,
          )
          .join(" ") + "Z",
    )
    .join(" ");
  curitiba.push({
    name: p.NM_BAIRRO,
    slug:
      {
        "cidade-industrial-de-curitiba": "cidade-industrial",
        botiatuvinha: "butiatuvinha",
      }[slug(p.NM_BAIRRO)] || slug(p.NM_BAIRRO),
    code: p.CD_BAIRRO,
    district: p.NM_DIST,
    path: paths,
  });
}
for (const city of Object.values(cities))
  city.neighborhoods.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
curitiba.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
const sha256 = createHash("sha256")
  .update(await readFile("tmp/ibge/bairros.zip"))
  .digest("hex");
await writeFile(
  "data/territory.json",
  JSON.stringify(
    {
      source,
      referenceYear: 2022,
      checked: "2026-10-22",
      sha256,
      cities,
      curitiba,
    },
    null,
    2,
  ),
);
console.log(
  `${Object.keys(cities).length} capitals; ${Object.values(cities).reduce((sum, c) => sum + c.neighborhoods.length, 0)} source records; ${curitiba.length} Curitiba reference pages.`,
);
