export const slug = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
export const regions = [
  {
    name: "Sul",
    key: "sul",
    intro:
      "Uma operação regional pode crescer sem perder a clareza de onde atende. Separe a cidade da empresa, a área de entrega e o atendimento remoto antes de desenhar o site.",
    focus: "Presença regional, sem confundir cidades",
    checklist: [
      "Distinguir Curitiba de municípios da região metropolitana.",
      "Informar se o serviço depende de deslocamento, entrega ou pode ser remoto.",
      "Separar condições locais de condições para clientes de outros estados.",
    ],
    cities: [
      [
        "Curitiba",
        "PR",
        "Comece pelo bairro atendido e pelo serviço que o cliente procura. O guia de Curitiba organiza os bairros por regional para ajudar a definir uma área de atuação real.",
      ],
      [
        "Florianópolis",
        "SC",
        "Se sua operação depende de entrega ou visita, descreva no briefing quais áreas da ilha e do continente estão incluídas. Evite apresentar um único prazo para áreas com condições diferentes.",
      ],
      [
        "Porto Alegre",
        "RS",
        "Defina se a proposta atende apenas a capital ou também municípios vizinhos. Essa decisão orienta a página de cobertura e evita que um pedido fora da área chegue sem contexto.",
      ],
    ],
  },
  {
    name: "Sudeste",
    key: "sudeste",
    intro:
      "Quando há várias unidades ou públicos diferentes, a arquitetura precisa explicar as diferenças. Uma página por serviço real costuma ajudar mais do que dezenas de páginas quase iguais por localização.",
    focus: "Organizar serviços, unidades e públicos",
    checklist: [
      "Listar somente unidades e endereços existentes.",
      "Escolher o serviço prioritário para a primeira versão.",
      "Separar prova de trabalho, condições comerciais e contato.",
    ],
    cities: [
      [
        "São Paulo",
        "SP",
        "Para uma operação com várias áreas de atendimento, informe os distritos ou regiões realmente cobertos. Bairro, distrito e subprefeitura não são termos intercambiáveis; a nomenclatura será validada antes da publicação.",
      ],
      [
        "Rio de Janeiro",
        "RJ",
        "Indique se o atendimento se limita ao município do Rio ou inclui outras cidades do estado. No site, use município e estado juntos quando a expressão “Rio de Janeiro” puder gerar dúvida.",
      ],
      [
        "Belo Horizonte",
        "MG",
        "Reúna os serviços que podem ser contratados diretamente e os que exigem avaliação. O site deve deixar essa diferença visível antes de levar o visitante ao WhatsApp.",
      ],
      [
        "Vitória",
        "ES",
        "Explique se a área comercial inclui somente Vitória ou também outros municípios da Grande Vitória. Uma cobertura precisa é mais útil do que tratar toda a região como um único endereço.",
      ],
    ],
  },
  {
    name: "Centro-Oeste",
    key: "centro-oeste",
    intro:
      "O site deve distinguir a sede da empresa, o destino dos serviços e o lugar onde o cliente está. Essa separação é especialmente importante para propostas enviadas a diferentes municípios ou regiões administrativas.",
    focus: "Um briefing que esclarece o território",
    checklist: [
      "Registrar o município ou a região administrativa correta.",
      "Informar condições para atendimento fora da área principal.",
      "Organizar documentos e escopo necessários a uma cotação.",
    ],
    cities: [
      [
        "Brasília",
        "DF",
        "No Distrito Federal, regiões administrativas não devem ser publicadas como bairros de Brasília. Informe a RA e a área de atendimento no briefing; o texto do site deve respeitar essa distinção.",
      ],
      [
        "Goiânia",
        "GO",
        "Use a denominação do setor ou bairro informada pela empresa e confirme a referência municipal antes de criar conteúdo local. Se houver atendimento em outras cidades, descreva essa cobertura separadamente.",
      ],
      [
        "Cuiabá",
        "MT",
        "Diferencie o atendimento em Cuiabá das entregas ou visitas a municípios próximos. Para serviços remotos, destaque quais etapas podem ser concluídas sem deslocamento.",
      ],
      [
        "Campo Grande",
        "MS",
        "Inclua o estado na identificação da empresa para evitar ambiguidade com localidades de mesmo nome. Prepare descrições dos serviços e critérios para solicitar uma proposta pelo WhatsApp.",
      ],
    ],
  },
  {
    name: "Nordeste",
    key: "nordeste",
    intro:
      "Uma página pode atender pessoas da própria cidade e clientes de fora dela. O conteúdo precisa explicar disponibilidade, condições e o próximo passo para cada situação, sem transformar o site em uma lista de palavras-chave.",
    focus: "Informação útil antes do primeiro contato",
    checklist: [
      "Identificar se o público é local, visitante ou de outras empresas.",
      "Explicar disponibilidade e condições reais, sem inventar horários.",
      "Usar imagens próprias ou licenciadas com contexto correto.",
    ],
    cities: [
      [
        "Salvador",
        "BA",
        "Caso a operação tenha diferentes áreas de atendimento, descreva condições por região. Referências de bairro só entram no conteúdo depois da conferência, e não substituem um endereço verdadeiro.",
      ],
      [
        "Aracaju",
        "SE",
        "Para uma empresa que atende presencialmente e a distância, mostre quais serviços estão disponíveis em cada formato. Isso ajuda o visitante a iniciar uma conversa com o pedido certo.",
      ],
      [
        "Maceió",
        "AL",
        "Se o público inclui visitantes, explique como contratar antes de chegar à cidade. Disponibilidade, requisitos e condições devem ser textos da própria empresa, revisados antes de publicar.",
      ],
      [
        "Recife",
        "PE",
        "Diferencie a capital da Região Metropolitana do Recife ao informar entregas e deslocamentos. Se houver várias unidades, associe cada serviço à unidade que realmente o oferece.",
      ],
      [
        "João Pessoa",
        "PB",
        "Priorize uma apresentação clara do que o negócio faz e de quais materiais o cliente precisa para pedir orçamento. Fotos reais ajudam a explicar o serviço sem depender de descrições genéricas.",
      ],
      [
        "Natal",
        "RN",
        "Se a oferta muda por período, planeje como atualizar condições e disponibilidade. O site precisa evitar preços ou datas desatualizados e conduzir a confirmação pelo WhatsApp.",
      ],
      [
        "Fortaleza",
        "CE",
        "Quando o negócio oferece muitos serviços, agrupe-os por necessidade do cliente. Uma navegação por problemas resolvidos pode facilitar a escolha antes do contato comercial.",
      ],
      [
        "Teresina",
        "PI",
        "Para receber pedidos de outras cidades, inclua no briefing limites de entrega e etapas remotas. As condições da capital e do interior devem aparecer separadas quando forem diferentes.",
      ],
      [
        "São Luís",
        "MA",
        "Use o nome da cidade com acentuação correta e o estado em informações de cobertura. Para apresentar projetos, reúna imagens e autorização de uso antes de incluir um portfólio.",
      ],
    ],
  },
  {
    name: "Norte",
    key: "norte",
    intro:
      "Atendimento remoto começa com informação acessível: texto que abre sem depender de vídeos, imagens leves e instruções claras. A proposta deve especificar o que é entregue digitalmente e o que depende da operação do cliente.",
    focus: "Conteúdo leve e contratação a distância",
    checklist: [
      "Priorizar texto e imagens otimizadas em vez de vídeos automáticos.",
      "Combinar o horário de retorno considerando a cidade do cliente.",
      "Explicar etapas digitais e limites de entrega ou atendimento presencial.",
    ],
    cities: [
      [
        "Rio Branco",
        "AC",
        "Combine o horário de retorno no briefing e registre a cidade do cliente. O processo remoto deve deixar claro quando cada aprovação é necessária, sem depender de disponibilidade instantânea.",
      ],
      [
        "Porto Velho",
        "RO",
        "Se a empresa atende além da capital, liste os municípios ou áreas reais de cobertura. Não use o nome do estado inteiro como promessa de atendimento sem condições definidas.",
      ],
      [
        "Manaus",
        "AM",
        "Para ofertas com entrega física, separe o prazo de desenvolvimento do site dos prazos da operação comercial. O visitante precisa entender o que pode contratar digitalmente e o que depende de logística.",
      ],
      [
        "Boa Vista",
        "RR",
        "Identifique Boa Vista como capital de Roraima nos dados do negócio, evitando confusão com bairros homônimos em outras cidades. O WhatsApp pode receber essa localização já no texto inicial.",
      ],
      [
        "Belém",
        "PA",
        "Informe quais áreas são atendidas e quais serviços podem ser resolvidos a distância. A cobertura deve refletir a operação da empresa e não apenas o alcance possível de uma campanha.",
      ],
      [
        "Macapá",
        "AP",
        "Defina como serão enviados fotos, textos e aprovações durante o projeto. Uma lista organizada de materiais reduz retrabalho e facilita acompanhar a criação do site remotamente.",
      ],
      [
        "Palmas",
        "TO",
        "Confirme a nomenclatura de quadras e setores utilizada pela empresa antes de publicar dados locais. Não converta automaticamente referências de endereço em uma lista de bairros.",
      ],
    ],
  },
];
export const districts = [
  {
    name: "Matriz",
    source: "matriz/1176",
    names:
      "Ahú|Alto da Glória|Alto da Rua XV|Batel|Bigorrilho|Bom Retiro|Cabral|Centro|Centro Cívico|Cristo Rei|Hugo Lange|Jardim Botânico|Jardim Social|Juvevê|Mercês|Prado Velho|Rebouças|São Francisco",
  },
  {
    name: "Boa Vista",
    source: "boa-vista/1170",
    names:
      "Abranches|Atuba|Bacacheri|Bairro Alto|Barreirinha|Boa Vista|Cachoeira|Pilarzinho|Santa Cândida|São Lourenço|Taboão|Tingui",
  },
  {
    name: "Boqueirão",
    source: "boqueirao/1171",
    names: "Alto Boqueirão|Boqueirão|Hauer|Xaxim",
  },
  {
    name: "Cajuru",
    source: "cajuru/1172",
    names:
      "Cajuru|Capão da Imbuia|Guabirotuba|Jardim das Américas|Tarumã|Uberaba",
  },
  {
    name: "CIC",
    source: "cic/1174",
    names: "Augusta|Cidade Industrial|Riviera|São Miguel",
  },
  {
    name: "Fazendinha/Portão",
    source: "fazendinhaportao/1175",
    names:
      "Água Verde|Campo Comprido|Fazendinha|Guaíra|Parolin|Portão|Santa Quitéria|Seminário|Vila Izabel",
  },
  {
    name: "Pinheirinho",
    source: "pinheirinho/1177",
    names: "Capão Raso|Fanny|Lindóia|Novo Mundo|Pinheirinho",
  },
  {
    name: "Santa Felicidade",
    source: "santa-felicidade/1178",
    names:
      "Butiatuvinha|Campina do Siqueira|Campo Comprido|Cascatinha|Lamenha Pequena|Mossunguê|Orleans|Santa Felicidade|Santo Inácio|São Braz|São João|Vista Alegre",
  },
  {
    name: "Bairro Novo",
    source: "bairro-novo/1169",
    names: "Ganchinho|Sítio Cercado|Umbará",
  },
  {
    name: "Tatuquara",
    source: "tatuquara/1179",
    names: "Campo de Santana|Caximba|Tatuquara",
  },
];
