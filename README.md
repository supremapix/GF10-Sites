# GF10 / Suprema Sites Express

Site React/TypeScript renderizado em HTML estático no build com Vite. Nenhum JavaScript é necessário no navegador para ler conteúdo, navegar, expandir perguntas ou acessar o WhatsApp.

## Desenvolvimento

Node 22.12+; `npm ci`, `npm run assets` (quando mudar imagens, símbolo ou telefone), `npm run build`, `npm run preview`. Preview local isolado: http://127.0.0.1:4173.

- `App.tsx`: componentes e registro de rotas.
- `data/site.ts`: domínio e único WhatsApp, confirmado por Omar em 22/10/2026.
- `data/editorial.ts`: 7 soluções e 6 guias. Serviços sob avaliação de escopo.
- `data/coverage.ts`: 27 capitais agrupadas em 5 guias, 75 bairros únicos de Curitiba em 10 regionais. Campo Comprido aparece em duas regionais.
- `scripts/build.mjs`: HTML completo, metadados exclusivos, JSON-LD factual, sitemap, robots e llms.txt.
- `scripts/assets.mjs`: WebP/AVIF responsivos, OG e favicons usando o SVG original, sem envio a terceiros.
- `vercel.json`: build/output explícitos, clean URLs, 78 redirects pertinentes; não há rewrite universal.

## Verificação

`npm run typecheck`, `npm run lint`, `npm test` (depois do build). Com preview ativo e Microsoft Edge instalado: `node scripts/browser-check.mjs`. Este teste usa navegador headless e perfil temporário separado, sem tocar em outras abas ou projetos. Nunca acessa links WhatsApp.

O build entrega 24 páginas indexáveis e 404. Bairros nacionais completos **não estão implementados**: só Curitiba tem inventário verificado. Não gerar automaticamente páginas trocando o nome de localidades. Novas localidades exigem fonte territorial e conteúdo útil diferente. Fonte base: https://regionais.curitiba.pr.gov.br/ (links por regional no conteúdo). Brasília usa regiões administrativas, São Paulo distingue distritos e bairros, Palmas usa referências de quadras/setores conforme cada caso.

Rotas antigas de bairros oficiais são redirecionadas para a regional correspondente no guia Curitiba. As rotas genéricas para localidades não verificadas foram retiradas e recebem 404; não são redirecionadas indiscriminadamente para a home.

## Publicação e reversão

Repositório: https://github.com/supremapix/GF10-Sites. Branch de produção `main`, integração Vercel existente, projeto `supremapixs-projects/gf10sites`. Domínio canônico https://www.gf10.com.br. Fazer push apenas após verificações, conferir status Vercel e respostas da produção. Não alterar DNS, credenciais ou permissões.

Base anterior ao redesign: `7326513183c807b11d33b018dcacb3eccf8b002c`. Para reversão, reverter o commit do redesign ou promover o deploy anterior pela Vercel. O histórico contém os componentes antigos e permite recuperação.

Imagens são ilustrativas e identificadas como geradas por IA. Não são cases ou equipe real. Prompts e origem em `assets/PROVENANCE.md`. Não há rastreamento de visitantes, formulários ou integração de envio de mensagens neste lote.
