# GF10 / Suprema Sites Express

Site React/TypeScript renderizado em HTML estático no build com Vite. Nenhum JavaScript é necessário para ler conteúdo, navegar, expandir perguntas ou acessar o WhatsApp. Um script leve aprimora o popup de compartilhamento e a jornada explicativa, sem rastreamento ou SDKs sociais.

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

O build entrega 50 páginas indexáveis, 75 fichas territoriais noindex e 404. Bairros nacionais completos **não estão implementados**: Curitiba tem 75 fichas navegáveis; a extração do IBGE registra 2.180 bairros em 21 capitais. Não gerar automaticamente páginas trocando o nome de localidades. Novas localidades exigem fonte territorial e conteúdo útil diferente. Fonte base: https://regionais.curitiba.pr.gov.br/ (links por regional no conteúdo). Brasília usa regiões administrativas, São Paulo distingue distritos e bairros, Palmas usa referências de quadras/setores conforme cada caso.

Rotas antigas de bairros oficiais são redirecionadas para a regional correspondente no guia Curitiba. As rotas genéricas para localidades não verificadas foram retiradas e recebem 404; não são redirecionadas indiscriminadamente para a home.

## Publicação e reversão

Repositório: https://github.com/supremapix/GF10-Sites. Branch de produção `main`, integração Vercel existente, projeto `supremapixs-projects/gf10sites`. Domínio canônico https://www.gf10.com.br. Fazer push apenas após verificações, conferir status Vercel e respostas da produção. Não alterar DNS, credenciais ou permissões.

Base anterior ao redesign: `7326513183c807b11d33b018dcacb3eccf8b002c`. Para reversão, reverter o commit do redesign ou promover o deploy anterior pela Vercel. O histórico contém os componentes antigos e permite recuperação.

Imagens são ilustrativas e identificadas como geradas por IA. Não são cases ou equipe real. Prompts e origem em `assets/PROVENANCE.md`. Não há rastreamento de visitantes, formulários ou integração de envio de mensagens neste lote.

## Controles e artes complementares
`components/FloatingActions.tsx` + `public/share.js`: contato fixo e dialog nativo com retenção/restauração de foco, Escape, seis redes e cópia com feedback somente após sucesso. Falha de clipboard seleciona o link para cópia manual. Não há envio automático. `node scripts/share-check.mjs` testa com requests externos bloqueados e clipboard simulado; `GF10_TEST_URL` permite apontar para produção.

`node scripts/service-art.mjs` gera poster das sete soluções e artes 250×250 para as páginas locais existentes, usando marca original e WhatsApp confirmado. São composições tipográficas vetoriais exportadas para WebP, não fotos de clientes. A jornada tem avanço manual, texto HTML permanente e desativa transições com reduced-motion.

Endpoints consultados em 22/10/2026: [WhatsApp](https://faq.whatsapp.com/5913398998672934), [Facebook](https://developers.facebook.com/documentation/sharing/web), [X](https://docs.x.com/x-for-websites/web-intents/overview), [Pinterest](https://developers.pinterest.com/docs/web-features/buttons/), [LinkedIn](https://www.linkedin.com/sharing/share-offsite/?url=), [Threads](https://developers.facebook.com/documentation/threads/threads-web-intents). Facebook/LinkedIn extraem preview dos metadados; Pinterest recebe media absoluta. As plataformas podem exigir login ou mudar o compositor. Nenhum compartilhamento real foi realizado nos testes.
