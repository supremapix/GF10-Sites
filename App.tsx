import React from "react";
import {
  nationalUnits,
  NationalTerritoryPage,
  getNationalUnit,
} from "./components/NationalTerritory";
import {
  CapitalDirectory,
  CuritibaDirectory,
  CapitalPage,
  NeighborhoodPage,
  capitals,
  neighborhoods,
  capitalPath,
  neighborhoodPath,
} from "./components/Territory";
import FloatingActions from "./components/FloatingActions";
import { regions, districts, slug } from "./data/coverage";
import { services, guides, type Editorial } from "./data/editorial";
import { whatsapp, DISPLAY_WHATSAPP } from "./data/site";
export type Page = {
  path: string;
  title: string;
  description: string;
  kind: string;
  key?: string;
  noindex?: boolean;
};
export const pages: Page[] = [
  ...nationalUnits.map(({ unit, collection, path }) => ({
    path,
    title: `${unit.name}, ${collection.name}: referência territorial | GF10`,
    description: `Consulte ${unit.name}, em ${collection.name}: ${unit.groupLabel.toLowerCase()} ${unit.group || "não informado"}, fonte e referência territorial para planejar sua área de atendimento.`,
    kind: "territory",
    key: unit.key,
    noindex: true,
  })),
  ...capitals
    .filter((c) => c.name !== "Curitiba")
    .map((c) => ({
      path: capitalPath(c.name),
      title: `Sites em ${c.name}: planejamento e cobertura | GF10`,
      description: `${c.brief} Conheça a referência territorial e planeje seu projeto com atendimento remoto da GF10.`,
      kind: "capital",
      key: c.key,
    })),
  ...neighborhoods.map((n) => ({
    path: neighborhoodPath(n.slug),
    title: `${n.name}, Curitiba: referência territorial | GF10`,
    description: `Consulte o recorte de ${n.name} no IBGE, a organização regional de Curitiba e orientações para definir a cobertura real da sua empresa.`,
    kind: "neighborhood",
    key: n.slug,
    noindex: true,
  })),
  {
    path: "/",
    title: "Criação de sites em Curitiba e no Brasil | GF10",
    description:
      "Sites com identidade, conteúdo claro e caminho direto ao WhatsApp. Conheça as soluções da GF10 e planeje seu projeto em Curitiba ou no Brasil.",
    kind: "home",
  },
  {
    path: "/criacao-de-sites-curitiba",
    title: "Criação de sites em Curitiba: bairros e projeto | GF10",
    description:
      "Planeje seu site em Curitiba. Guia de contratação, atendimento remoto e 75 bairros organizados por regional, sem filiais fictícias.",
    kind: "curitiba",
  },
  {
    path: "/criacao-de-sites-brasil",
    title: "Criação de sites no Brasil: 27 capitais | GF10",
    description:
      "Atendimento remoto para projetos de sites nas 27 capitais. Guias regionais, escopo, materiais e próximos passos pelo WhatsApp.",
    kind: "brasil",
  },
  ...regions.map((r) => ({
    path: `/brasil/${r.key}`,
    title: `Criação de sites no ${r.name}: guia das capitais | GF10`,
    description: `${r.focus}. Planeje seu site com atendimento remoto nas capitais do ${r.name} e confira o que preparar para o projeto.`,
    kind: "region",
    key: r.key,
  })),
  {
    path: "/solucoes",
    title: "Sites, lojas e soluções digitais sob escopo | GF10",
    description:
      "Conheça soluções para sites, lojas virtuais, outros idiomas, PWA, sistemas web, manutenção e SEO técnico. Viabilidade e escopo avaliados por projeto.",
    kind: "services",
  },
  ...services.map((s) => ({
    path: `/solucoes/${s.slug}`,
    title: `${s.title} | GF10`,
    description: s.description,
    kind: "service",
    key: s.slug,
  })),
  {
    path: "/guias",
    title: "Guias para planejar e melhorar seu site | GF10",
    description:
      "Passo a passo para preparar um site, escolher sua solução digital, organizar uma loja, publicar em outro idioma e medir interesse.",
    kind: "guides",
  },
  ...guides.map((g) => ({
    path: `/guias/${g.slug}`,
    title: `${g.title} | GF10`,
    description: g.description,
    kind: "guide",
    key: g.slug,
  })),
  {
    path: "/sitemap",
    title: "Mapa do site | GF10",
    description:
      "Navegue pelas soluções, guias práticos e cobertura de criação de sites da GF10 em Curitiba e no Brasil.",
    kind: "map",
  },
  {
    path: "/404",
    title: "Página não encontrada | GF10",
    description:
      "Esta página não está disponível. Acesse as soluções e guias da GF10.",
    kind: "404",
  },
];
const Arrow = () => <span aria-hidden="true">↗</span>;
function CTA({
  context,
  label = "Conversar pelo WhatsApp",
  light = false,
}: {
  context: string;
  label?: string;
  light?: boolean;
}) {
  return (
    <a className={`button ${light ? "light" : ""}`} href={whatsapp(context)}>
      {label}
      <Arrow />
    </a>
  );
}
function Photo({
  name,
  alt,
  priority = false,
}: {
  name: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`/images/${name}-640.avif 640w, /images/${name}-1200.avif 1200w`}
        sizes="(max-width: 800px) 100vw, 55vw"
      />
      <img
        src={`/images/${name}-1200.webp`}
        srcSet={`/images/${name}-640.webp 640w, /images/${name}-1200.webp 1200w`}
        sizes="(max-width: 800px) 100vw, 55vw"
        alt={alt}
        width="1200"
        height="800"
        loading={priority ? "eager" : "lazy"}
        {...{ fetchpriority: priority ? "high" : "auto" }}
      />
    </picture>
  );
}
function Header({ page }: { page: Page }) {
  return (
    <>
      <a className="skip" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="header wrap">
        <a className="brand" href="/">
          <img src="/favicon.svg" width="42" height="42" alt="" />
          <span>
            GF10<small>SUPREMA SITES EXPRESS</small>
          </span>
        </a>
        <nav aria-label="Principal">
          <a
            href="/solucoes"
            aria-current={
              page.path.startsWith("/solucoes") ? "page" : undefined
            }
          >
            Soluções
          </a>
          <a href="/criacao-de-sites-curitiba">Curitiba</a>
          <a href="/criacao-de-sites-brasil">Brasil</a>
          <a href="/guias">Guias</a>
        </nav>
        <a className="header-contact" href={whatsapp(page.title)}>
          WhatsApp <Arrow />
        </a>
      </header>
    </>
  );
}
function Footer({ page }: { page: Page }) {
  return (
    <>
      <section
        className="closing wrap"
        id="contato"
        aria-label="Contato pelo WhatsApp"
      >
        <p className="eyebrow">O próximo passo é uma conversa</p>
        <h2>
          O que seu site
          <br />
          precisa fazer por você?
        </h2>
        <div>
          <p>
            Conte o que você oferece, para quem e em qual cidade. A partir
            disso, avaliamos o caminho e o escopo.
          </p>
          <CTA context={page.title} />
        </div>
      </section>
      <footer className="footer">
        <div className="wrap footer-grid">
          <a className="brand" href="/">
            GF10<small>Suprema Sites Express</small>
          </a>
          <p>
            Criação de sites em Curitiba.
            <br />
            Atendimento remoto para o Brasil.
          </p>
          <div>
            <a href={whatsapp(page.title)}>WhatsApp {DISPLAY_WHATSAPP}</a>
            <br />
            <a href="/sitemap">Mapa do site</a>
          </div>
        </div>
        <div className="wrap fineprint">
          © {new Date().getFullYear()} GF10 / Suprema Sites Express. Projetos
          sujeitos a avaliação de escopo.
        </div>
      </footer>
    </>
  );
}
function HeroTitle({
  label,
  title,
  intro,
}: {
  label: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="page-hero wrap">
      <p className="eyebrow">{label}</p>
      <h1>{title}</h1>
      <p className="lead">{intro}</p>
    </section>
  );
}
function ServiceList() {
  return (
    <div className="service-list">
      {services.map((s, i) => (
        <a href={`/solucoes/${s.slug}`} key={s.slug}>
          <span className="index">0{i + 1}</span>
          <div>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
          </div>
          <Arrow />
        </a>
      ))}
    </div>
  );
}
function GuideList() {
  return (
    <div className="guide-list">
      {guides.map((g, i) => (
        <a href={`/guias/${g.slug}`} key={g.slug}>
          <span className="eyebrow">Guia 0{i + 1} / Passo a passo</span>
          <h3>{g.title}</h3>
          <p>{g.description}</p>
          <span className="text-link">
            Ler o guia <Arrow />
          </span>
        </a>
      ))}
    </div>
  );
}
function RegionLinks() {
  return (
    <div className="region-links">
      {regions.map((r) => (
        <a href={`/brasil/${r.key}`} key={r.key}>
          <strong>{r.name}</strong>
          <span>{r.cities.map((c) => c[0]).join(" · ")}</span>
          <Arrow />
        </a>
      ))}
    </div>
  );
}
function Home() {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <p className="eyebrow">Criação de sites · Curitiba + Brasil</p>
          <h1>
            Seu negócio
            <br />
            tem identidade.
            <br />
            <em>Seu site também.</em>
          </h1>
          <p className="lead">
            Design com intenção. Conteúdo que explica. Um caminho claro entre
            quem chega ao seu site e quem conversa com você.
          </p>
          <CTA context="novo site para minha empresa" />
          <a className="under-link" href="/solucoes">
            Conhecer as soluções <Arrow />
          </a>
        </div>
        <figure className="hero-photo">
          <Photo
            name="site-responsivo"
            alt="Cena ilustrativa de notebook e celular mostrando versões de um mesmo site"
            priority
          />
          <figcaption>
            01 / Uma experiência, em diferentes telas.
            <span>Imagem ilustrativa gerada por IA.</span>
          </figcaption>
          <div className="photo-label" aria-hidden="true">
            DO PRIMEIRO
            <br />
            OLHAR À<br />
            <strong>CONVERSA.</strong>
          </div>
        </figure>
      </section>
      <div className="ribbon">
        <div className="wrap">
          <span>Estratégia de conteúdo</span>
          <span>Design responsivo</span>
          <span>Contato pelo WhatsApp</span>
        </div>
      </div>
      <section className="section wrap" id="servicos">
        <div className="section-heading">
          <p className="eyebrow">01 / Soluções</p>
          <h2>
            O formato certo
            <br />
            para o seu próximo passo.
          </h2>
          <p>
            Da apresentação da empresa a uma operação digital. Cada projeto
            começa com uma necessidade concreta e um escopo possível.
          </p>
        </div>
        <ServiceList />
      </section>
      <section className="process">
        <div className="wrap process-grid">
          <figure>
            <Photo
              name="planejamento"
              alt="Cena ilustrativa de caderno com esboços de páginas para computador e celular"
            />
            <figcaption>
              Planejar antes de construir. Imagem ilustrativa gerada por IA.
            </figcaption>
          </figure>
          <div>
            <p className="eyebrow">02 / Do briefing à publicação</p>
            <h2>
              Primeiro, entender.
              <br />
              Depois, desenhar.
            </h2>
            <ol className="steps">
              <li>
                <strong>O negócio e o objetivo</strong>
                <p>
                  Público, serviço, área de atendimento e o que a primeira
                  versão precisa resolver.
                </p>
              </li>
              <li>
                <strong>Conteúdo e direção visual</strong>
                <p>
                  Uma estrutura aprovada com você, usando informações e
                  materiais reais.
                </p>
              </li>
              <li>
                <strong>Construção e revisão</strong>
                <p>
                  Validar navegação, conteúdo e contato antes da publicação.
                  Combinar a manutenção depois dela.
                </p>
              </li>
            </ol>
            <a className="text-link" href="/guias/planejar-site">
              Como preparar seu projeto <Arrow />
            </a>
          </div>
        </div>
      </section>
      <section className="section wrap">
        <div className="section-heading">
          <p className="eyebrow">03 / Conhecimento que ajuda a decidir</p>
          <h2>
            Um bom site começa
            <br />
            com boas perguntas.
          </h2>
          <p>
            Guias diretos para organizar a ideia, evitar retrabalho e conversar
            sobre o que importa.
          </p>
        </div>
        <GuideList />
      </section>
      <section className="coverage">
        <div className="wrap">
          <p className="eyebrow">
            04 / Curitiba como foco. Brasil como alcance.
          </p>
          <h2>
            Seu endereço não limita
            <br />a nossa conversa.
          </h2>
          <p className="lead">
            Atendimento remoto nas 27 capitais. Sem confundir cobertura com
            presença física.
          </p>
          <div className="coverage-grid">
            <a className="curitiba-link" href="/criacao-de-sites-curitiba">
              <span>CURITIBA / PR</span>
              <strong>
                Do seu bairro
                <br />
                ao seu próximo cliente.
              </strong>
              <span>
                Conheça o guia de Curitiba <Arrow />
              </span>
            </a>
            <RegionLinks />
          </div>
        </div>
      </section>
      <section className="section wrap faq">
        <p className="eyebrow">Antes de começar</p>
        <h2>Dúvidas, sem rodeios.</h2>
        <details>
          <summary>Quanto custa e quanto tempo leva?</summary>
          <p>
            Depende das páginas, conteúdo, integrações e revisões. Conte seu
            objetivo pelo WhatsApp para avaliarmos o escopo antes de propor
            valor e prazo.
          </p>
        </details>
        <details>
          <summary>A GF10 atende fora de Curitiba?</summary>
          <p>
            Sim, o projeto pode ser conduzido remotamente. Materiais, aprovação
            e condições de atendimento são combinados conforme a necessidade.
          </p>
        </details>
        <details>
          <summary>Vocês garantem vendas ou posições no Google?</summary>
          <p>
            Não. Design, conteúdo e estrutura técnica ajudam o visitante a
            entender a oferta. Vendas, indexação e posicionamento dependem de
            outros fatores e sistemas externos.
          </p>
        </details>
      </section>
    </>
  );
}
function Curitiba() {
  return (
    <>
      <HeroTitle
        label="Curitiba / Paraná"
        title="Criação de sites em Curitiba, com contexto de verdade."
        intro="O bairro ajuda a situar seu negócio. O conteúdo precisa explicar o que você faz. Planejamos sites com informação útil e contato direto pelo WhatsApp, com processo remoto."
      />
      <section className="wrap split section">
        <div>
          <h2>Uma página útil vai além do nome do bairro.</h2>
          <p>
            Para uma empresa no Batel, no Portão ou na Cidade Industrial, a
            primeira pergunta é a mesma: o que o cliente precisa saber antes de
            pedir uma proposta? A resposta depende do serviço, da área atendida
            e das condições reais da empresa.
          </p>
          <p>
            Se há visita ou entrega, o site deve informar limites e condições.
            Se o atendimento é remoto, isso precisa estar explícito. Uma lista
            de bairros não substitui essas informações e não significa que a
            GF10 mantém uma unidade em cada local.
          </p>
          <CTA context="site para minha empresa em Curitiba" />
        </div>
        <aside className="note">
          <span className="eyebrow">Para o seu briefing</span>
          <h3>Três informações que fazem diferença.</h3>
          <ol>
            <li>Seu serviço prioritário e o público que procura por ele.</li>
            <li>O bairro da empresa e a área real de atendimento.</li>
            <li>O que o visitante precisa enviar para receber uma proposta.</li>
          </ol>
          <a href="/guias/planejar-site">
            Ver o passo a passo de planejamento →
          </a>
        </aside>
      </section>
      <section className="section wrap">
        <p className="eyebrow">Guia territorial / 75 bairros</p>
        <h2>Curitiba, organizada por regional.</h2>
        <p className="reading">
          Os bairros estão agrupados conforme as administrações regionais da
          Prefeitura. Campo Comprido aparece em duas regionais, com porções
          norte e sul, e é contado uma vez. CIC corresponde à Cidade Industrial;
          Alto da XV também aparece como Alto da Rua XV nas fontes municipais.
        </p>
        <p className="reading">
          Use a relação para indicar onde sua empresa atua. O atendimento da
          GF10 é remoto; a lista não representa filiais nem promete
          posicionamento em buscas locais.
        </p>
        <div className="districts">
          {districts.map((d) => (
            <details key={d.name} id={`regional-${slug(d.name)}`}>
              <summary>
                {d.name}
                <span>{d.names.split("|").length} bairros na relação</span>
              </summary>
              <ul className="neighborhoods">
                {d.names.split("|").map((n) => (
                  <li key={n} id={slug(n)}>
                    <a href={neighborhoodPath(slug(n))}>{n}</a>
                    {n === "Campo Comprido"
                      ? ` (${d.name === "Santa Felicidade" ? "Norte" : "Sul"})`
                      : ""}
                  </li>
                ))}
              </ul>
              <a
                href={`https://regionais.curitiba.pr.gov.br/conteudo/${d.source}`}
              >
                Fonte: Prefeitura de Curitiba <Arrow />
              </a>
            </details>
          ))}
        </div>
      </section>
      <section className="section wrap split">
        <div>
          <h2>O que publicar sobre sua área de atuação</h2>
          <p>
            Para um serviço com deslocamento, explique o que muda conforme a
            distância e quais informações são necessárias para avaliar o pedido.
            Para uma loja, detalhe retirada e entrega. Para serviços digitais,
            informe como funcionam envio de materiais e aprovação.
          </p>
          <p>
            Uma página separada por bairro só faz sentido quando há conteúdo
            próprio para aquele contexto. Este guia reúne fichas territoriais de
            consulta, com limites e fontes, separadas das páginas comerciais.
          </p>
        </div>
        <aside className="note">
          <h3>Continue o planejamento</h3>
          <p>
            <a href="/solucoes/sites-e-landing-pages">
              Sites institucionais e landing pages →
            </a>
          </p>
          <p>
            <a href="/solucoes/seo-tecnico">SEO técnico e conteúdo →</a>
          </p>
          <p>
            <a href="/criacao-de-sites-brasil">
              Atendimento nas demais capitais →
            </a>
          </p>
        </aside>
      </section>
    </>
  );
}
function Brasil() {
  return (
    <>
      <HeroTitle
        label="Atendimento remoto / Brasil"
        title="Um projeto de site, de qualquer capital."
        intro="Curitiba é o foco da GF10. O processo remoto permite conversar sobre projetos nas 27 capitais, com escopo, materiais e aprovações combinados antes da construção."
      />
      <section className="wrap section split">
        <div>
          <h2>Como funciona a distância</h2>
          <p>
            A conversa inicial acontece pelo WhatsApp. Você apresenta o negócio,
            a cidade e o objetivo; avaliamos o tipo de solução e os materiais
            necessários. A proposta precisa esclarecer etapas de revisão,
            publicação e manutenção.
          </p>
          <p>
            Não é preciso criar um endereço local para atender uma empresa de
            outra cidade. Nossa cobertura nacional descreve atendimento remoto,
            sem alegação de escritórios nas capitais.
          </p>
          <p>
            Escolha a região para consultar orientações específicas de briefing.
            As capitais estão reunidas em guias; não criamos páginas idênticas
            apenas trocando nomes.
          </p>
        </div>
        <aside className="note">
          <h3>Seu primeiro contato</h3>
          <p>
            Envie o segmento, a cidade, o site atual se houver e a principal
            necessidade. Não envie senhas, bases de clientes ou informações
            sensíveis.
          </p>
          <CTA context="projeto com atendimento remoto no Brasil" />
        </aside>
      </section>
      <section className="wrap section">
        <h2>Encontre sua capital</h2>
        <RegionLinks />
      </section>
      <section className="wrap section reading">
        <h2>E os bairros das capitais?</h2>
        <p>
          A cobertura de atendimento inclui empresas nos bairros, mas o catálogo
          territorial é publicado apenas após verificação. Neste lote, Curitiba
          possui 75 bairros conferidos e agrupados. As demais capitais têm
          orientações de contratação nos guias regionais; seus inventários
          completos de bairros ainda não foram publicados.
        </p>
        <p>
          Distritos, setores, quadras e regiões administrativas não são tratados
          automaticamente como bairros. Isso evita informações imprecisas e
          mantém o conteúdo útil para quem quer contratar.
        </p>
        <a className="text-link" href="/criacao-de-sites-curitiba">
          Explorar o guia de Curitiba <Arrow />
        </a>
      </section>
    </>
  );
}
function Region({ keyName }: { keyName: string }) {
  const r = regions.find((r) => r.key === keyName)!;
  return (
    <>
      <HeroTitle
        label={`Brasil / ${r.name}`}
        title={`Criação de sites nas capitais do ${r.name}`}
        intro={r.intro}
      />
      <section className="section wrap split">
        <div>
          <h2>{r.focus}</h2>
          <p>
            A GF10 avalia projetos de sites, lojas e soluções web com
            atendimento remoto. O primeiro contato pelo WhatsApp serve para
            entender a necessidade; não exige envio de senhas ou dados privados.
          </p>
          <p>
            As orientações abaixo são pontos de planejamento, não afirmações
            sobre o perfil de todas as empresas de uma cidade. A proposta é
            adaptada à sua operação.
          </p>
          <ul>
            {r.checklist.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
        <aside className="note">
          <h3>O que combinar antes de contratar</h3>
          <p>
            Quantidade de páginas, materiais, integrações, revisões, publicação
            e responsáveis pela manutenção. Serviços externos e seus custos
            precisam estar definidos.
          </p>
          <a href="/guias/site-loja-ou-app">
            Escolher entre site, loja e aplicativo →
          </a>
        </aside>
      </section>
      <section className="wrap section city-list">
        {r.cities.map((c) => (
          <article id={slug(c[0])} key={c[0]}>
            <p className="eyebrow">{c[1]} / Atendimento remoto</p>
            <h2>
              <a href={capitalPath(c[0])}>{c[0]}</a>
            </h2>
            <p>{c[2]}</p>
            {c[0] === "Curitiba" ? (
              <p>
                <a href="/criacao-de-sites-curitiba">
                  Ver os 75 bairros no guia de Curitiba →
                </a>
              </p>
            ) : null}
            <a
              className="text-link"
              href={whatsapp(`criação de site em ${c[0]} (${c[1]})`)}
            >
              Conversar sobre meu projeto em {c[0]} <Arrow />
            </a>
          </article>
        ))}
      </section>
      <section className="section wrap reading">
        <h2>Da cidade ao conteúdo do site</h2>
        <p>
          A localização entra onde ajuda a esclarecer o atendimento. Se houver
          entrega, visita ou condições específicas, elas devem aparecer no
          conteúdo. Projetos remotos precisam explicar envio de materiais,
          aprovações e continuidade após a publicação.
        </p>
        <p>
          Não anunciamos filiais nestas cidades. Os nomes de bairros serão
          incorporados aos guias após validação territorial e editorial; a
          relação completa desta região ainda não foi publicada
          {r.key === "sul" ? ", com exceção de Curitiba" : ""}.
        </p>
        <p>
          <a href="/guias/preparar-materiais">
            Prepare textos, fotos e domínio →
          </a>
        </p>
        <a href="/criacao-de-sites-brasil">Consultar as 27 capitais →</a>
      </section>
    </>
  );
}
function EditorialPage({
  item,
  isGuide,
}: {
  item: Editorial;
  isGuide: boolean;
}) {
  const target = (isGuide ? services : guides).find(
    (x) => x.slug === item.related,
  )!;
  return (
    <>
      <HeroTitle
        label={
          isGuide
            ? "Guia prático / Planejar para decidir"
            : "Soluções / Escopo sob avaliação"
        }
        title={item.title}
        intro={item.intro}
      />
      <div className="wrap article-layout">
        <article className="article-body">
          {item.sections.map((s, i) => (
            <section key={s.title} id={`etapa-${i + 1}`}>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
            </section>
          ))}
          <section className="faq">
            <h2>Uma dúvida comum</h2>
            <details open>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          </section>
          <p className="byline">
            Conteúdo editorial GF10 · Revisado em 22 de outubro de 2026.
          </p>
        </article>
        <aside className="article-aside">
          <p className="eyebrow">Neste {isGuide ? "guia" : "serviço"}</p>
          <nav aria-label="Nesta página">
            {item.sections.map((s, i) => (
              <a key={s.title} href={`#etapa-${i + 1}`}>
                {s.title}
              </a>
            ))}
          </nav>
          <div className="note">
            <h3>Vamos aplicar ao seu negócio?</h3>
            <p>
              Conte o objetivo, sua cidade e o que já existe. Avaliamos a
              necessidade antes de definir a solução.
            </p>
            <CTA context={item.title} label="Falar no WhatsApp" />
          </div>
          <p>
            <a href={`/${isGuide ? "solucoes" : "guias"}/${target.slug}`}>
              {target.title} →
            </a>
          </p>
          <p>
            <a href="/criacao-de-sites-curitiba">Atendimento em Curitiba →</a>
          </p>
          <p>
            <a href="/criacao-de-sites-brasil">Atendimento no Brasil →</a>
          </p>
        </aside>
      </div>
    </>
  );
}
export default function App({ page }: { page: Page }) {
  let body;
  switch (page.kind) {
    case "territory":
      body = <NationalTerritoryPage unitKey={page.key!} />;
      break;
    case "capital":
      body = <CapitalPage cityKey={page.key!} />;
      break;
    case "neighborhood":
      body = <NeighborhoodPage placeKey={page.key!} />;
      break;
    case "home":
      body = <Home />;
      break;
    case "curitiba":
      body = <Curitiba />;
      break;
    case "brasil":
      body = <Brasil />;
      break;
    case "region":
      body = <Region keyName={page.key!} />;
      break;
    case "services":
      body = (
        <>
          <HeroTitle
            label="Soluções / GF10"
            title="O que podemos construir com você."
            intro="Sites, lojas e aplicações com entregáveis definidos. Cada solução depende de avaliação de viabilidade, conteúdo e escopo — a conversa começa pela necessidade do seu negócio."
          />
          <section className="section wrap">
            <figure className="service-poster">
              <img
                src="/images/solucoes-geral.webp"
                width="1200"
                height="720"
                loading="lazy"
                alt="GF10: sites e landing pages, lojas virtuais, sites multilíngues, aplicativos e PWA, sistemas e banco de dados, manutenção e SEO técnico. WhatsApp (41) 99272-1004."
              />
            </figure>
            <ServiceList />
          </section>
        </>
      );
      break;
    case "guides":
      body = (
        <>
          <HeroTitle
            label="Biblioteca / Guias práticos"
            title="Antes de investir, entenda o caminho."
            intro="Roteiros para preparar seu projeto, escolher a solução e acompanhar o que faz diferença. Informação prática para uma conversa comercial melhor."
          />
          <section className="section wrap">
            <GuideList />
          </section>
        </>
      );
      break;
    case "service":
      body = (
        <EditorialPage
          item={services.find((s) => s.slug === page.key)!}
          isGuide={false}
        />
      );
      break;
    case "guide":
      body = (
        <EditorialPage
          item={guides.find((s) => s.slug === page.key)!}
          isGuide
        />
      );
      break;
    case "map":
      body = (
        <>
          <HeroTitle
            label="Navegação"
            title="Mapa do site."
            intro="Soluções, conhecimento e cobertura. Escolha seu ponto de partida."
          />
          <ul className="wrap map-list">
            {pages
              .filter((p) => !["map", "404"].includes(p.kind) && !p.noindex)
              .map((p) => (
                <li key={p.path}>
                  <a href={p.path}>{p.title.replace(" | GF10", "")}</a>
                </li>
              ))}
          </ul>
        </>
      );
      break;
    default:
      body = (
        <HeroTitle
          label="404 / Página não encontrada"
          title="Esse caminho não existe."
          intro="Use a navegação para conhecer nossas soluções ou volte à página inicial."
        />
      );
  }
  return (
    <>
      <Header page={page} />
      <main id="conteudo">
        {page.kind !== "home" && (
          <div className="wrap breadcrumb">
            <a href="/">Início</a>
            <span aria-hidden="true"> / </span>
            <span>{page.title.replace(" | GF10", "")}</span>
          </div>
        )}
        {body}
        {page.kind === "curitiba" && <CuritibaDirectory />}
        {page.kind === "brasil" && <CapitalDirectory />}
        {[
          "home",
          "service",
          "curitiba",
          "region",
          "brasil",
          "capital",
          "neighborhood",
          "territory",
        ].includes(page.kind) && (
          <Journey
            context={
              page.kind === "territory"
                ? getNationalUnit(page.key!).unit.name
                : page.kind === "region"
                  ? regions.find((r) => r.key === page.key)!.name
                  : page.kind === "curitiba"
                    ? "Curitiba"
                    : page.kind === "service"
                      ? services.find((s) => s.slug === page.key)!.title
                      : "sua área de atendimento"
            }
          />
        )}
        {[
          "curitiba",
          "region",
          "brasil",
          "capital",
          "neighborhood",
          "territory",
        ].includes(page.kind) && <LocalArt page={page} />}
      </main>
      <Footer page={page} />
      <FloatingActions title={page.title} />
    </>
  );
}

function LocalArt({ page }: { page: Page }) {
  const key =
    page.kind === "territory"
      ? `national/${page.key}`
      : ["region", "capital", "neighborhood"].includes(page.kind)
        ? page.key!
        : page.kind;
  const label =
    page.kind === "territory"
      ? `${getNationalUnit(page.key!).unit.name}, ${getNationalUnit(page.key!).collection.name}`
      : page.kind === "capital"
        ? capitals.find((c) => c.key === key)!.name
        : page.kind === "neighborhood"
          ? neighborhoods.find((n) => n.slug === key)!.name
          : page.kind === "region"
            ? regions.find((r) => r.key === key)!.name
            : page.kind === "curitiba"
              ? "Curitiba"
              : "Brasil";
  return (
    <section className="wrap local-art">
      <a href={whatsapp(`projeto em ${label}`)}>
        <img
          src={`/images/local/${key}-250.webp`}
          width="250"
          height="250"
          loading="lazy"
          alt={`GF10 em ${label}: atendimento remoto. Sites, lojas, aplicações, idiomas, manutenção e SEO. WhatsApp (41) 99272-1004.`}
        />
      </a>
      <div>
        <p className="eyebrow">Seu projeto / {label}</p>
        <h2>Vamos entender sua necessidade.</h2>
        <p>
          Conte o serviço, a área de atendimento e o objetivo do projeto. A
          proposta considera o que sua empresa realmente oferece, sem criar
          filiais ou promessas de resultado.
        </p>
        <a href="/solucoes">Conhecer todas as soluções →</a>
      </div>
    </section>
  );
}

function Journey({ context }: { context: string }) {
  const steps = [
    [
      "Uma pessoa procura",
      "Ela busca um serviço e uma localidade onde precisa de atendimento.",
    ],
    [
      "Encontra uma página relevante",
      `Uma página sobre ${context} pode explicar a oferta e a cobertura real da empresa.`,
    ],
    [
      "Entende antes de decidir",
      "Serviços, condições e provas reais ajudam a avaliar se faz sentido conversar.",
    ],
    [
      "Inicia uma conversa",
      "O WhatsApp abre com contexto. A pessoa decide se envia a mensagem; o atendimento dá continuidade.",
    ],
  ];
  return (
    <section className="journey wrap" aria-labelledby="journey-title">
      <p className="eyebrow">
        Exemplo ilustrativo / Não é previsão de resultados
      </p>
      <h2 id="journey-title">
        Da busca à conversa.
        <br />
        Veja o caminho.
      </h2>
      <p className="lead">
        Um site pode ser encontrado em buscas além da sua base de seguidores e
        complementa as redes sociais. Aparecer no Google ou em respostas de IA
        depende de vários fatores; não há garantia de visitas, posições ou
        vendas.
      </p>
      <ol className="journey-steps">
        {steps.map(([title, text], i) => (
          <li key={title} aria-current={i === 0 ? "step" : undefined}>
            <span className="journey-number" aria-hidden="true">
              0{i + 1}
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ol>
      <div className="journey-controls" hidden>
        <button type="button" id="journey-prev" disabled>
          ← Voltar
        </button>
        <p id="journey-status" role="status" aria-live="polite">
          Etapa 1 de 4
        </p>
        <button type="button" id="journey-next">
          Avançar →
        </button>
      </div>
      <p className="journey-note">
        A sequência é uma explicação do processo. Não representa tráfego ou
        clientes reais.
      </p>
    </section>
  );
}
