import type { Editorial } from "./editorial";

export const startSlug = "ainda-da-tempo-de-criar-um-site";
export const startGuidePath = `/guias/${startSlug}`;

export const startingGuides: Editorial[] = [
  {
    slug: startSlug,
    title: "Ainda dá tempo de criar um site para sua empresa?",
    description:
      "Veja por que ainda vale ter um site próprio e como publicar a primeira versão: objetivo, domínio, páginas, testes e divulgação.",
    intro:
      "Sim. Não é preciso esperar a marca estar perfeita nem abandonar o que já funciona nas redes sociais. Se hoje você responde as mesmas perguntas pelo WhatsApp ou só apresenta seu serviço a quem já conhece seu perfil, um site próprio pode tornar essas informações fáceis de encontrar, consultar e compartilhar. Comece com o suficiente para ajudar alguém a decidir se vale conversar com você.",
    related: "sites-e-landing-pages",
    sections: [
      {
        title: "1. Escolha uma tarefa que o site precisa resolver",
        text: "Defina uma ação principal: pedir orçamento, agendar, conhecer o catálogo ou comprar. Escreva em duas linhas o que você entrega, para quem e onde. Exemplo: uma assistência que trabalha por visita pode pedir bairro, equipamento e sintoma antes de confirmar se atende. Isso ajuda mais do que simplesmente escrever «fale conosco».",
      },
      {
        title: "2. Garanta acesso ao seu endereço",
        text: "Escolha um domínio fácil de falar e registre-o sob controle da empresa. Se já usa e-mail nesse domínio, anote o provedor atual e combine com quem publica o site como manter o e-mail sem interrupção. Defina quem tem acesso à hospedagem, quem renova e onde ficam as cópias dos arquivos.",
      },
      {
        title: "3. Monte só as páginas necessárias",
        text: "Comece com uma apresentação, o serviço prioritário e um caminho claro de contato. Use fotos próprias ou autorizadas e responda perguntas que você realmente recebe. Se for vender com pagamento direto, acrescente catálogo e condições de entrega antes de abrir o checkout. Para medir interesse, deixe claro se o botão leva a um pedido, uma conversa ou uma compra.",
      },
      {
        title: "4. Publique e teste como um cliente",
        text: "Abra o site no celular sem estar conectado ao painel. Veja se o texto explica a oferta, se os botões levam ao destino certo e se a confirmação do formulário aparece. Verifique se o endereço abre com HTTPS, se as páginas importantes estão navegáveis e se existe um sitemap quando o site tiver várias páginas. Um teste interno de envio precisa ser combinado com quem responde.",
      },
      {
        title: "5. Dê o link a quem já procura pelo seu negócio",
        text: "Coloque o endereço no perfil social, na assinatura e nos canais que você já usa, como o Perfil da Empresa no Google, se elegível. Depois do lançamento, compare visitas com contatos realmente recebidos, anote a pergunta mais repetida e melhore a página correspondente. Uma página publicada pode ser descoberta, mas não há garantia de prazo de indexação ou posição.",
      },
    ],
    question: "Preciso ter blog ou loja virtual logo na primeira versão?",
    answer:
      "Não. Priorize a ação que o cliente precisa realizar. Um site simples bem explicado pode bastar para apresentar serviços e receber orçamentos. Publique artigos quando houver perguntas úteis a responder; adote checkout quando sua operação estiver pronta para vender e entregar.",
  },
  {
    slug: "site-proprio-instagram-whatsapp",
    title: "Já vendo no Instagram e WhatsApp: ainda preciso de site?",
    description:
      "Entenda como combinar redes sociais, site próprio e WhatsApp sem refazer seu atendimento nem duplicar conteúdo.",
    intro:
      "Se o Instagram apresenta seu trabalho e o WhatsApp fecha a conversa, um site pode cuidar do que fica no meio: explicar a oferta, organizar exemplos e responder perguntas antes da mensagem. Nem todo negócio precisa de checkout, e o site não precisa substituir nenhum dos seus canais.",
    related: "sites-e-landing-pages",
    sections: [
      {
        title: "Separe o papel de cada canal",
        text: "Use o Instagram para mostrar novidade e processo; o site para organizar serviços, portfólio e condições que mudam pouco; e o WhatsApp para responder situações individuais. Um caso publicado nas redes pode virar um exemplo no site, com explicação mais completa e autorização para uso das imagens.",
      },
      {
        title: "Dê contexto à mensagem que chega",
        text: "Um botão em cada página pode identificar o serviço que despertou interesse. Ofereça um roteiro curto: o que a pessoa precisa, região e prazo aproximado. Evite coletar documentos no primeiro contato se essas informações não forem necessárias.",
      },
      {
        title: "Decida o que não deve ir para o site",
        text: "Preços que mudam diariamente ou disponibilidade que só você confirma não precisam virar uma tabela estática. Explique como o orçamento é elaborado ou indique a data da atualização. Evite expor dados de clientes e não reutilize depoimentos sem autorização.",
      },
    ],
    question: "Vale criar o site se quase todos me procuram por indicação?",
    answer:
      "Pode valer quando indicações precisam de um link fácil de repassar, ou quando o interessado quer confirmar serviços e atendimento antes de falar com você. Se essas necessidades já estão bem resolvidas, comece sem complexidade desnecessária.",
  },
  {
    slug: "quanto-custa-criar-um-site",
    title: "Quanto custa criar um site? Como comparar orçamentos",
    description:
      "Compare propostas de site pelo que será entregue: páginas, conteúdo, integrações, custos recorrentes e propriedade dos acessos.",
    intro:
      "O preço depende do que precisa existir e funcionar depois da entrega. Um catálogo com pedido pelo WhatsApp e uma loja com pagamento, frete e gestão de pedidos não são comparáveis só pelo número de páginas. Peça a cada fornecedor que detalhe as mesmas entregas.",
    related: "sites-e-landing-pages",
    sections: [
      {
        title: "Peça itens comparáveis",
        text: "Liste número de páginas, fornecimento de textos e fotos, adaptação a celular, formulários, integrações, revisões e critérios de aceite. Pergunte quais páginas ficam editáveis por você e quais ajustes exigem suporte.",
      },
      {
        title: "Separe implantação de manutenção",
        text: "Domínio, hospedagem, plugins, ferramentas de terceiros e suporte podem ter cobrança recorrente. Peça valores, frequência, o que está incluído e o que acontece se optar por não renovar. Compare também o custo de manter o site atualizado, não só o de lançá-lo.",
      },
      {
        title: "Verifique acessos, propriedade e migração",
        text: "Confirme quem controla o domínio, quem pode publicar e se há entrega ou exportação de conteúdo. Se já tem site, liste o que precisa ser preservado: e-mail, páginas procuradas, arquivos e contatos. Mudanças de endereço devem prever redirecionamentos e testes.",
      },
    ],
    question: "Dá para comparar propostas só pela mensalidade?",
    answer:
      "Não. Confira implantação, período contratado, reajustes, serviços incluídos e condições de saída. Uma proposta simples deve dizer de forma clara o que será entregue e quem será responsável pela continuidade.",
  },
  {
    slug: "site-para-negocio-local",
    title: "Site para negócio local: como explicar onde você atende",
    description:
      "Organize o site conforme seu atendimento real: loja, visita técnica, entrega ou serviço remoto. Veja quando vale criar uma página por região.",
    intro:
      "Quem pesquisa um serviço em determinada cidade quer confirmar se você pode atender, como funciona e qual é o próximo passo. Não precisa inventar unidade ou publicar centenas de páginas para responder. Comece pela cobertura que sua operação de fato sustenta.",
    related: "seo-tecnico",
    sections: [
      {
        title: "Diferencie endereço de área de serviço",
        text: "Se atende em loja, informe o endereço real e condições de visita. Se visita o cliente, explique como confirmar bairros, deslocamento e agenda. Se o trabalho é remoto, deixe isso explícito. Referências territoriais não comprovam presença física.",
      },
      {
        title: "Crie páginas locais quando houver algo útil e próprio",
        text: "Uma página dedicada pode valer quando as regras de entrega mudam, quando existe material autorizado sobre um trabalho ali ou quando a operação local merece orientações diferentes. Se só mudaria o nome da cidade, prefira uma página clara com toda a cobertura.",
      },
      {
        title: "Dê ao cliente uma forma de confirmar",
        text: "Informe que dados bastam para verificar cobertura: cidade, bairro e tipo de serviço, por exemplo. Não prometa deslocamento, prazo ou preço sem validar a disponibilidade. Mantenha informações de horário e contato coerentes com os outros canais.",
      },
    ],
    question: "Devo criar uma página para cada bairro que atendo?",
    answer:
      "Não obrigatoriamente. Um guia de cobertura pode ser mais simples de manter. Crie uma página própria quando consegue responder a perguntas específicas daquela área sem repetir a mesma oferta só mudando o endereço.",
  },
];

export const startRelatedLinks = [
  {
    path: "/guias/planejar-site",
    label: "Definir objetivo e organizar o projeto",
  },
  {
    path: "/guias/preparar-materiais",
    label: "Preparar domínio, textos e fotos",
  },
  {
    path: "/guias/medir-e-melhorar",
    label: "Avaliar resultados depois da publicação",
  },
];
