import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import * as shapefile from "shapefile";
import { load } from "cheerio";
const slug = (s) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const json = async (name) =>
  JSON.parse(await readFile(`tmp/geo/${name}`, "utf8"));
const checked = "2026-10-22";
const collections = {};
function shape(rings) {
  const valid = rings.filter(
    (r) =>
      r.length > 2 &&
      r.every(
        (p) => p.length >= 2 && Number.isFinite(p[0]) && Number.isFinite(p[1]),
      ),
  );
  if (!valid.length) return {};
  let w = Infinity,
    e = -Infinity,
    s = Infinity,
    n = -Infinity;
  for (const ring of valid)
    for (const [x, y] of ring) {
      w = Math.min(w, x);
      e = Math.max(e, x);
      s = Math.min(s, y);
      n = Math.max(n, y);
    }
  const f = Math.cos((((s + n) / 2) * Math.PI) / 180),
    scale = 260 / Math.max((e - w) * f, n - s);
  if (!Number.isFinite(scale)) return {};
  const path = valid
    .map(
      (r) =>
        r
          .filter((_, i) => i % Math.max(1, Math.ceil(r.length / 220)) === 0)
          .map(
            ([x, y], i) =>
              `${i ? "L" : "M"}${(20 + (x - w) * f * scale).toFixed(1)},${(20 + (n - y) * scale).toFixed(1)}`,
          )
          .join(" ") + "Z",
    )
    .join(" ");
  return { path, bounds: [w, s, e, n].map((v) => Number(v.toFixed(4))) };
}
const rings = (g) =>
  !g
    ? []
    : g.type === "Polygon"
      ? g.coordinates
      : g.type === "MultiPolygon"
        ? g.coordinates.flat()
        : [];
function collection(key, name, category, source, reference, note) {
  return (collections[key] = {
    name,
    category,
    source,
    reference,
    checked,
    note,
    units: [],
  });
}
const previous = JSON.parse(await readFile("data/territory.json", "utf8"));
const stream = await shapefile.open(
  "tmp/ibge/bairros/BR_bairros_CD2022.shp",
  undefined,
  { encoding: "utf-8" },
);
const byCode = new Map(
  Object.entries(previous.cities)
    .filter(([k]) => k !== "curitiba")
    .map(([k, c]) => [c.code, k]),
);
let next;
while (!(next = await stream.read()).done) {
  const { properties: p, geometry: g } = next.value;
  const key = byCode.get(p.CD_MUN);
  if (!key) continue;
  const c =
    collections[key] ||
    collection(
      key,
      p.NM_MUN,
      "bairros",
      previous.source,
      "Censo 2022",
      "Recorte de bairros da malha do IBGE de 2022. Limites e nomes podem ter sido alterados depois dessa referência.",
    );
  c.units.push({
    name: p.NM_BAIRRO,
    code: p.CD_BAIRRO,
    group: p.NM_SUBDIST || p.NM_DIST,
    groupLabel: p.NM_SUBDIST ? "Subdistrito na base" : "Distrito na base",
    ...shape(rings(g)),
  });
}
const rio = collection(
  "rio-branco",
  "Rio Branco",
  "bairros",
  "https://rbgeo.riobranco.ac.gov.br/server/rest/services/Hosted/bairros_regionais_2025_final/FeatureServer/0",
  "Camada Bairros Regionais 2025",
  "Bairros e regionais da camada pública municipal de 2025. A consulta não substitui confirmação de endereço e limites pela Prefeitura.",
);
for (const f of (await json("rioFeatures.json")).features)
  rio.units.push({
    name: f.properties.bairro,
    code: String(f.properties.cod_bairro),
    group: f.properties.regional_2,
    groupLabel: "Regional municipal",
    ...shape(rings(f.geometry)),
  });
const sp = collection(
  "sao-paulo",
  "São Paulo",
  "distritos",
  "https://geoftp.ibge.gov.br/organizacao_do_territorio/malhas_territoriais/malhas_de_setores_censitarios__divisoes_intramunicipais/censo_2022/distritos/shp/BR/BR_distritos_CD2022.zip",
  "Censo 2022",
  "São 96 distritos do município na base do IBGE. Distritos não equivalem a todos os bairros ou nomes de uso popular de São Paulo.",
);
for (const f of (await json("spFeatures.json")).features)
  sp.units.push({
    name: f.properties.NM_DIST,
    code: f.properties.CD_DIST,
    group: "São Paulo",
    groupLabel: "Município",
    ...shape(rings(f.geometry)),
  });
const go = collection(
  "goiania",
  "Goiânia",
  "localidades",
  "https://portalmapa.goiania.go.gov.br/servicogyn/rest/services/MapaServer/Mapa_Basico3/MapServer/313",
  "Cadastro municipal consultado em 22/10/2026",
  "A camada Divisas de Bairro também contém loteamentos, conjuntos e outras categorias cadastrais. Preservamos as abreviações da fonte; glebas e registros rurais genéricos foram excluídos. A data de atualização territorial não está declarada.",
);
const goGroups = new Map();
for (const f of (await json("goFeatures.json")).features) {
  const p = f.attributes;
  if (/^Gl|^Faz|^Sit|^Grj|^Col|^Zon|^Esp/.test(p.tp_bai) || !p.nm_bai?.trim())
    continue;
  const name = `${p.tp_bai} ${p.nm_bai}`.trim();
  const item = goGroups.get(name) || {
    name,
    ids: [],
    groups: new Set(),
    rings: [],
    type: p.tp_bai,
  };
  item.ids.push(p.OBJECTID);
  item.groups.add(p.id_re7);
  item.rings.push(...f.geometry.rings);
  goGroups.set(name, item);
}
for (const x of goGroups.values())
  go.units.push({
    name: x.name,
    code: x.ids.join(", "),
    group: [...x.groups].sort().join(" / "),
    groupLabel: "Código regional na camada",
    sourceType: x.type,
    ...shape(x.rings),
  });
const palmas = collection(
  "palmas",
  "Palmas",
  "areas",
  "https://geo.palmas.to.gov.br/mapas/",
  "GeoPalmas consultado em 22/10/2026",
  "O GeoPalmas organiza quadras e outras áreas em seis recortes: Norte, Nordeste, Noroeste, Sul, Sudeste e Sudoeste. Não apresentamos essas unidades como uma lista completa de bairros. Data de atualização de cada contorno não informada.",
);
const palmGroups = new Map();
for (const region of await json("palmasPlaces.json"))
  for (const x of region.records) {
    const p = x.fields;
    const rs = p.coordinate
      ? p.coordinate.split("#").map((r) =>
          r
            .trim()
            .split(/\s+/)
            .map((pair) => pair.split(",").slice(0, 2).map(Number)),
        )
      : [];
    const item = palmGroups.get(p.name) || {
      name: p.name,
      ids: [],
      groups: new Set(),
      rings: [],
    };
    item.ids.push(x.pk);
    item.groups.add(region.region);
    item.rings.push(...rs);
    palmGroups.set(p.name, item);
  }
for (const x of palmGroups.values())
  palmas.units.push({
    name: x.name,
    code: x.ids.join(", "),
    group: [...x.groups].sort().join(" / "),
    groupLabel: "Área no GeoPalmas",
    ...shape(x.rings),
  });
const df = collection(
  "brasilia",
  "Brasília / Distrito Federal",
  "regioes-administrativas",
  "https://segov.df.gov.br/category/administracoes-regionais",
  "Diretório SEGOV, atualizado em 18/08/2026",
  "O menu oficial reúne 37 administrações, incluindo Ponte Alta e 26 de Setembro. Um parágrafo da mesma página ainda informa 35; preservamos essa divergência. Regiões administrativas não são bairros nem municípios. Não foi inferido um contorno para estas fichas.",
);
const $ = load(await readFile("tmp/geo/dfRegions.txt", "utf8"));
for (const a of $("main a,.journal-content-article a").toArray()) {
  const label = $(a).text().trim(),
    href = $(a).attr("href");
  if (
    !/\((?:\s*RA\s*)?[IVX]+\)$/.test(label) &&
    !["Ponte Alta", "26 de Setembro"].includes(label)
  )
    continue;
  const name = label.replace(/\s*\([^)]*\)$/, "");
  if (df.units.some((x) => x.name === name)) continue;
  df.units.push({
    name,
    code: label.match(/\(([^)]+)\)/)?.[1]?.trim() || "Não indicado no menu",
    group: "Distrito Federal",
    groupLabel: "Unidade federativa",
    source: href,
  });
}
const topo = await json("saoluis-topology-1.json");
const decoded = topo.arcs.map((arc) => {
  let x = 0,
    y = 0;
  return arc.map((p) => {
    x += p[0];
    y += p[1];
    return topo.transform
      ? [
          x * topo.transform.scale[0] + topo.transform.translate[0],
          y * topo.transform.scale[1] + topo.transform.translate[1],
        ]
      : p;
  });
});
function arcRing(indices) {
  return indices.flatMap((index, i) => {
    const points = index < 0 ? [...decoded[~index]].reverse() : decoded[index];
    return i ? points.slice(1) : points;
  });
}
const sl = collection(
  "sao-luis",
  "São Luís",
  "bairros",
  "https://diieseplan.saoluis.ma.gov.br/?page_id=1099",
  "Painel municipal consultado em 22/10/2026",
  "O painel vincula setores a nomes de bairros, unidades de planejamento e distritos. O campo de nomes é BAIRROS_19; a data de atualização não está declarada. O desenho reúne setores associados ao nome, não certifica um limite legal atual.",
);
const slGroups = new Map();
let omitted = 0;
for (const g of topo.objects.mapa.geometries) {
  const p = g.properties;
  if (p.CD_GEOCODM !== "2111300" || !p.BAIRROS_19?.trim()) {
    omitted++;
    continue;
  }
  const name = p.BAIRROS_19.trim();
  const x = slGroups.get(name) || {
    name,
    ids: [],
    groups: new Set(),
    districts: new Set(),
    rings: [],
  };
  x.ids.push(String(p.Cod_setor));
  x.groups.add(p.UN_PLAN);
  x.districts.add(p.N_DISTRITO);
  const polygons = g.type === "Polygon" ? [g.arcs] : g.arcs;
  x.rings.push(...polygons.flatMap((poly) => poly.map(arcRing)));
  slGroups.set(name, x);
}
for (const x of slGroups.values())
  sl.units.push({
    name: x.name,
    code: `${x.ids.length} setor(es) associado(s)`,
    group: [...x.groups].filter(Boolean).sort().join(" / "),
    groupLabel: "Unidade de planejamento",
    district: [...x.districts].filter(Boolean).sort().join(" / "),
    ...shape(x.rings),
  });
for (const [key, c] of Object.entries(collections)) {
  const counts = new Map();
  for (const u of c.units) {
    const k = slug(u.name);
    counts.set(k, (counts.get(k) || 0) + 1);
  }
  c.units.forEach((u) => {
    u.slug =
      slug(u.name) + (counts.get(slug(u.name)) > 1 ? "-" + slug(u.code) : "");
    u.key = key + "/" + u.slug;
  });
  c.units.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  if (new Set(c.units.map((u) => u.slug)).size !== c.units.length)
    throw Error(`Duplicate ${key}`);
}
const hashes = {};
for (const name of [
  "rioFeatures.json",
  "spFeatures.json",
  "goFeatures.json",
  "palmasPlaces.json",
  "dfRegions.txt",
  "saoluis-topology-1.json",
])
  hashes[name] = createHash("sha256")
    .update(await readFile(`tmp/geo/${name}`))
    .digest("hex");
await writeFile(
  "data/national-territory.json",
  JSON.stringify({
    checked,
    hashes,
    omittedSaoLuisSectors: omitted,
    collections,
  }),
);
console.log(
  Object.entries(collections)
    .map(([k, c]) => `${k}: ${c.units.length} ${c.category}`)
    .join("\n"),
);
console.log(
  "New reference routes",
  Object.values(collections).reduce((n, c) => n + c.units.length, 0),
);
