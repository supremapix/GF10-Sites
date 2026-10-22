import React from "react";
import { NationalDirectory } from "./NationalTerritory";
import territory from "../data/territory.json";
import { regions, districts, slug } from "../data/coverage";
import { whatsapp } from "../data/site";

export const capitalPath = (name: string) =>
  name === "Curitiba"
    ? "/criacao-de-sites-curitiba"
    : `/brasil/capitais/${slug(name)}`;
export const capitals = regions.flatMap((r) =>
  r.cities.map(([name, uf, brief]) => ({
    name,
    uf,
    brief,
    region: r.key,
    key: slug(name),
  })),
);
export const neighborhoods = territory.curitiba;
export const neighborhoodPath = (key: string) =>
  `/brasil/curitiba/bairros/${key}`;

export function CuritibaDirectory() {
  return (
    <section className="wrap section territory-directory">
      <h2>Encontre a ficha do bairro</h2>
      <p>
        75 fichas territoriais com contorno de referência, fontes e links da
        organização regional.
      </p>
      <Filter label="Filtrar bairros de Curitiba" />
      <ul className="territory-list">
        {neighborhoods.map((n) => (
          <li
            data-place={
              n.name + (n.slug === "butiatuvinha" ? " Butiatuvinha" : "")
            }
            key={n.slug}
          >
            <a href={neighborhoodPath(n.slug)}>{n.name}</a>
          </li>
        ))}
      </ul>
      <p data-filter-status role="status" aria-live="polite" />
    </section>
  );
}

export function CapitalDirectory() {
  return (
    <section className="wrap section territory-directory">
      <h2>Escolha sua capital</h2>
      <p>
        27 capitais com páginas próprias e fichas territoriais navegáveis.
        Bairros, distritos, quadras e regiões administrativas permanecem
        identificados por tipo, fonte e limitações da cobertura.
      </p>
      <Filter label="Filtrar capitais" />
      <ul className="territory-list">
        {capitals.map((c) => (
          <li data-place={c.name + " " + c.uf} key={c.key}>
            <a href={capitalPath(c.name)}>
              {c.name} <span>{c.uf}</span>
            </a>
          </li>
        ))}
      </ul>
      <p data-filter-status role="status" aria-live="polite" />
    </section>
  );
}
function Filter({ label }: { label: string }) {
  return (
    <div className="territory-filter" hidden>
      <label htmlFor="territory-search">{label}</label>
      <input
        id="territory-search"
        type="search"
        autoComplete="off"
        placeholder="Digite parte do nome"
      />
    </div>
  );
}
export function CapitalPage({ cityKey }: { cityKey: string }) {
  const city = capitals.find((c) => c.key === cityKey)!;
  return (
    <>
      <section className="wrap section">
        <nav aria-label="Caminho territorial">
          <a href="/criacao-de-sites-brasil">Brasil</a> /{" "}
          <a href={`/brasil/${city.region}`}>Região</a> /{" "}
          <span aria-current="page">{city.name}</span>
        </nav>
        <p className="eyebrow">{city.uf} / Atendimento remoto</p>
        <h1>Seu projeto digital em {city.name}</h1>
        <p className="lead">{city.brief}</p>
        <h2>Transformar cobertura em informação útil</h2>
        <p>
          Antes de publicar páginas locais, descreva onde sua empresa realmente
          presta serviços, entrega ou permite retirada. A GF10 desenvolve o
          projeto remotamente: esta página não representa uma unidade física em{" "}
          {city.name}.
        </p>
        <p>
          O briefing deve relacionar o serviço com a área atendida e explicar
          eventuais condições. Endereços, imagens de trabalhos e depoimentos só
          entram quando forem reais e autorizados.
        </p>
        <ul>
          <li>
            Defina se o objetivo é apresentar a empresa, receber pedidos ou
            operar uma loja.
          </li>
          <li>
            Separe cobertura da capital e de municípios vizinhos; cada um pode
            ter condições diferentes.
          </li>
          <li>
            Prepare textos, fotos e critérios de atendimento para uma avaliação
            de escopo.
          </li>
        </ul>
        <p>
          <a href="/guias/planejar-site">
            Planejar um site orientado a contatos
          </a>{" "}
          ·{" "}
          <a href="/guias/site-loja-ou-app">
            Escolher site, loja ou aplicativo
          </a>
        </p>
      </section>
      <NationalDirectory cityKey={cityKey} />
      <section className="wrap section">
        <h2>O próximo passo depende da sua operação</h2>
        <p>
          Uma empresa de serviços pode começar por{" "}
          <a href="/solucoes/sites-e-landing-pages">um site institucional</a>.
          Quem vende produtos precisa avaliar{" "}
          <a href="/solucoes/lojas-virtuais">catálogo, pagamento e logística</a>
          . Se já existe um site, podemos discutir{" "}
          <a href="/solucoes/manutencao-e-modernizacao">
            modernização e manutenção
          </a>
          . Integrações, idiomas e sistemas são avaliados conforme os
          requisitos, sem promessa de resultado comercial.
        </p>
        <a
          className="button"
          href={whatsapp(
            `planejar um projeto digital em ${city.name}, ${city.uf}`,
          )}
        >
          Conversar sobre {city.name}
        </a>
      </section>
    </>
  );
}

export function NeighborhoodPage({ placeKey }: { placeKey: string }) {
  const place = neighborhoods.find((n) => n.slug === placeKey)!;
  const groups = districts.filter((d) =>
    d.names.split("|").some((n) => slug(n) === placeKey),
  );
  const related = [
    ...new Set(groups.flatMap((d) => d.names.split("|"))),
  ].filter((n) => slug(n) !== placeKey);
  return (
    <>
      <section className="wrap section">
        <nav aria-label="Caminho territorial">
          <a href="/criacao-de-sites-brasil">Brasil</a> /{" "}
          <a href="/criacao-de-sites-curitiba">Curitiba</a> /{" "}
          <span aria-current="page">{place.name}</span>
        </nav>
        <p className="eyebrow">Ficha territorial / Curitiba — PR</p>
        <h1>{place.name}: referência para sua área de atendimento</h1>
        <p className="lead">
          Consulte o recorte do bairro e sua organização regional antes de
          descrever a cobertura da sua empresa no site.
        </p>
        <div className="split">
          <figure className="territory-map">
            <svg
              viewBox="0 0 300 300"
              role="img"
              aria-labelledby="boundary-title"
            >
              <title id="boundary-title">
                {`Recorte esquemático de ${place.name} na malha do IBGE de 2022`}
              </title>
              <path
                d={place.path}
                fill="#dce8fb"
                stroke="#1d4ed8"
                strokeWidth="1.5"
                fillRule="evenodd"
              />
            </svg>
            <figcaption>
              Contorno simplificado, norte para cima. Referência de 2022, sem
              escala para navegação ou definição legal de limites.
            </figcaption>
          </figure>
          <div>
            <h2>Identificação verificável</h2>
            {placeKey === "butiatuvinha" && (
              <p>
                O IBGE registra “Botiatuvinha” nesta base; a relação municipal
                consultada usa “Butiatuvinha”. As duas grafias estão reunidas
                nesta ficha.
              </p>
            )}
            <dl>
              <dt>Município</dt>
              <dd>Curitiba, Paraná · IBGE 4106902</dd>
              <dt>Bairro na base do IBGE</dt>
              <dd>
                {place.name} · código {place.code}
              </dd>
              <dt>Distrito na base</dt>
              <dd>{place.district}</dd>
              <dt>Regional municipal</dt>
              <dd>
                {groups.map((d) => d.name).join(" / ") ||
                  "Consultar a Prefeitura para correspondência atual."}
              </dd>
            </dl>
            {groups.map((d) => (
              <p key={d.name}>
                <a
                  href={`https://regionais.curitiba.pr.gov.br/conteudo/${d.source}`}
                >
                  Relação de bairros da regional {d.name}
                </a>
              </p>
            ))}
            {groups.length > 1 && (
              <p>
                Campo Comprido aparece nas relações de duas regionais
                municipais. Essa divisão de atendimento não cria dois bairros
                diferentes.
              </p>
            )}
            <p>
              <a href={territory.source}>
                Fonte cartográfica: IBGE, Censo 2022 (ZIP)
              </a>
              . Conferência em 22/10/2026. Fontes de anos diferentes podem
              adotar recortes distintos.
            </p>
          </div>
        </div>
      </section>
      <section className="wrap section">
        <h2>Como usar esta referência no planejamento</h2>
        <p>
          O contorno identifica uma unidade territorial; ele não comprova que
          sua empresa atende todo o bairro. Para visitas, confirme o endereço de
          cada solicitação e eventuais condições de deslocamento. Para entregas,
          confira a área e as regras com quem fará a operação.
        </p>
        <p>
          Ao preparar uma página sobre {place.name}, reúna informações próprias:
          serviços disponíveis, condições locais e exemplos reais autorizados. A
          localização, sozinha, não justifica repetir uma página comercial. Esta
          ficha serve à consulta e navegação do diretório e permanece fora do
          sitemap de busca enquanto não tiver conteúdo comercial específico.
        </p>
        <p>
          A GF10 atende projetos remotamente. Não há declaração de escritório
          neste bairro, tráfego obtido ou posição em mecanismos de busca.
        </p>
        <p>
          <a href="/guias/preparar-materiais">Preparar textos e fotos</a> ·{" "}
          <a href="/solucoes/seo-tecnico">Conhecer o trabalho de SEO técnico</a>{" "}
          ·{" "}
          <a href="/guias/medir-e-melhorar">
            Medir contatos sem prometer resultados
          </a>
        </p>
      </section>
      <section className="wrap section">
        <h2>Outros bairros da mesma organização regional</h2>
        <p>
          A relação abaixo segue as regionais da Prefeitura; não significa que
          todos compartilham divisas com {place.name}.
        </p>
        <ul className="territory-list">
          {related.map((n) => (
            <li key={n}>
              <a href={neighborhoodPath(slug(n))}>{n}</a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
