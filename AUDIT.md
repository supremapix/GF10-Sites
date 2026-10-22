# GF10 — checkpoint 22/10/2026

## Evidências e destino
- Checkout isolado: `supremapix/GF10-Sites`, main, base `7326513183c807b11d33b018dcacb3eccf8b002c`; limpo ao clonar. Nenhum AGENTS.md ou .agents/skills neste repositório ou diretórios ancestrais inspecionados.
- React 18 / Vite / TypeScript. Produção: https://www.gf10.com.br, conteúdo HTML confere com o checkout. GitHub aponta https://gf10sites.vercel.app.
- Status público do commit: Vercel success, projeto `supremapixs-projects/gf10sites`, deploy `84isSSFRH6SMZyNHJC9K39dMYsg7`. Sem workflow GitHub Actions. gh CLI sem autenticação; push/deploy ainda não verificados.
- Marca no código: GF10 / Suprema Sites Express, azul #2563eb, verde #10b981, azul escuro #020617. Símbolo existente em public/favicon.svg; será preservado exatamente, sem criar nova logo.
- Contatos conflitantes: whatsappCommercial 5541987001004; portfolioInquiry e telefone exibido 5541992721004; whatsappBudget 554192721004 incompleto. Confirmação solicitada antes de consolidar/publicar.
- Portfólio contém nomes sem URLs de projetos; depoimentos, números, promessas de ranking e horários não têm comprovação. Não reutilizar como prova comercial.
- Rotas antigas /bairro/:name e /cidade/:name aceitam qualquer string; rewrite universal entrega 200 inclusive para inexistentes. HTML inicial não contém conteúdo React e não possui og:image.

## Lote concreto
Home editorial com marca preservada; guia Curitiba com bairros oficiais agrupados por regional; hub Brasil com cobertura das 27 capitais e guias regionais de contratação remota. Sem páginas individuais repetidas por bairro. Catálogo territorial ampliável com fontes, critérios e pendências explícitos.
Manter React/Vite para renderização estática no build, remover dependência de JS no visitante e Tailwind CDN. Gerar metadados por rota, sitemap, robots, JSON-LD Organization/WebSite, 404 e redirects explícitos. Gerar OG e pacote favicon localmente usando o SVG original.

## Critério de expansão
Página individual exige intenção própria, material verificável e orientação comercial específica. Inventariar bairros com fonte municipal/IBGE antes de publicar nomes. Cobertura de atendimento não equivale a filial. Nenhuma promessa de ranking, indexação ou citação em IA.

## Rollback
Reverter o commit desta alteração ou restaurar deploy Vercel da base acima, sem alterar DNS/credenciais. Preservar histórico Git; nenhum outro projeto local foi acessado ou alterado.

## Checkpoint de implementação
- Omar confirmou WhatsApp único `(41) 99272-1004` / `5541992721004` em 22/10/2026. Aplicado em `data/site.ts`, todos os CTAs e OG. Sem links tel, email ou formulários.
- 24 páginas indexáveis + 404: home, Curitiba, Brasil, 5 guias regionais (27 capitais), índice soluções + 7 soluções, índice guias + 6 guias e mapa.
- 75 bairros únicos de Curitiba, verificados nas fontes municipais vinculadas; Campo Comprido em duas regionais. Não foi publicado inventário completo dos bairros das outras 26 capitais; limitação explícita no site. Sem páginas individuais de bairros ou alegação de filiais.
- Duas imagens geradas e inspecionadas: cenas ilustrativas de site responsivo e planejamento, sem pessoas/clientes. Fontes e prompts em assets/PROVENANCE.md. Derivados AVIF/WebP 640/1200; hero AVIF ~38 KB. OG JPEG 1200×630 ~99 KB com símbolo original e telefone confirmado.
- React/Vite preservados como ferramenta de SSG. Conteúdo, navegação e FAQs funcionam sem JavaScript. HTML por rota, canonical/OG absolutos, sitemap e robots gerados. 78 redirects para bairros verificados/Curitiba; URLs desconhecidas retornam 404.
- TypeScript e lint aprovados. Teste estrutural: 25 HTMLs, 532 links, 118 WhatsApps contextuais, sitemap 24 URLs, dimensões OG/ícones aprovadas. Dependências sem vulnerabilidades no npm audit da instalação.
- Navegador Edge isolado: 24 rotas em 320/390/1440 sem overflow, teclado, skip link, details e texto 200% aprovados; sem mensagens reais. Auditoria Axe em execução.
- `git push --dry-run origin HEAD:main` funcionou com credencial existente. CLI gh sem autenticação não bloqueia este fluxo. Remoto ainda na base original; publicação final pendente dos checks.

## Validação pré-publicação concluída
- Build completo executa typecheck, lint, SSG e testes de saída; aprovado.
- Axe WCAG 2 A/AA + 2.1 AA: nenhuma violação detectada em 9 tipos de página a 390 px. Isso não equivale a certificação ou substituição de auditoria humana.
- Capturas desktop/mobile e OG inspecionadas. Texto 200% corrigido e aprovado. Relatório reproduzível em `qa/browser-results.json`.
- Após interrupção de capacidade, sessões e Git foram conferidos: testes terminaram com sucesso, main remoto continuava em `7326513`; nenhum push/deploy novo havia acontecido.
