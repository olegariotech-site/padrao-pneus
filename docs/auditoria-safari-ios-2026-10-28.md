# Auditoria do HERO e experiência premium — 28/10/2026

Base auditada: `desenvolvimento-v1`, commit `5de18b41fc0e99fec4e4ef74c3752b0d3291c2c5`.
Proposta: `audit/safari-ios-premium-20261028`, destinada exclusivamente a PR em rascunho contra `desenvolvimento-v1`.

## Diagnóstico e prioridades

**A falha relatada em iPhone físico não foi reproduzida neste trabalho.** Os dois vídeos originais reproduziram em Chromium e em WebKit para Linux. Isso não comprova funcionamento em Safari iOS: o pipeline de mídia GStreamer do laboratório difere do AVFoundation e da decodificação por hardware dos aparelhos Apple. Não há evidência suficiente para atribuir a ocorrência específica a codec, Low Power Mode ou versão de iOS.

| Prioridade | Evidência | Impacto e decisão |
| --- | --- | --- |
| Crítico — risco de compatibilidade | Desktop declara H.264 High **nível 6.2**, confirmado no SPS por `trace_headers`, apesar de ter apenas 1280×720 e cerca de 24 fps. | Nível excessivo pode ser rejeitado por decodificadores com limites menores. Adicionar variante em nível 3.1 sem reencodar; conservar o original. É um defeito real de metadados, não a causa confirmada do incidente físico. |
| Importante | Botão antigo só aparece antes da primeira reprodução e desaparece após sucesso. Não existe controle de pausa do loop de mais de cinco segundos. | Controle persistente de reproduzir/pausar; preservar pausa voluntária ao rolar, voltar à aba ou girar a tela. |
| Importante | Em ambos os motores, girar de 390 px para 844 px mantém o arquivo vertical originalmente selecionado. | Escolher explicitamente uma única fonte por breakpoint e recarregar quando ele mudar. |
| Importante | Na simulação de fontes 404, o código antigo não recebe `error` no elemento `video`; o botão de recuperação permanece oculto. | Atribuição direta de `video.src` entrega erro no elemento, mantém poster e anuncia indisponibilidade sem oferecer um botão ineficaz. |
| Importante | Em Chromium, o HTML antigo inicia pedido de MP4 mesmo com movimento reduzido ou Save-Data, antes do script remover os `source`. | Usar URLs inertes em `data-*` e atribuir `src` somente após conferir preferências. Zero pedidos de MP4 nesses estados na proposta. |
| Importante | Após Escape ou clique de navegação, `aria-expanded=false`, mas o botão continua chamado “Fechar menu”. | Centralizar fechamento, corrigir rótulo e devolver foco ao acionador em Escape. |
| Opcional | A troca de fontes remotas produz deslocamentos de layout mensuráveis no Chromium; o carregamento externo varia muito através do proxy do laboratório. | Avaliar fontes locais/subconjuntos e fallbacks métricos em outra alteração. Não atribuir o tempo deste proxy à conexão de clientes. |
| Opcional | Primeira foto da equipe usa JPEG de 243.120 bytes; demais fotos já têm alternativas WebP. | Possível otimização futura da mesma fotografia, com comparação visual. Nenhuma fotografia foi substituída nesta proposta. |

## Mídias reais

Resultados de `ffprobe -show_format -show_streams` e leitura dos átomos MP4:

| Arquivo | Vídeo | Dimensões | Pixel format | Áudio | Tamanho | `moov` / `mdat` |
| --- | --- | --- | --- | --- | --- | --- |
| `padrao_hero_desktop.mp4` | H.264/AVC `avc1`, High, nível 6.2 | 1280×720 | `yuv420p`, 8 bits, progressivo | Não há faixa | 1.275.568 B | 32 / 3876 |
| `padrao_hero_mobile.mp4` | H.264/AVC `avc1`, High, nível 3.0 | 450×800 | `yuv420p`, 8 bits, progressivo | Não há faixa | 417.440 B | 32 / 2917 |
| `padrao_hero_desktop_compat.mp4` | H.264/AVC `avc1`, High, nível 3.1 | 1280×720 | `yuv420p`, 8 bits, progressivo | Não há faixa | 1.275.569 B | 32 / 3877 |

Todos têm 173 quadros, taxa nominal de 24 fps e `moov` antes de `mdat` (faststart). AAC não é necessário para uma apresentação deliberadamente sem áudio. Os originais já tinham formato de pixel e encapsulamento adequados; não havia justificativa para compressão com perdas.

A variante foi gerada assim:

```sh
ffmpeg -i assets/padrao_hero_desktop.mp4 -map 0:v:0 -c:v copy \
  -bsf:v h264_metadata=level=3.1 -movflags +faststart \
  assets/padrao_hero_desktop_compat.mp4
```

Não houve reencodificação, redimensionamento, corte, alteração de cor ou de velocidade. Os 173 PTS e os 173 DTS são idênticos antes/depois. O remux recalcula a duração declarada da faixa de 7,166667 s para 7,208093 s, incluindo a duração estimada do último quadro; não muda os timestamps dos quadros. O aumento é de **um byte**; não se alega redução de download ou ganho medido de decodificação.

Os 239.155.200 bytes de vídeo decodificado em `rawvideo/yuv420p` de cada versão desktop têm o mesmo SHA-256:

`d7b313f49a6946920261aea66cd8ddb05d1180f9f7145b3dcfc94990eab938e1`

SHA-256 dos arquivos:

```text
8454f6d22e224bf36f76ba313178bbcf27507470f81427b43aefe7caff765601  padrao_hero_desktop.mp4
a54521ec2bfcb6edba568e8233e42464f0e85023fd14390ae2442a0b140e9c80  padrao_hero_desktop_compat.mp4
5252acd12beb88cffde3bf62971f4622b2d95b61cf918e438cb64a464e4cd7e8  padrao_hero_mobile.mp4
```

## Servidor e regras de reprodução

Foram executados GETs reais no endereço público da demonstração para ambos os MP4, com `Range: bytes=0-99`. Ambos responderam `206 Partial Content`, `Content-Type: video/mp4`, `Accept-Ranges: bytes`, `Content-Length: 100` e `Content-Range` correto. Não foi encontrada falha de range/MIME nessa amostra. Isso não exclui problemas transitórios de rede/cache no aparelho do relato.

`muted`, `defaultMuted`, `playsinline` e `webkit-playsinline` são mantidos. A reprodução automática passa a ser solicitada por `play()` depois da conferência das preferências, sem `autoplay` ou URLs ativas no HTML inicial. Isso evita downloads antecipados e impede que o autoplay nativo desfaça a pausa voluntária em uma troca de fonte. Sem JavaScript, permanece o poster CSS original.

`playing` revela o vídeo; `loadeddata` permite nova tentativa; `pause` atualiza o controle; `error` mantém o poster e um anúncio acessível. Promessas pendentes são deduplicadas. `AbortError` de interrupções é ignorado; rejeições por política mantêm a ação manual; `NotSupportedError` leva ao fallback. Tentativas de uma fonte anterior não mudam o estado da atual. A chamada manual a `play()` permanece diretamente no evento de clique.

Low Power Mode pode bloquear até vídeos silenciosos. Não existe tentativa de contornar essa política: o visitante recebe poster legível e acionamento manual. Save-Data só é respeitado onde o navegador expõe a API; não é tratado como detector de economia de energia do iOS. Movimento reduzido é acompanhado também quando a preferência muda com a página aberta.

## Refinamento premium e preservação

- HERO: filme, enquadramento `object-fit: cover`, tratamento de cor, overlays, título e CTAs mantidos. Controle de mídia com alvo mínimo de 44 px, fora do fluxo do texto, sem inserir/remover uma linha que desloque o orçamento. O movimento decorativo do poster foi removido para que o fallback seja realmente estático.
- Primeira dobra: capturas em 320×568, 375×667, 390×844, 844×390 e 1440×900, nos dois motores. Sem overflow horizontal detectado. Em telas baixas, a seção pode crescer para conservar leitura e ações; emulação não reproduz as barras dinâmicas de Safari físico.
- Tipografia e espaçamentos: Barlow Condensed e Manrope preservadas. Não foi encontrado motivo comprovável para redesenhar a hierarquia aprovada.
- Galerias: oito imagens da equipe carregadas e inspecionadas em mobile; galeria de produtos e títulos após remoção dos números revisados. Fotografias, legendas e espaçamentos aprovados preservados.
- Comercial: formulário testado com “Alinhamento”, “Onix 2021” e detalhe adicional; resultado visível e URL corretamente codificada. Todos os links WhatsApp continuam em `5519974215389`. Nenhuma mensagem foi enviada.
- Acessibilidade: Escape fecha o menu, restaura foco e rótulo. Pausa/reprodução acessível; preferência de movimento e fallback verificados. Focos visíveis em controles inspecionados. Não se alega certificação WCAG nem teste com VoiceOver.
- Rodapé: link `https://olegariotech.com.br/` e reserva inferior para o WhatsApp preservados. O botão flutuante já considera safe area.
- Compartilhamento: todas as meta tags OG/Twitter e os arquivos de capa permanecem idênticos à base, inclusive URL/versionamento `ot-card-1`. Não foi forçada atualização do cache do WhatsApp.
- Prévia: `noindex,nofollow,noarchive` e `robots.txt` com `Disallow: /` preservados.

Não foram importados padrões visuais de outras marcas, trocadas fotografias ou criadas novas animações. Não há evidência que justifique um redesign.

## QA executada

Browser plugin não disponível. Utilizado Playwright 1.62.1 com **Chromium 151.0.7922.34** e **WebKit 26.5**, em Linux headless. Os executáveis e dependências de teste foram preparados fora do repositório; nenhuma dependência de produção foi acrescentada. Para conexões HTTPS pelo proxy do ambiente foi necessário ignorar o certificado da infraestrutura de teste, sem modificar o site.

Fluxo: página → vídeo ou poster → navegação/orçamento → mensagem WhatsApp pronta.

| Verificação | Chromium | WebKit Linux |
| --- | --- | --- |
| URL, título, conteúdo inicial e ausência de overlay de erro | Passou | Passou |
| Reprodução desktop e mobile; eventos `loadeddata` e `playing` | Passou, original e proposta | Passou, original e proposta |
| Console e exceções JS em caminhos normais | Sem erros relevantes | Sem erros relevantes |
| Capturas desktop, mobile, tela estreita e paisagem | Inspecionadas | Inspecionadas |
| Autoplay bloqueado por `NotAllowedError` injetado → poster → clique → reprodução | Passou | Passou |
| Pausa voluntária → rolar e voltar → girar → continua pausado | Passou | Passou |
| Rejeição posterior à primeira reprodução → controle manual permanece | Passou | Passou |
| Movimento reduzido/Save-Data na entrada → zero pedidos de MP4 | Passou | Passou, Save-Data simulado |
| Preferência de movimento alterada durante a sessão | Descarrega/restaura | Descarrega/restaura |
| MP4 com 404 injetado → poster e estado de erro | Passou; erro HTTP esperado no console | Passou |
| Menu, Escape, foco e formulário com mensagem codificada | Passou | Passou |
| Destino WhatsApp, assinatura e OG estáticos | Conferidos | Conferidos |

As falhas de autoplay e HTTP acima são **injeções de teste**, não medições de Low Power Mode real. A contagem de requisições MP4 no WebKit inclui os vários pedidos parciais normais do mesmo arquivo.

### Performance: evidência e limites

Não há build JavaScript ou framework: os checks de código foram `node --check app.js` e `git diff --check`, além dos testes renderizados. O repositório não tem suíte e2e pré-existente.

Em navegações locais com fontes Google externas através de proxy, sem CPU/rede móvel controladas:

| Amostra | LCP observado | CLS observado | Event Timing nas interações exercitadas |
| --- | --- | --- | --- |
| Base Chromium, 390×844 | 9.068 ms | 0,0264 | Não amostrado nesse ponto |
| Proposta Chromium, 390×844 | 6.468 ms na matriz; 9.628 ms no teste focado | 0,0275 | Maior duração de evento: 40 ms |
| Proposta WebKit, teste focado 390×844 | 3.965 ms | API `layout-shift` não disponível | Maior duração de evento: 24 ms |

Esses valores **não são Core Web Vitals de campo**, não são uma comparação de velocidade conclusiva e não demonstram ganho de LCP. A variação de fontes/proxy domina parte das amostras. Event Timing de algumas ações não equivale a INP de produção/p75. Os zeros do coletor genérico WebKit para CLS não são tratados como medida: o motor não expõe essa API. Há oportunidade de estudar fontes; não há evidência para reduzir a qualidade dos vídeos.

## Pendências antes de homologar Safari iOS

1. No iPhone que apresentou a ocorrência, registrar modelo, versão de iOS/Safari, orientação, rede e configuração de economia de energia.
2. Abrir uma prévia autorizada desta branch em Safari normal, primeiro sem Low Power Mode; verificar reprodução inline, loop, ausência de áudio/fullscreen e poster durante carregamento.
3. Repetir com Low Power Mode ligado: aceitar autoplay bloqueado; confirmar poster e reprodução com toque, sem mover os CTAs.
4. Ativar Reduzir Movimento; recarregar e alternar a preferência na sessão. Conferir poster estático e ausência de MP4 no Network quando aplicável.
5. Girar retrato/paisagem; rolar para fora e voltar; trocar de aba e retornar; testar pausa voluntária, botão de menu, formulário e abertura do WhatsApp real.
6. Com Web Inspector, registrar `currentSrc`, `video.error`, eventos e motivo de rejeição de `play()`, se a falha persistir. Conferir resposta Range no aparelho.
7. Validar Windows/Android físicos, VoiceOver, barras móveis/safe areas, rede móvel limitada e métricas de campo. Não foram executados nesta sessão.

Nenhuma publicação, configuração de Pages, `main` ou merge foi alterado por esta proposta. O workflow existente de capa só escuta pushes em `desenvolvimento-v1` e seus arquivos específicos; não foi modificado.

## Referências primárias

- [WebKit — políticas de vídeo inline, áudio e promessas de play](https://webkit.org/blog/6784/new-video-policies-for-ios/)
- [WebKit — autoplay silencioso desabilitado em Low Power Mode](https://bugs.webkit.org/show_bug.cgi?id=168985)
- [Apple — servidor, MIME e byte ranges para vídeo](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/CreatingVideoforSafarioniPhone/CreatingVideoforSafarioniPhone.html)
- [W3C — Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
