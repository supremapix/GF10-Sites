import React from "react";
import snapshot from "../data/national-territory.json";
export type Unit = {
  name: string;
  slug: string;
  key: string;
  code: string;
  group: string;
  groupLabel: string;
  district?: string;
  sourceType?: string;
  source?: string;
  path?: string;
  bounds?: number[];
};
export type Collection = {
  name: string;
  category: string;
  source: string;
  reference: string;
  checked: string;
  note: string;
  units: Unit[];
};
export const collections = snapshot.collections as Record<string, Collection>;
export const categoryLabels: Record<string, string> = {
  bairros: "bairros",
  distritos: "distritos",
  localidades: "localidades cadastrais",
  areas: "quadras e áreas",
  "regioes-administrativas": "regiões administrativas",
};
export const unitPath = (city: string, unit: Unit) =>
  `/brasil/${city}/${collections[city].category}/${unit.slug}`;
export const nationalUnits = Object.entries(collections).flatMap(([city, c]) =>
  c.units.map((unit) => ({
    city,
    collection: c,
    unit,
    path: unitPath(city, unit),
  })),
);
const byKey = new Map(nationalUnits.map((item) => [item.unit.key, item]));
export function NationalDirectory({ cityKey }: { cityKey: string }) {
  const c = collections[cityKey];
  return (
    <section className="wrap section territory-directory">
      <h2>
        {categoryLabels[c.category]} de {c.name}: fichas navegáveis
      </h2>
      <p>
        {c.units.length} fichas de referência disponíveis nesta fonte. {c.note}
      </p>
      <p>
        Consulte o registro de cada localidade, sua organização territorial e o
        desenho quando a fonte o fornece. Estas fichas não representam
        escritórios da GF10 nem comprovam cobertura operacional de outras
        empresas.
      </p>
      <div className="territory-filter" hidden>
        <label htmlFor="territory-search">
          Filtrar localidades de {c.name}
        </label>
        <input
          id="territory-search"
          type="search"
          autoComplete="off"
          placeholder="Nome ou organização territorial"
        />
      </div>
      <ul className="territory-list">
        {c.units.map((u) => (
          <li key={u.key} data-place={`${u.name} ${u.group}`}>
            <a href={unitPath(cityKey, u)}>{u.name}</a>
          </li>
        ))}
      </ul>
      <p data-filter-status role="status" aria-live="polite" />
      <p>
        <a href={c.source}>Consultar a fonte territorial</a> · {c.reference}.
        Extração conferida em 22/10/2026.
      </p>
    </section>
  );
}
export function NationalTerritoryPage({ unitKey }: { unitKey: string }) {
  const { city, collection: c, unit: u } = byKey.get(unitKey)!;
  const index = c.units.indexOf(u);
  const related = c.units
    .filter((x) => x.key !== u.key && x.group === u.group)
    .slice(0, 6);
  const previous = c.units[index - 1],
    next = c.units[index + 1];
  return (
    <>
      <section className="wrap section">
        <nav aria-label="Caminho territorial">
          <a href="/criacao-de-sites-brasil">Brasil</a> /{" "}
          <a href={`/brasil/capitais/${city}`}>{c.name}</a> /{" "}
          <span aria-current="page">{u.name}</span>
        </nav>
        <p className="eyebrow">
          {categoryLabels[c.category]} / Referência territorial
        </p>
        <h1>
          {u.name}, {c.name}
        </h1>
        <p className="lead">
          Identificação territorial para localizar sua área de atendimento e
          preparar as informações do seu projeto.
        </p>
        <div className="split">
          {u.path ? (
            <figure className="territory-map">
              <svg
                viewBox="0 0 300 300"
                role="img"
                aria-labelledby="unit-map-title"
              >
                <title id="unit-map-title">{`Recorte de referência de ${u.name}, ${c.name}`}</title>
                <path
                  d={u.path}
                  fill="#dce8fb"
                  stroke="#1d4ed8"
                  strokeWidth="1.3"
                  fillRule="evenodd"
                />
              </svg>
              <figcaption>
                {city === "sao-luis"
                  ? "Setores associados ao nome no painel municipal."
                  : "Contorno simplificado da fonte indicada."}{" "}
                Norte para cima, sem escala para navegação ou determinação legal
                de limites.
              </figcaption>
            </figure>
          ) : (
            <aside className="note">
              <h2>Referência sem desenho de limites</h2>
              <p>
                {city === "brasilia"
                  ? "Esta ficha usa o diretório oficial de administrações regionais. Não foi atribuído um mapa de bairro à região administrativa."
                  : "O registro público consultado não contém coordenadas utilizáveis para esta área. O nome foi preservado, sem inventar um contorno."}
              </p>
              <a href={u.source || c.source}>Consultar o registro oficial</a>
            </aside>
          )}
          <div>
            <h2>Dados desta localidade</h2>
            <dl>
              <dt>Nome na fonte</dt>
              <dd>{u.name}</dd>
              <dt>Capital / referência</dt>
              <dd>{c.name}</dd>
              <dt>Identificador na fonte</dt>
              <dd>{u.code}</dd>
              <dt>{u.groupLabel}</dt>
              <dd>{u.group || "Não informado na fonte"}</dd>
              {u.district && (
                <>
                  <dt>Distrito no painel</dt>
                  <dd>{u.district}</dd>
                </>
              )}
              {u.sourceType && (
                <>
                  <dt>Classificação original</dt>
                  <dd>{u.sourceType} — nomenclatura preservada do cadastro</dd>
                </>
              )}
            </dl>
            <p>
              <a href={u.source || c.source}>
                Fonte oficial e consulta complementar
              </a>
            </p>
            <p>{c.reference}. Extração conferida em 22/10/2026.</p>
          </div>
        </div>
        <aside className="note">
          <h2>Como interpretar este recorte</h2>
          <p>{c.note}</p>
        </aside>
      </section>
      <section className="wrap section">
        <h2>Do endereço ao conteúdo do site</h2>
        <p>
          Use esta referência para conferir o nome da localidade. Para declarar
          cobertura, confirme quais serviços sua empresa realiza, se há
          deslocamento ou entrega e quais condições dependem do endereço. A
          presença de um nome no diretório não demonstra atendimento integral da
          área.
        </p>
        <p>
          Para um projeto relacionado a {u.name}, reúna textos, imagens
          autorizadas e condições reais da operação. Um site pode complementar
          as redes sociais e organizar essas informações; a localização não
          garante visitas, posições em buscas ou vendas. O trabalho da GF10 é
          remoto, sem declaração de filial nesta localidade.
        </p>
        <p>
          <a href="/guias/preparar-materiais">Preparar materiais do projeto</a>{" "}
          ·{" "}
          <a href="/solucoes/sites-e-landing-pages">
            Sites institucionais e landing pages
          </a>{" "}
          · <a href="/guias/medir-e-melhorar">Medir e melhorar a experiência</a>
        </p>
      </section>
      <section className="wrap section">
        <h2>Continue pelo diretório</h2>
        <p>
          <a href={`/brasil/capitais/${city}`}>Todas as fichas de {c.name}</a>
        </p>
        {related.length > 0 && (
          <>
            <h3>Outros registros da mesma organização territorial</h3>
            <p>
              O agrupamento segue o campo da fonte. Não indica necessariamente
              divisas comuns ou proximidade.
            </p>
            <ul className="territory-list">
              {related.map((x) => (
                <li key={x.key}>
                  <a href={unitPath(city, x)}>{x.name}</a>
                </li>
              ))}
            </ul>
          </>
        )}
        <nav
          aria-label="Fichas em ordem alfabética"
          className="territory-pagination"
        >
          {previous && <a href={unitPath(city, previous)}>← {previous.name}</a>}
          {next && <a href={unitPath(city, next)}>{next.name} →</a>}
        </nav>
      </section>
    </>
  );
}
export function getNationalUnit(key: string) {
  return byKey.get(key)!;
}
