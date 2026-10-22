export type Section = { title: string; text: string };
export type Editorial = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  sections: Section[];
  related: string;
  question: string;
  answer: string;
};
export const services: Editorial[] = [
  {
    slug: "sites-e-landing-pages",
    title: "Sites institucionais e landing pages",
    description:
      "Apresente seu negócio com clareza. Sites e landing pages com conteúdo organizado, navegação responsiva e contato pelo WhatsApp.",
    intro:
      "Seu visitante precisa entender o que você faz, para quem e como dar o próximo passo. O projeto começa por essa conversa, antes de escolher efeitos ou montar telas.",
    sections: [
      {
        title: "Qual formato faz sentido?",
        text: "Um site institucional organiza empresa, serviços, dúvidas e conteúdo em páginas conectadas. Uma landing page concentra uma oferta e um objetivo. Para uma campanha específica, a segunda pode ser suficiente; para várias linhas de serviço, o site ajuda a separar os assuntos.",
      },
      {
        title: "O que pode entrar na entrega",
        text: "Definimos mapa de páginas, hierarquia do conteúdo, composição visual, adaptação a celular e computador e links de contato com mensagens contextualizadas. Metadados e estrutura de navegação fazem parte da avaliação técnica. Textos, fotos e referências entram no escopo acordado, com aprovação do cliente.",
      },
      {
        title: "O que preparar",
        text: "Traga sua identidade visual, serviços prioritários, público, área de atendimento e dúvidas frequentes. Se já existe um site, envie a URL e explique o que não funciona. Não é preciso enviar senhas para iniciar o orçamento.",
      },
      {
        title: "Publicação e continuidade",
        text: "Domínio, hospedagem, revisões e manutenção devem ter responsáveis definidos na proposta. O lançamento inclui validação dos caminhos essenciais; resultados comerciais dependem também da oferta, divulgação e atendimento. Não há promessa de uma quantidade de contatos.",
      },
    ],
    related: "planejar-site",
    question: "Preciso de um site completo para começar?",
    answer:
      "Nem sempre. Uma primeira versão pode priorizar um serviço e o contato, desde que permita explicar a oferta com honestidade.",
  },
  {
    slug: "lojas-virtuais",
    title: "Lojas virtuais com operação bem definida",
    description:
      "Planeje catálogo, pagamento, entrega e atendimento antes de lançar sua loja virtual. Projeto sob avaliação de escopo.",
    intro:
      "Vender online exige mais do que uma vitrine. O projeto precisa conectar apresentação dos produtos, regras comerciais e a rotina de quem recebe os pedidos.",
    sections: [
      {
        title: "Do catálogo ao pedido",
        text: "Mapeamos categorias, variações, imagens, informações dos produtos e o percurso até a conclusão da compra. Se o objetivo inicial for apenas receber cotações, um catálogo com WhatsApp pode ser mais adequado do que um checkout completo.",
      },
      {
        title: "Integrações sob avaliação",
        text: "Pagamento, frete, estoque e emissão de documentos dependem das plataformas escolhidas e de suas interfaces disponíveis. A viabilidade é avaliada antes da contratação. Contas, taxas, análise cadastral e serviços de terceiros não devem ser confundidos com o trabalho de criação do site.",
      },
      {
        title: "Responsabilidades da operação",
        text: "O cliente define produtos, disponibilidade, preços, entrega, trocas e atendimento. Textos comerciais e políticas devem ser revisados pelo responsável da empresa. Dados reais de compradores não são necessários para uma conversa inicial sobre o projeto.",
      },
      {
        title: "Testar antes de abrir",
        text: "O escopo de validação deve incluir variações de produto, cálculo de entrega, indisponibilidade, confirmação de pedidos e falhas de pagamento em ambiente de testes. Depois do lançamento, catálogo e integrações precisam de manutenção acordada.",
      },
    ],
    related: "planejar-loja",
    question: "Toda loja precisa de integração com estoque?",
    answer:
      "Depende do volume e da operação. É importante definir uma rotina confiável para evitar vender um item indisponível, com ou sem integração.",
  },
  {
    slug: "sites-multilingues",
    title: "Sites para outros idiomas e mercados",
    description:
      "Estruture um site multilíngue com navegação, conteúdo e revisão linguística definidos para cada mercado.",
    intro:
      "Uma versão em outro idioma deve ajudar outra pessoa a entender e contratar. Isso envolve linguagem, contexto comercial, navegação e uma rotina para manter as versões coerentes.",
    sections: [
      {
        title: "Escolher os idiomas prioritários",
        text: "O primeiro passo é identificar público e mercado, e não publicar todos os idiomas de uma vez. Avaliamos quais páginas precisam de adaptação e quais diferenças existem na oferta, no suporte e nas condições de atendimento.",
      },
      {
        title: "Estrutura e localização",
        text: "O projeto pode prever URLs próprias por idioma, seletor de linguagem e referências entre versões equivalentes. Datas, medidas, moedas e exemplos também precisam de revisão. Recursos automáticos auxiliam o trabalho, mas não comprovam qualidade nativa ou adequação cultural.",
      },
      {
        title: "Revisão humana",
        text: "A proposta deve indicar quem traduz, quem revisa e quem aprova. Conteúdo especializado pode exigir um revisor com conhecimento do setor. A GF10 avalia a implementação; idiomas e exigências linguísticas são combinados conforme o projeto.",
      },
      {
        title: "Manter as versões alinhadas",
        text: "Quando um serviço muda, suas traduções também precisam mudar. Defina um responsável e uma lista de páginas equivalentes para que preços, disponibilidade e condições não se contradigam entre idiomas.",
      },
    ],
    related: "lancar-outro-idioma",
    question: "Posso publicar uma tradução automática diretamente?",
    answer:
      "Ela pode ser um rascunho, mas a versão pública precisa de revisão linguística e comercial proporcional ao conteúdo e ao mercado.",
  },
  {
    slug: "aplicativos-pwa",
    title: "Aplicativos e PWA: primeiro, a necessidade",
    description:
      "Avalie um aplicativo ou PWA a partir do uso real, recursos necessários, manutenção e limites de cada plataforma.",
    intro:
      "Nem toda ideia precisa de um aplicativo nas lojas. Um site responsivo ou uma aplicação web pode resolver o primeiro problema com menos etapas operacionais.",
    sections: [
      {
        title: "Definir o uso principal",
        text: "Descreva a tarefa que a pessoa repetirá: consultar informação, acompanhar um pedido ou registrar uma atividade, por exemplo. Escolha um fluxo essencial para validar antes de ampliar a lista de funcionalidades.",
      },
      {
        title: "Escolher a plataforma",
        text: "Uma PWA pode oferecer experiência de aplicação a partir da web, mas instalação, notificações e funcionamento offline variam entre navegadores e sistemas. Aplicativos nativos e publicação em lojas exigem avaliação específica de viabilidade, contas e regras das plataformas.",
      },
      {
        title: "Escopo e limites",
        text: "Protótipos, telas, autenticação e integrações são definidos após levantamento. Não prometemos acesso irrestrito a recursos do aparelho ou aprovação por lojas. Funções que envolvem dados sensíveis ou decisões reguladas exigem avaliação e responsáveis adequados.",
      },
      {
        title: "O trabalho depois da entrega",
        text: "Uma aplicação precisa de atualização, suporte e acompanhamento de erros. Definimos responsabilidades de infraestrutura e manutenção, assim como os dispositivos prioritários para teste, antes de assumir a implementação.",
      },
    ],
    related: "site-loja-ou-app",
    question: "Uma PWA funciona igual em todos os celulares?",
    answer:
      "Não. É necessário validar os recursos desejados nos sistemas e navegadores do público e prever alternativas quando não forem suportados.",
  },
  {
    slug: "sistemas-e-banco-de-dados",
    title: "Sistemas web e banco de dados",
    description:
      "Transforme uma rotina definida em um sistema web sob medida, com requisitos, permissões e manutenção previstos no escopo.",
    intro:
      "Um sistema começa pelo processo que precisa funcionar. Antes de construir telas, é necessário entender quem usa, o que registra, o que pode alterar e como conferir o resultado.",
    sections: [
      {
        title: "Mapear antes de automatizar",
        text: "Reunimos fluxos, regras de negócio e exemplos fictícios de entradas e saídas. O objetivo é identificar um primeiro módulo útil, suas exceções e critérios de aceite. Automatizar uma rotina indefinida costuma apenas acelerar os problemas existentes.",
      },
      {
        title: "Dados e acesso",
        text: "A modelagem deve considerar relações entre registros, permissões por função e necessidade de auditoria. Coletar apenas o necessário, definir retenção e planejar cópias de segurança são decisões do projeto. Não envie bases de clientes ou credenciais pelo primeiro contato.",
      },
      {
        title: "Integrações e responsabilidade humana",
        text: "APIs, importações e serviços externos são avaliados individualmente. Processos financeiros, médicos ou jurídicos não devem delegar decisões críticas a uma automação sem supervisão apropriada. A solução não substitui profissionais responsáveis ou revisão especializada.",
      },
      {
        title: "Operar com continuidade",
        text: "Documentação, testes, restauração de backup, monitoramento e atualização devem ter responsáveis e escopo definidos. Custos de hospedagem, armazenamento e serviços contratados à parte precisam ser conhecidos antes da publicação.",
      },
    ],
    related: "site-loja-ou-app",
    question: "Dá para integrar qualquer ferramenta?",
    answer:
      "A integração depende de acesso autorizado, documentação, limites e condições da ferramenta. A viabilidade precisa ser confirmada antes de prometer a entrega.",
  },
  {
    slug: "manutencao-e-modernizacao",
    title: "Manutenção e modernização de sites",
    description:
      "Avalie o site atual e planeje melhorias de conteúdo, navegação, desempenho e manutenção sem perder o que já funciona.",
    intro:
      "Às vezes o site precisa de uma correção pontual. Em outros casos, conteúdo e estrutura já não acompanham o negócio. A avaliação inicial ajuda a separar essas situações.",
    sections: [
      {
        title: "Inventário do que existe",
        text: "Começamos por páginas, formulários, integrações, domínio e plataforma atual. Identificamos conteúdos úteis, problemas reproduzíveis e dependências. O diagnóstico não exige que o cliente compartilhe senhas na primeira conversa.",
      },
      {
        title: "Preservar o que tem valor",
        text: "Uma modernização deve considerar URLs existentes, links recebidos e materiais da marca. Quando uma página muda de endereço, avaliamos redirecionamentos pertinentes. A proposta distingue correções, redesign e reconstrução.",
      },
      {
        title: "Atualizar com cuidado",
        text: "Mudanças de plataforma ou versões podem afetar integrações. Planejamos backup, ambiente de validação e caminho de reversão conforme a infraestrutura disponível. Acesso deve ser concedido pelo meio apropriado, com permissões limitadas ao trabalho.",
      },
      {
        title: "Combinar a rotina futura",
        text: "Manutenção pode envolver conteúdo, dependências, testes e suporte. Frequência, canais e limites precisam estar na proposta; uma atualização isolada não implica atendimento contínuo ou disponibilidade permanente.",
      },
    ],
    related: "preparar-materiais",
    question: "É obrigatório refazer meu site inteiro?",
    answer:
      "Não. Se a base permitir, melhorias pontuais podem ser suficientes. A decisão depende da avaliação técnica e dos objetivos do negócio.",
  },
  {
    slug: "seo-tecnico",
    title: "SEO técnico e conteúdo compreensível",
    description:
      "Organize páginas, metadados e informações do negócio para facilitar navegação, leitura por buscas e compreensão por sistemas de IA.",
    intro:
      "Um site precisa ser encontrado, mas também entendido. O trabalho começa por páginas acessíveis e informações que respondem às dúvidas reais de quem está considerando contratar.",
    sections: [
      {
        title: "A base técnica",
        text: "Avaliamos conteúdo disponível no HTML, títulos, descrições, URLs canônicas, sitemap, status de páginas e navegação interna. Imagens e estrutura responsiva também entram no diagnóstico. As prioridades dependem do estado do site e do escopo contratado.",
      },
      {
        title: "Conteúdo local com precisão",
        text: "Uma página de localização precisa explicar atendimento real. Bairros e cidades não são prova de endereço ou filial. Preferimos guias úteis a centenas de textos iguais trocando o nome da região.",
      },
      {
        title: "Busca e respostas de IA",
        text: "SEO, GEO e AIO são tratados aqui como organização técnica e editorial: informações claras, fontes quando necessárias, autoria e dados estruturados que correspondem ao conteúdo visível. Não existe garantia de posição, indexação ou citação em sistemas de IA.",
      },
      {
        title: "Medir e revisar",
        text: "Definimos quais ações indicam interesse e distinguimos visita, clique e conversa qualificada. Ferramentas de medição, consentimento e acessos são combinados conforme o projeto. Relatórios devem mostrar limitações, e não transformar qualquer clique em venda.",
      },
    ],
    related: "medir-e-melhorar",
    question: "Vocês garantem a primeira posição no Google?",
    answer:
      "Não. O trabalho melhora a estrutura e a informação do site; resultados de busca e respostas de IA dependem de sistemas externos e outros fatores.",
  },
];
export const guides: Editorial[] = [
  {
    slug: "planejar-site",
    title: "Como planejar um site que gere conversas úteis",
    description:
      "Um passo a passo para definir público, oferta, conteúdo e contato antes de criar o site da sua empresa.",
    intro:
      "O objetivo não é apenas colocar uma página no ar. É ajudar a pessoa certa a reconhecer uma solução e iniciar uma conversa com contexto. Use este roteiro para preparar o projeto.",
    sections: [
      {
        title: "1. Escolha uma ação principal",
        text: "Escreva o que você espera do visitante: pedir uma avaliação, solicitar orçamento ou entender um serviço. Se tudo for prioridade, nada orienta a página. Para uma primeira versão, escolha a ação que aproxima o interessado de uma decisão real.",
      },
      {
        title: "2. Descreva a oferta em linguagem direta",
        text: "Complete a frase: “ajudamos este público com este serviço”. Depois explique o que está incluído, o que depende de avaliação e como funciona o atendimento. Evite adjetivos que não dizem nada sobre a entrega.",
      },
      {
        title: "3. Responda antes de pedir contato",
        text: "Liste as dúvidas recebidas com frequência. Transforme-as em seções: como funciona, o que preparar e como pedir proposta. Use trabalhos ou depoimentos somente quando forem reais e houver autorização. Não preencha a ausência de prova com números inventados.",
      },
      {
        title: "4. Faça o contato carregar contexto",
        text: "Um botão de WhatsApp pode identificar a página de origem e o serviço de interesse na mensagem inicial. A pessoa deve poder editar a mensagem antes de enviar. No site, deixe claro que o próximo passo é uma conversa, não uma contratação automática.",
      },
      {
        title: "5. Revise no celular e acompanhe",
        text: "Leia a página em uma tela pequena e verifique se a oferta continua clara. Peça a alguém para encontrar o serviço e o contato sem orientação. Depois de publicar, acompanhe dúvidas e contatos qualificados para escolher a próxima melhoria; visitas, sozinhas, não comprovam resultado.",
      },
    ],
    related: "sites-e-landing-pages",
    question: "Como saber se a primeira versão está pronta?",
    answer:
      "Quando explica a oferta, responde às dúvidas essenciais e permite completar o caminho de contato sem obstáculos. Itens adicionais podem entrar em etapas futuras.",
  },
  {
    slug: "preparar-materiais",
    title: "Textos, fotos e domínio: o que preparar",
    description:
      "Organize os materiais e decisões necessários para criar ou modernizar seu site sem retrabalho desnecessário.",
    intro:
      "Uma pasta organizada e algumas decisões comerciais tornam o projeto mais previsível. Você não precisa ter tudo perfeito, mas precisa saber o que já existe e quem pode aprovar.",
    sections: [
      {
        title: "1. Reúna a marca e os dados corretos",
        text: "Separe a logo original, cores existentes e o nome que deve aparecer publicamente. Confirme o WhatsApp de destino e a área de atendimento. Identifique informações que precisam de revisão, como horários antigos ou serviços descontinuados.",
      },
      {
        title: "2. Prepare textos por necessidade",
        text: "Crie uma lista de serviços com descrição, público e limites. Acrescente perguntas frequentes e as etapas de contratação. Texto bem organizado vale mais do que uma apresentação longa sem hierarquia. Indique quais informações ainda dependem de aprovação.",
      },
      {
        title: "3. Escolha imagens com direitos de uso",
        text: "Fotos próprias precisam de qualidade e autorização das pessoas quando aplicável. Arquivos licenciados devem ter condições de uso conferidas. Imagens geradas podem ilustrar uma ideia, mas não devem ser apresentadas como equipe, instalação ou projeto real da empresa.",
      },
      {
        title: "4. Identifique domínio e plataforma",
        text: "Anote o domínio, o fornecedor de hospedagem e a plataforma atual. Confirme quem é o responsável pelas contas. Para orçamento, envie apenas as URLs e informações gerais; acessos serão tratados por um meio apropriado quando forem necessários.",
      },
      {
        title: "5. Defina quem aprova e mantém",
        text: "Escolha um responsável para reunir alterações e aprovar conteúdo. Combine quem atualizará os materiais depois da publicação. Em uma modernização, liste páginas que precisam continuar acessíveis e informações que não podem desaparecer.",
      },
    ],
    related: "manutencao-e-modernizacao",
    question: "Posso começar sem fotos profissionais?",
    answer:
      "Sim, o planejamento pode começar. O projeto deve definir como obter imagens adequadas e distinguir imagens ilustrativas de registros reais do negócio.",
  },
  {
    slug: "site-loja-ou-app",
    title: "Site, loja, aplicativo ou sistema: como escolher",
    description:
      "Compare necessidades reais antes de escolher entre site institucional, loja virtual, PWA e sistema web.",
    intro:
      "A melhor escolha começa pela tarefa do usuário. Tecnologia deve servir ao processo; não precisa ser o ponto de partida da conversa comercial.",
    sections: [
      {
        title: "1. Se o objetivo é explicar e receber contatos",
        text: "Um site institucional organiza serviços, provas reais e dúvidas. Uma landing page pode atender uma oferta específica. Se a venda depende de avaliação personalizada, conduzir uma conversa qualificada pode ser mais adequado do que simular um checkout.",
      },
      {
        title: "2. Se o pedido pode ser fechado online",
        text: "Considere uma loja quando catálogo, preços, estoque e entrega tiverem regras definidas. Antes da escolha de plataforma, desenhe o que acontece depois do pagamento: confirmação, separação, envio, atendimento e eventual cancelamento.",
      },
      {
        title: "3. Se existe uma tarefa recorrente",
        text: "Aplicação web ou PWA pode fazer sentido para uso frequente, como consultar informações ou acompanhar solicitações. Liste recursos necessários e valide suporte nos dispositivos do público. Aplicativo nativo exige análise própria, inclusive publicação e manutenção.",
      },
      {
        title: "4. Se há uma rotina interna para organizar",
        text: "Um sistema com banco de dados pode centralizar registros e etapas. Descreva usuários, permissões, regras e exceções usando exemplos fictícios. Comece por um fluxo que possa ser testado; não tente reproduzir toda a empresa em uma primeira entrega.",
      },
      {
        title: "5. Compare o custo de operar",
        text: "Além da criação, considere hospedagem, licenças, serviços externos, revisão de conteúdo e suporte. Uma solução simples bem operada pode ser mais útil do que uma aplicação extensa sem responsável por manutenção. Peça uma proposta com entregáveis e limites explícitos.",
      },
    ],
    related: "aplicativos-pwa",
    question: "Posso começar pequeno e evoluir?",
    answer:
      "Sim, desde que a primeira versão e os limites de evolução sejam planejados. Algumas mudanças exigem revisão da estrutura, por isso vale discutir os próximos usos desde o início.",
  },
  {
    slug: "planejar-loja",
    title: "Como preparar catálogo, pagamento e entrega",
    description:
      "Passo a passo para organizar a operação de uma loja virtual antes do desenvolvimento e dos testes de compra.",
    intro:
      "Uma loja virtual precisa refletir uma operação que você consegue cumprir. Prepare estas decisões antes de discutir aparência ou adicionar produtos em massa.",
    sections: [
      {
        title: "1. Organize um catálogo de teste",
        text: "Escolha produtos que representem suas situações reais: tamanhos, cores, itens sem estoque e produtos com condições especiais. Defina nome, descrição, imagens, preço e variações. Use esse conjunto para validar a estrutura antes de cadastrar o restante.",
      },
      {
        title: "2. Defina estoque e disponibilidade",
        text: "Determine quem atualiza o estoque e o que acontece quando um item acaba. Se houver estoque compartilhado com uma loja física, registre como as informações serão sincronizadas. Uma integração só deve ser prometida depois da avaliação técnica.",
      },
      {
        title: "3. Escolha a forma de pagamento",
        text: "Compare condições dos fornecedores, taxas, prazo de recebimento e recursos disponíveis. A conta deve pertencer à empresa responsável pela operação. Não envie dados bancários sensíveis para uma conversa inicial sobre o site.",
      },
      {
        title: "4. Descreva entrega e atendimento",
        text: "Liste regiões atendidas, retirada, cálculo de frete e situações que precisam de cotação. Defina quem responde dúvidas e problemas. Políticas comerciais devem ser revisadas por responsáveis adequados ao negócio e às regras aplicáveis.",
      },
      {
        title: "5. Teste o percurso completo",
        text: "Em ambiente de testes, percorra produto, carrinho, entrega, pagamento, confirmação e atualização do pedido. Inclua falhas e cancelamentos. Não use uma compra real como primeiro teste; combine um plano de validação com o fornecedor da solução.",
      },
    ],
    related: "lojas-virtuais",
    question: "Preciso cadastrar todos os produtos antes de testar?",
    answer:
      "Não. Um conjunto representativo ajuda a encontrar problemas de estrutura antes de investir no cadastro completo.",
  },
  {
    slug: "lancar-outro-idioma",
    title: "Como lançar uma versão do site em outro idioma",
    description:
      "Planeje páginas, tradução, revisão e manutenção para publicar uma versão multilíngue com coerência comercial.",
    intro:
      "Traduzir palavras é apenas uma parte. A versão precisa ser compreensível para o público escolhido e continuar correta quando a oferta mudar.",
    sections: [
      {
        title: "1. Escolha o público e o mercado",
        text: "Defina para quem a versão será feita e se o atendimento comercial está preparado para esse idioma. Uma página traduzida que leva a um canal sem suporte adequado pode frustrar o interessado.",
      },
      {
        title: "2. Faça um inventário de páginas",
        text: "Separe as páginas essenciais e identifique o que pode ser adaptado em vez de apenas traduzido. Serviços, condições e exemplos podem ser diferentes entre mercados. Mantenha uma relação entre a página original e a versão correspondente.",
      },
      {
        title: "3. Combine a revisão linguística",
        text: "Defina quem traduz, quem revisa e quem aprova o conteúdo especializado. Ferramentas automáticas podem apoiar o rascunho, mas não garantem linguagem nativa. Priorize revisão proporcional à importância e ao risco do texto.",
      },
      {
        title: "4. Valide navegação e apresentação",
        text: "Títulos, menus e botões podem ocupar mais espaço no novo idioma. Teste celular, caracteres, imagens com texto, medidas e formatos locais. O seletor de idioma deve levar a uma versão equivalente quando ela existir.",
      },
      {
        title: "5. Planeje atualizações conjuntas",
        text: "Registre quais páginas precisam de nova revisão quando um serviço mudar. Não deixe uma versão prometer condições que a outra já removeu. A rotina de manutenção e os responsáveis devem constar no escopo.",
      },
    ],
    related: "sites-multilingues",
    question: "É melhor lançar muitos idiomas ao mesmo tempo?",
    answer:
      "Depende da capacidade de revisar e atender. Começar pelos mercados prioritários costuma facilitar o controle da qualidade e da manutenção.",
  },
  {
    slug: "medir-e-melhorar",
    title: "Como medir interesse e melhorar a navegação",
    description:
      "Distinga visitas, cliques e conversas qualificadas para escolher melhorias úteis no seu site.",
    intro:
      "Medição ajuda a decidir o que mudar. Para ser útil, ela precisa representar uma etapa real do negócio e reconhecer o que não consegue observar.",
    sections: [
      {
        title: "1. Defina o que é um contato útil",
        text: "Escolha critérios simples: interesse em um serviço oferecido, região atendida e necessidade que pode ser avaliada. Alinhe isso com quem responde no WhatsApp. Um clique no botão não significa que uma mensagem foi enviada ou que uma venda aconteceu.",
      },
      {
        title: "2. Separe as etapas",
        text: "Acompanhe visita à página, acesso à informação principal e intenção de contato como ações diferentes. Ferramentas e configuração de consentimento devem ser avaliadas conforme o projeto. Não registre conteúdo privado das conversas como se fosse uma simples métrica de navegação.",
      },
      {
        title: "3. Observe obstáculos reais",
        text: "Teste se uma pessoa encontra o serviço, entende o próximo passo e consegue usar o site no celular e no teclado. Perguntas repetidas no atendimento podem indicar informação ausente. Uma página muito visitada com pouca clareza merece revisão antes de receber mais divulgação.",
      },
      {
        title: "4. Mude uma hipótese por vez",
        text: "Exemplo: tornar o título mais específico, explicar uma condição ou melhorar a posição de um link. Registre o que mudou e observe um período compatível com o volume de visitas. Pequenas amostras não justificam conclusões definitivas.",
      },
      {
        title: "5. Conecte conteúdo e atendimento",
        text: "Compare o que o site promete com o que a empresa entrega e responde. Uma boa página não corrige sozinha uma oferta mal definida ou pedidos sem retorno. Use os aprendizados para priorizar conteúdo, navegação e processo comercial, sem prometer resultados futuros.",
      },
    ],
    related: "seo-tecnico",
    question: "Cliques no WhatsApp podem ser contados como vendas?",
    answer:
      "Não. Um clique indica intenção de abrir o canal. Mensagem enviada, contato qualificado e venda são etapas diferentes e precisam de avaliação própria.",
  },
];
