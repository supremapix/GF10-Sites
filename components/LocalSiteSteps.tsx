import React from "react";
import { startGuidePath } from "../data/starting-guides";

export type Mode =
  | "national"
  | "region"
  | "capital"
  | "neighborhood"
  | "district"
  | "delivery"
  | "zone";
const scenarios: Record<
  Mode,
  { first: string; second: string; third: string }
> = {
  national: {
    first:
      "Separe o que sua empresa entrega online, por envio ou presencialmente; liste só os mercados que a operação consegue atender.",
    second:
      "Faça uma página por serviço prioritário. Explique disponibilidade, formato de entrega e diferenças regionais que realmente mudam a contratação.",
    third:
      "Teste no celular com alguém de outra cidade: fica claro como confirmar o atendimento quando vocês não estão no mesmo lugar?",
  },
  region: {
    first:
      "Escolha primeiro as capitais em que já consegue atender e identifique se a operação é remota, presencial ou depende de envio.",
    second:
      "Agrupe localidades com as mesmas condições. Separe páginas quando houver regras, provas ou orientações locais suficientes para ajudar a escolher.",
    third:
      "Teste um pedido de cada modalidade: cotação online, agendamento ou consulta de entrega, conforme o serviço.",
  },
  capital: {
    first:
      "Anote como costuma receber pedidos na cidade: endereço comercial, visita, retirada, entrega ou reunião remota. Não apresente atendimento remoto como unidade física.",
    second:
      "Inclua o serviço prioritário, a condição de atendimento, material autorizado e uma pergunta que você recebe antes de fechar um pedido.",
    third:
      "Peça a alguém que abra a página no celular e descubra, sem instruções extras, onde é atendido e como avançar.",
  },
  neighborhood: {
    first:
      "Confirme a cobertura antes de anunciar. Se a empresa atende por visita, explique como combinar acesso, agendamento e eventual deslocamento.",
    second:
      "Monte a página em torno de uma dúvida real de quem precisa do serviço. Mencione o bairro se ele mudar a orientação; fotos e exemplos locais só com autorização e contexto confirmado.",
    third:
      "Teste a mensagem de orçamento: basta informar bairro e serviço para começar? Peça endereço completo só quando for necessário à visita.",
  },
  district: {
    first:
      "Distinga o distrito da referência usada no dia a dia pelo cliente. Use os dois nomes quando tiverem relação confirmada com a área que você atende.",
    second:
      "Explique como validar a cobertura quando o endereço está perto de um limite. Não use o contorno de um mapa como promessa de atendimento.",
    third:
      "Confira se o botão de contato aceita cidade e referência de localização sem obrigar a pessoa a selecionar um bairro que talvez não corresponda ao endereço.",
  },
  delivery: {
    first:
      "Confirme cidade, modalidade e abrangência antes de anunciar entrega ou deslocamento. Defina como aplicar taxa, valor mínimo ou restrição, quando houver.",
    second:
      "Use a localização cadastrada apenas como referência. Na página do serviço, explique o que o cliente deve informar para confirmar a disponibilidade.",
    third:
      "Teste o caminho de uma consulta de entrega: mostre quando o prazo e o custo ficam disponíveis e quem responde se o endereço estiver fora da cobertura.",
  },
  zone: {
    first:
      "Aceite a referência que seus clientes usam na cidade, como região administrativa, setor ou quadra, em vez de presumir que tudo é bairro.",
    second:
      "Apresente o serviço e a forma de validar atendimento naquela área. Se a confirmação depender de endereço ou agenda, explique isso antes do clique.",
    third:
      "Teste no celular se a pessoa consegue informar a região e o que precisa em poucas palavras, sem enviar dados desnecessários.",
  },
};

export default function LocalSiteSteps({
  place,
  mode,
  context,
  localTip,
}: {
  place: string;
  mode: Mode;
  context?: string;
  localTip?: string;
}) {
  const scenario = scenarios[mode];
  return (
    <section
      className="wrap section local-site-steps"
      aria-labelledby="local-site-steps-title"
    >
      <p className="eyebrow">{context || "Roteiro de primeira publicação"}</p>
      <h2 id="local-site-steps-title">
        Como criar um site para atender em {place}
      </h2>
      <p>
        Ainda dá tempo de começar com um endereço próprio e um caminho claro de
        contato. Use esta referência para descrever onde e como a sua empresa
        atende, sem confundir cobertura de serviço com endereço de filial.
      </p>
      {localTip && (
        <p className="local-site-tip">
          <strong>Aplicação local:</strong> {localTip}
        </p>
      )}
      <ol className="local-cartoon-steps" aria-label="Passo a passo ilustrado">
        {[
          ["Defina atendimento e objetivo", scenario.first],
          [
            "Organize o conteúdo e o domínio",
            `${scenario.second} Confirme quem administra o domínio e quem mantém o conteúdo atualizado.`,
          ],
          [
            "Teste, publique e divulgue",
            `${scenario.third} Depois de publicar, atualize os links que você já compartilha e confira se os contatos chegam com contexto.`,
          ],
        ].map(([heading, copy], index) => (
          <li key={heading}>
            <img
              src={`/images/gf10-guias/local-etapa-${index + 1}.svg`}
              width="268"
              height="156"
              alt=""
              loading="lazy"
            />
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
      <p>
        <a href={startGuidePath}>
          Ler o passo a passo completo para criar um site →
        </a>
      </p>
    </section>
  );
}
