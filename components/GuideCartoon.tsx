import React from "react";
import { startSlug } from "../data/starting-guides";

const stories: Record<
  string,
  { asset: string; alt: string; steps: [string, string][] }
> = {
  [startSlug]: {
    asset: "primeiro-site",
    alt: "Em três quadros, uma pessoa tem uma ideia, monta uma página e testa o site pelo celular.",
    steps: [
      [
        "Uma tarefa primeiro",
        "Escreva o que você oferece e escolha o que o visitante deve fazer: orçar, agendar ou comprar.",
      ],
      [
        "Uma primeira versão",
        "Defina o domínio e publique só as páginas que ajudam a entender sua oferta e achar o contato.",
      ],
      [
        "Um teste de verdade",
        "Abra no celular, confirme os botões e divulgue o link nos canais que já funcionam.",
      ],
    ],
  },
  "site-proprio-instagram-whatsapp": {
    asset: "redes-e-whatsapp",
    alt: "Uma publicação no celular leva a uma página de serviço e, depois, a uma conversa.",
    steps: [
      [
        "Instagram mostra",
        "Uma publicação desperta interesse com uma novidade ou exemplo do seu trabalho.",
      ],
      [
        "O site explica",
        "A página organiza o que você entrega, o que está incluído e as dúvidas mais comuns.",
      ],
      [
        "WhatsApp continua",
        "A conversa já começa com o serviço de que a pessoa precisa, sem ela ter que explicar tudo do zero.",
      ],
    ],
  },
  "quanto-custa-criar-um-site": {
    asset: "comparar-orcamentos",
    alt: "Um checklist de entregas, um calendário com moeda e uma pessoa revisando uma proposta.",
    steps: [
      [
        "Compare a entrega",
        "Confira o que entra em cada proposta: páginas, textos, fotos, revisões e integrações.",
      ],
      [
        "Separe os custos",
        "Some o que é da implantação e veja o que volta a ser cobrado: domínio, hospedagem e manutenção.",
      ],
      [
        "Confira quem controla",
        "Antes de fechar, saiba quem fica com os acessos, o conteúdo e a responsabilidade por atualizar.",
      ],
    ],
  },
  "site-para-negocio-local": {
    asset: "atender-regioes",
    alt: "Uma empresa, um mapa de atendimento e uma mensagem de consulta pelo celular.",
    steps: [
      [
        "Mostre como você atende",
        "Diferencie loja física, visita ao cliente, retirada, entrega e serviço remoto.",
      ],
      [
        "Desenhe a cobertura real",
        "Indique onde o atendimento é possível e onde é preciso consultar disponibilidade.",
      ],
      [
        "Facilite a confirmação",
        "Peça só o essencial no primeiro contato, como cidade, bairro e tipo de serviço.",
      ],
    ],
  },
};

export default function GuideCartoon({ slug }: { slug: string }) {
  const story = stories[slug];
  if (!story) return null;
  return (
    <figure className="guide-cartoon">
      <figcaption>
        <p className="eyebrow">Em quadrinhos</p>
        <h2>O caminho em 3 cenas</h2>
      </figcaption>
      <img
        src={`/images/gf10-guias/${story.asset}.svg`}
        width="734"
        height="192"
        alt={story.alt}
      />
      <ol aria-label="Resumo ilustrado">
        {story.steps.map(([heading, copy], index) => (
          <li key={heading}>
            <div className="cartoon-caption">
              <span className="cartoon-number" aria-hidden="true">
                {index + 1}
              </span>
              <h3>{heading}</h3>
            </div>
            <p>{copy}</p>
          </li>
        ))}
      </ol>
    </figure>
  );
}
