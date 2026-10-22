> Checkpoint histórico do primeiro lote. A cobertura nacional seguinte está detalhada em [NATIONAL-COVERAGE.md](NATIONAL-COVERAGE.md); as pendências abaixo foram substituídas pela extração e navegação das 27 capitais.

# Cobertura territorial — checkpoint de 22/10/2026

## Lote navegável
- 27 capitais com páginas próprias: Curitiba mantém a URL histórica; outras 26 usam /brasil/capitais/{slug}.
- 75 fichas de bairros de Curitiba: /brasil/curitiba/bairros/{slug}. Contorno simplificado extraído de geometria real, código IBGE e associação às regionais municipais. Não representam filiais.
- Fichas são referências do diretório com noindex e fora do sitemap XML. Não foram tratadas como 75 anúncios locais equivalentes. Conteúdo comercial específico exige provas e condições próprias de cada operação.
- Filtros progressivos por nome, navegação sem JavaScript preservada, breadcrumbs e artes 250×250.
- Total: 50 páginas indexáveis + 75 fichas noindex + 404. Serviços, guias e URLs anteriores preservados.

## Inventário verificável
Fonte: https://geoftp.ibge.gov.br/organizacao_do_territorio/malhas_territoriais/malhas_de_setores_censitarios__divisoes_intramunicipais/censo_2022/bairros/shp/BR/BR_bairros_CD2022.zip
Ano de referência: 2022. Conferência: 22/10/2026. SHA256 e códigos preservados em data/territory.json. Reprodução: baixar e extrair o ZIP em tmp/ibge/bairros, depois executar node scripts/territory.mjs. A geração normal usa o snapshot versionado, sem depender de download.

Foram selecionados códigos municipais, não nomes homônimos. Palmas/PR foi excluída. 2.180 registros em 21 capitais:
Porto Velho 57; Manaus 63; Boa Vista 55; Belém 71; Macapá 61; Teresina 123; Fortaleza 121; Natal 36; João Pessoa 64; Recife 94; Maceió 50; Aracaju 48; Salvador 170; Belo Horizonte 476; Vitória 80; Rio de Janeiro 162; Curitiba 75; Florianópolis 87; Porto Alegre 94; Campo Grande 74; Cuiabá 119.

Correspondências documentadas: IBGE Botiatuvinha → slug municipal butiatuvinha; IBGE Cidade Industrial de Curitiba → cidade-industrial. As grafias originais permanecem nos dados. Campo Comprido participa de duas regionais, sem duplicar o bairro.

## Cobertura ainda pendente (não considerar pedido nacional concluído)
- 2.105 registros das outras 20 capitais estão no inventário e nas listas das capitais, mas não possuem fichas individuais. Precisam de revisão territorial/editorial que acrescente utilidade própria antes de novas rotas.
- Rio Branco, São Luís, Palmas/TO, São Paulo, Goiânia e Brasília não têm registros nesta extração de bairros. Isso não significa ausência de localidades. Exigem fontes locais; distritos de São Paulo e RAs do DF não equivalem automaticamente a bairros.
- Fontes candidatas já localizadas: RBGeo Rio Branco (Bairros 2025), divisão territorial do DIIE/SEPLAN São Luís, SIGGO Goiânia e SEDUH/SEGOV DF. A leitura web do DIIE retornou 403 e SEGOV expirou; não houve alteração de acesso nem tentativa de contornar proteção.
- Não afirmar que o Censo 2022 seja a divisão atual completa, nem garantir indexação, ranking, visitas ou citações.

## Publicação
Fluxo existente main → Vercel gf10sites → https://www.gf10.com.br. Rollback deste lote: reverter seu commit, preservando c69e98b (floating actions, artes e jornada previamente publicados). Não foram alterados DNS, permissões ou credenciais.

## Evidência pública deste lote
Implementação: df9089703d85df374ecce71a5ecc8b300048e821, presente em origin/main. Vercel success: https://vercel.com/supremapixs-projects/gf10sites/7Kd1xhVsaCz2Fxm6AiKUmeaatGAe.
Produção verificada nas 126 rotas em https://www.gf10.com.br: páginas, metadados, artes locais e 50 entradas no sitemap. URLs inexistentes retornam 404. O endereço explícito /404 serve o modelo com 200 na Vercel, com noindex; não equivale à resposta de uma URL desconhecida.
Controles de compartilhar testados em 126 rotas públicas, sem requisições a redes externas. Foco, Escape, clipboard simulado e reduced-motion passaram. Filtros territoriais e cinco modelos representativos passaram no Axe; 125 páginas de conteúdo testadas localmente em 320/390/1440px sem overflow. Evidências em qa/production-results.json, qa/share-results.json, qa/territory-results.json e qa/browser-results.json.
