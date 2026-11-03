# Padrão Pneus — Gate de compatibilidade da prévia OT

**Estado:** prévia comercial em `desenvolvimento-v1`; sem contratação/aceite do Rodolfo. Não fazer merge em `main` nem divulgar como site oficial.

**Base de código verificada:** `92affd2` (03/11/2026).  
**Escopo:** microinterações em botões, links de redes sociais, vídeo do HERO e vídeo institucional.

## Evidências verificadas diretamente no código

- 18/18 verificações **estáticas** passaram. Essas verificações são inspeções de seletores, atributos, links e preservação de funcionalidades; **não** substituem testes de navegador.
- HERO: `autoplay muted playsinline webkit-playsinline loop`, versões MP4 separadas desktop/mobile, poster SVG, proteção para `prefers-reduced-motion` e `saveData`, pausa fora da área visível.
- Vídeo institucional: `autoplay muted loop playsinline webkit-playsinline`, origem MP4 local, poster/fundo de imagem, carregamento por proximidade, pausa fora da área visível, nenhuma interface de play/pause criada pela OT.
- Correção preventiva: vídeo institucional agora tem `opacity:1` desde a montagem para não depender do evento `playing` para ficar visível; a condição anterior `opacity:0` podia dificultar autoplay no WebKit.
- Botões: mouse com hover curto; toque com `:active` e sem dependência de hover permanente; foco por teclado e `prefers-reduced-motion` preservados.
- WhatsApp: lógica de recolhimento aprovada anteriormente no celular e identificação de origem preservadas.
- `assets/padrao_hero_mobile.mp4`: arquivo de 417.440 bytes examinado; formato MP4 com marcador `avc1/avcC`, átomo `moov` antes do `mdat` (adequado para carregamento progressivo); não foi detectado marcador `mp4a` nessa inspeção. **Isso não equivale a um teste ffprobe completo.**
- `assets/padrao_hero_desktop.mp4` e `assets/videos/gemini_generated_video_a4915775.mp4`: arquivos existentes, mas **codec, formato de pixel e faststart não confirmados** nesta inspeção porque o conector não retornou seus bytes.

## Condições importantes de Safari / Android

A Apple documenta que Safari normalmente permite autoplay mudo com `playsinline`, mas pode pausar mídias fora da tela. **Modo Pouca Energia, políticas de autoplay e preferências do navegador podem impedir a reprodução mesmo com HTML correto.** Se o autoplay for bloqueado, o comportamento esperado da prévia é uma imagem alternativa legível; não prometer 100% de autoplay.

Fonte: https://developer.apple.com/documentation/webkit/delivering-video-content-for-safari  
Também: https://webkit.org/blog/6784/new-video-policies-for-ios/

## Verificação dos arquivos de vídeo pelo Astra / notebook OT

No checkout `desenvolvimento-v1`, executar:

```bash
ffprobe -v error -show_entries stream=codec_type,codec_name,profile,pix_fmt,width,height -show_entries format=duration -of json assets/padrao_hero_desktop.mp4
ffprobe -v error -show_entries stream=codec_type,codec_name,profile,pix_fmt,width,height -show_entries format=duration -of json assets/padrao_hero_mobile.mp4
ffprobe -v error -show_entries stream=codec_type,codec_name,profile,pix_fmt,width,height -show_entries format=duration -of json assets/videos/gemini_generated_video_a4915775.mp4
```

Para ampla compatibilidade, buscar vídeo H.264 (AVC), MP4, formato de pixel `yuv420p`; investigar qualquer arquivo em HEVC, VP9, AV1 ou sem `moov` antecipado antes de autorizar publicação.

## Matriz manual obrigatória — ainda NÃO executada integralmente

| Ambiente | Verificações | Situação |
| --- | --- | --- |
| Edge / Windows desktop (1440 e 1024 CSS px) | Hover no menu, CTA e redes, sem alteração de layout; HERO/institucional iniciam mudos, loop | **Pendente em dispositivo** |
| Chrome / Windows notebook (1280 CSS px) | Hover, foco via Tab, rolagem, vídeos, formulário | **Pendente em dispositivo** |
| Firefox / desktop | Vídeos, CTAs, hover, navegação, Console sem erros | **Pendente em dispositivo** |
| Chrome / Android (360/390 CSS px) | Pressionar botões, nenhuma animação presa, menu, HERO/institucional em loop, rotação | **Pendente em dispositivo** |
| Samsung Internet / Android | Mesmo fluxo acima, confirmação de source mobile | **Pendente em dispositivo** |
| Safari / iPhone | Wi-Fi e dados, modo economia DESLIGADO; poster, autoplay mudo, loop, sem fullscreen involuntário | **Pendente em dispositivo** |
| Safari / iPhone Modo Pouca Energia LIGADO | Comportamento degradado seguro (poster), sem tela preta; documentar eventual botão nativo do sistema | **Pendente em dispositivo** |
| Safari / iPad ou Mac | Reprodução inline, layout, fallback, rolagem | **Pendente em dispositivo** |
| Preferência de movimento reduzido ligada | Vídeos de fundo não devem gerar movimento obrigatório; animações dos botões paradas | **Pendente em dispositivo** |

### Roteiro de teste rápido

1. Abrir `https://olegariotech-site.github.io/padrao-pneus/?v=ot-cta-video-ios-1` em aba privativa/sem cache.
2. No HERO, conferir: vídeo inicia mudo, mostra movimento após 2–3 segundos, continua em loop, sem sobrepor texto ou CTA. Se não iniciar, deve permanecer uma imagem estática útil, não um retângulo preto.
3. Rolar até `#institucional`, conferir o segundo vídeo, loop e aviso ilustrativo.
4. Voltar ao HERO e institucional; verificar que retomam quando voltam à área visível.
5. No desktop, passar mouse sobre menu, 'Pedir orçamento', Instagram e Facebook; conferir feedback leve e sem salto de layout.
6. No mobile, tocar os mesmos CTAs; conferir que nenhum hover permanece preso ou causa toque duplo involuntário.
7. Usar o menu móvel, o formulário de orçamento e o WhatsApp; conferir número correto e texto `Origem: site da Padrão Pneus`, sem enviar pedido real.
8. Ligar movimento reduzido e modo de economia de energia; registrar o comportamento com capturas/curto vídeo e anotar navegador e versão.

**Critério de liberação:** somente marcar uma plataforma como homologada quando alguém a testar nela e registrar evidência. Chrome/Linux ou simulação mobile não equivalem a Safari/iOS físico.

**Responsável pela aprovação comercial:** Rodolfo. Publicação oficial não autorizada até contratação/aceite.
