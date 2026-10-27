# Padrão Pneus | Conceito V0.2 — OLEGARIO TECH®

**Protótipo visual não oficial.** Desenvolvimento experimental sem aprovação ou publicação como site oficial da Padrão Pneus.

## Estrutura

- Site estático, responsivo, sem rastreadores, com seções de serviços, estrutura, orçamento e localização.
- HERO cinematográfico com imagem de reserva SVG, preparado para MP4.
- Navegação mobile e formulário com opção de copiar mensagem.
- robots.txt e meta tags de noindex: mitigam indexação da prévia; não impedem que terceiros acessem o endereço público.
- Marca e contatos provisórios, sem credenciais nem dados de clientes.

## V0.2 — vídeos integrados à branch de desenvolvimento

Os arquivos de vídeo estão na pasta `assets/`:

- `assets/padrao_hero_desktop.mp4`
- `assets/padrao_hero_mobile.mp4`

Os caminhos do `app.js` foram corrigidos para os nomes efetivos do upload. A reprodução real depende de habilitar a prévia no GitHub Pages e validar em navegador. A versão estática (`hero-poster.svg`) permanece como fallback.

## GitHub Pages — demonstração

Em Settings > Pages > Build and deployment > Deploy from a branch, selecionar desenvolvimento-v1 e /(root).
Não modificar a main nem configurar o domínio do cliente nesta fase.


## Localização e horários — prévia V0.2.2

- Endereço de referência: Rua Campos Salles, 902, Vila Faustina II, Valinhos/SP, CEP 13272-350.
- Google Maps: botão usando a ficha de estabelecimento atualmente existente (ainda com nome associado à rede Top Service/DPaschoal) e mapa incorporado por endereço.
- Telefone divulgado: (19) 3869-5687.
- Horários exibidos no Google em 27/10/2026: segunda a sexta, 08h–18h; sábado e domingo, fechado.
- **Confirmar com Rodolfo** os horários, a nomenclatura do perfil do Google, o número de telefone e o endereço comercial antes da publicação oficial. Outros diretórios exibem 07h30 como horário de abertura.
- O iframe de mapas carrega conteúdo de terceiros (Google); antes da versão oficial, revisar aviso de privacidade/consentimento e testar se o mapa identifica corretamente a entrada da loja.


## WhatsApp comercial — V0.2.3

- Contato informado pela OT: **+55 (19) 97421-5389**.
- Botão flutuante verde oficial do WhatsApp (`#25D366`) com expansão do convite “Peça seu orçamento” ao passar o mouse ou receber foco por teclado.
- Em aparelhos com toque, o convite permanece visível e não depende de hover.
- Mensagem de abertura pré-preenchida; o formulário de cotação também prepara uma mensagem personalizada e permite enviá-la diretamente pelo WhatsApp.
- O clique abre o WhatsApp em nova aba. **Não envia mensagens automaticamente** nem constitui rastreamento de conversões neste protótipo.
- Validar links, visual e eventuais sobreposições em Android/iOS e desktop antes de apresentar como site oficial.

## Redes sociais — V0.2.4

- Instagram: https://www.instagram.com/padraopneusautocenter/
- Facebook: https://www.facebook.com/padraopneustopservice/
- Links com acesso pelo menu e rodapé, abrindo em nova aba. Ícones locais SVG e botões responsivos, com hover e foco de teclado.
- Identidade visual de cada rede preservada; os perfis são os atuais fornecidos pelo responsável da OT. A nomenclatura antiga do Facebook deverá ser revista com Rodolfo durante a independência da marca.
- Ícones de marcas baseados nos glifos de **Font Awesome Free Brands** (© Fonticons, Inc.), adaptados para uso local. [Licença CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) · [Fonte e atribuição](https://fontawesome.com/license/free). Instagram e Facebook são marcas de seus titulares, sem endosso das plataformas.
- Verificar visual e navegação reais em Android/iOS, notebooks e desktop antes de homologar o site.

## Identidade visual — V0.3 (conceito)

- Rodolfo confirmou que a **fachada atual** utiliza vermelho, azul e branco. Fotografias fornecidas pela OT, incluindo a fachada noturna, são a referência de identidade.
- Paleta provisória de site: vermelho `#A72C3A`, azul `#254A73`, branco `#F3F5F7`, grafite `#101720`; vermelho claro `#FF9AA7` para contraste em textos sobre fundo escuro.
- Aplicação no cabeçalho, botões, seções, favicon e poster de reserva do HERO.
- Vídeo do HERO e botões das plataformas externas permanecem como antes.
- Não utilizar DPaschoal ou Top Service como referência visual, parceria sugerida ou componente da nova identidade. Links de perfis existentes poderão ter nomes legados até o proprietário atualizá-los.
- Logotipo e cores são **propostas**, não registros nem ativos oficiais, até aprovação do Rodolfo. Faltam arquivos finais e fotografias diurnas para validar tonalidades.

## Redesign editorial humanizado — V0.4 (protótipo)

- Referências de linguagem fornecidas pelo proprietário OT: extrações de estilo dos sites Ferrari e Lamborghini. Referências conceituais de **composição**, **escala de tipos**, **ritmo visual** e **respiro**, sem reproduzir identidades, conteúdo, imagens, logotipos ou fontes proprietárias.
- A marca do cliente continua independente, usando o **azul, vermelho e branco da fachada atual**: `#254A73`, `#A72C3A` e `#F3F5F7`.
- Tipografia: **Barlow Condensed** para títulos com personalidade e **Manrope** para textos claros e humanos. Carregamento inicial pelo Google Fonts com `display=swap`, acompanhado de fallbacks; avaliar auto-hospedagem autorizada, privacidade e performance antes da versão oficial.
- HERO: título mais direto e humano, vídeo existente mantido, botões e prova comercial preservados, layout compacto.
- Serviços: fundo editorial claro, cards sem decoração excessiva, tipografia com mais expressão; outras seções ajustadas em contraste, ritmo e linguagem.
- As medidas da extração são inspiração e **não devem ser copiadas literalmente**: corpo de 7–11px, headline de 120px, amarelo Lamborghini e FerrariSans/LamboType não entram na identidade OT.
- WhatsApp verde, Instagram, Facebook, mapa, horário, formulário e links existentes preservados.
- **Pendente** auditoria visual em navegadores reais, dimensões mobile (320–430px), tablets e desktop; versão ainda não homologada e não oficial.

## Sistema visual unificado — V0.5 (em homologação)

- **Arquivo canônico:** `design-system.css`, carregado **depois** do `styles.css` legado. Ajustes de cor, tipografia, ritmos, botões, formulários e todas as seções devem ser feitos primeiro nesse arquivo, evitando empilhar correções novas no legado.
- **Identidade própria:** Padrão Pneus, azul `#254A73`, vermelho `#A72C3A`, branco `#F3F5F7`; não adotar amarelo, vermelho Ferrari, marcas ou fontes proprietárias das referências automotivas.
- **Fontes:** Barlow Condensed para títulos, Manrope para leitura, com fallbacks. Site usa Google Fonts em protótipo; reavaliar privacidade/auto-hospedagem antes do oficial.
- **Ritmo editorial:** HERO cinematográfico escuro → Serviços claros → Estrutura azul escura → Diferenciais claros → Orçamento escuro → Localização clara → Rodapé escuro.
- **Componentes:** escala de títulos, espaçamento 8–64px, botões retos sem sombras decorativas, linhas discretas, formulários e mapas com contraste adequado, redes sociais com identidade das plataformas e WhatsApp `#25D366`.
- **Fotos:** o módulo `div.feature-image.photo-ready[data-photo-slot="fachada"]` está preparado para receber um `img.feature-photo` **somente após** upload e autorização; seguir `assets/photos/README.md`. Novas imagens de equipe/serviços deverão manter o tratamento editorial (sem arredondamentos exagerados ou imagens inventadas).
- **Preservação:** vídeos desktop/mobile, links WhatsApp/Instagram/Facebook, mapa e formulário permanecem.
- **Escopo:** somente branch `desenvolvimento-v1`. A `main` não recebe merge. Revisão visual e testes de navegador reais **pendentes** antes de apresentação final ao cliente.

## Cor institucional unificada — V0.5.1

- **Um único vermelho de marca:** `#A72C3A` aplicado a CTAs, filetes, números e destaques nas seções claras. Não usar vermelho rosado, vinho alternativo ou gradientes vermelhos na UI.
- **Seções escuras:** títulos, microtextos e destaques verbais em branco/off-white; filetes de 3px e bordas em `#A72C3A`. Isso evita letras vermelhas sobre azul escuro com contraste insuficiente.
- **Seções claras:** texto de destaque vermelho `#A72C3A` sobre branco. Contraste estimado ~6,49:1 sobre `#F7F9FB`. Sobre `#101D2D`, o mesmo vermelho tem apenas ~2,48:1; por isso não se aplica a letras sobre fundo escuro.
- **Ações:** preenchimento vermelho uniforme; estados hover/foco usam movimento discreto e contorno sem adotar outra tonalidade vermelha.
- **Exceção intencional:** WhatsApp, Facebook e Instagram mantêm as cores oficiais das plataformas. O azul institucional e branco da Padrão Pneus são preservados.
- Arquivos ajustados: `design-system.css` (fonte de verdade) e `styles.css` (eliminação dos tons conflitantes). **Publicação oficial, inspeção visual final e testes mobile continuam pendentes.**

## Galeria editorial — Nossa equipe em ação V0.6 (prévia)

- **Posição:** após a seção Serviços e antes de Nossa estrutura.
- **Arquivos de origem:** 8 fotografias JPG e 7 versões WebP em `assets/`, enviadas diretamente pela OT em 27/10/2026. Os originais permanecem intactos; não houve remoção ou renomeação.
- **Faltante:** `assets/01-alinhamento-equipamento.webp`. Enquanto não for enviado, a primeira foto usa `assets/01-alinhamento-equipamento.jpg`. Os sete demais módulos usam `<picture><source type="image/webp">...` com JPG de reserva.
- **Experiência:** 8 imagens com corte responsivo, legendas editoriais e efeito discreto de hover; carregamento diferido, sem biblioteca externa. Desktop 4 colunas com foto em destaque, tablet 2 colunas e mobile 1 coluna.
- **Mensagem:** “Gente de verdade. Cuidado em cada detalhe.”. CTA “Fale com quem cuida do seu carro” abre a conversa no WhatsApp `+55 (19) 97421-5389` com texto predefinido, sem envio automático.
- **Serviços:** legendas descrevem os registros; não confirmam que toda modalidade fotografada está disponível hoje. Validar com Rodolfo antes do lançamento oficial.
- **Privacidade:** não publicar como material promocional definitivo antes de confirmar autorização dos profissionais retratados. As imagens já estão acessíveis no repositório público da prévia, portanto é importante verificar as permissões.
- **Otimização:** para a versão oficial, confirmar licença/autorizações, dimensões e qualidade das imagens em navegadores reais; avaliar mover originais para um arquivo separado se necessário, preservando links publicados.

## Galeria de produtos e estoque — V0.7 (prévia)

- Nova coleção incorporada **dentro da seção Nossa Estrutura**, evitando uma sequência excessiva de galerias independentes.
- **Recebimento confirmado em 27/10/2026:** 8 fotografias WebP otimizadas e 8 JPGs de reserva do espaço/estoque, enviadas pela OT na pasta `assets/` (raiz), e não em `assets/photos/produtos/`. Manter caminhos reais, sem duplicar ou mover os arquivos originais.
- **Destaques:** `04-estoque-pneus-e-produtos.webp` e `06-estoque-de-pneus.webp`. Complementos visíveis: `02-corredor-de-produtos.webp` e `01-lubrificantes-e-fluidos.webp`. Mais quatro fotografias em `<details>` acessível, acionado por “Ver mais fotos da estrutura”.
- Cada módulo usa `<picture>` com WebP e JPG fallback, `loading="lazy"`, legenda e `alt` descritivo.
- **CTA:** “Consultar produtos no WhatsApp”, abrindo conversa no número `+55 (19) 97421-5389` com mensagem pré-definida, sem envio automático.
- **Comercial:** as imagens não são catálogo de preço nem prova de disponibilidade atual. Confirmar estoque, opções e serviços diretamente com a equipe.
- **Identidade:** azul profundo, branco e único vermelho `#A72C3A`, Barlow Condensed/Manrope, linhas discretas. CSS no `design-system.css`, preservando o HERO e galeria “Nossa equipe em ação”.
- **Antes da publicação oficial:** validar que as fotos representam o espaço atual, que existe autorização de uso das imagens e que o mobile/desktop foram homologados. Sem merge na `main`.

## Identidade aplicada — Logotipo V0.8 (conceito)

- Logotipo horizontal novo em SVG, com símbolo **P** de geometria própria e traços inspirados em pneu, aplicado ao **cabeçalho e rodapé**.
- Versão para fundo escuro: `assets/branding/padrao-pneus-horizontal-dark.svg` (branco/vermelho). Versão para fundo claro: `assets/branding/padrao-pneus-horizontal-light.svg` (azul/vermelho).
- Ícone isolado em `assets/branding/padrao-pneus-symbol.svg` e favicon atualizado em `assets/favicon.svg`.
- Cores da identidade da fachada preservadas: `#254A73`, `#A72C3A`, `#F3F5F7`. Ajustes responsivos em `design-system.css`.
- A apresentação conceitual gerada por IA orienta a direção; os arquivos SVG de aplicação são **novos desenhos vetoriais simplificados**, não uma extração literal do mockup.
- Pendências: confirmação visual com Rodolfo, pesquisa de originalidade/registrabilidade e conversão do texto SVG para contornos antes de aplicação gráfica definitiva. Veja `assets/branding/README.md`.
- **Sem merge e sem publicação oficial autorizada.**

## Microinterações de botões — V0.8.1

- Movimento sutil integrado em `design-system.css`, sem JavaScript extra e sem alterar links ou mensagens.
- **Desktop:** CTA vermelho com elevação de até 3px, reflexo discreto uma vez por hover, seta deslizando sutilmente; WhatsApp de orçamento com elevação e sombra verde. O botão flutuante preserva a expansão de legenda existente e acrescenta leve movimento do ícone ao hover.
- **Android/iOS:** botões com área mínima de toque de 44px e realimentação visual ao pressionar (`:active`, escala de ~97%), sem exigir hover; CTA flutuante com resposta ao toque.
- **Atenção visual:** único pulso suave de halo no WhatsApp flutuante a cada 10 segundos, sem alteração do verde `#25D366`. As CTAs do site mantêm vermelho `#A72C3A`.
- **Acessibilidade:** se o navegador indicar `prefers-reduced-motion: reduce`, animações e transformações são desativadas. Estados de foco por teclado mantidos.
- Pendências: teste visual efetivo em Chrome/Edge desktop, Safari iOS e Chrome Android, incluindo sobreposição do botão flutuante e comportamento com menu aberto. Não homologado para publicação oficial.

## Pendências antes do uso oficial

1. Validar a identidade própria da Padrão Pneus com Rodolfo.
2. Confirmar serviços, fotos reais, telefone, horários, endereço e permissões de marcas.
3. Testar vídeo, responsividade, desempenho, privacidade e acessibilidade em Android/iOS e desktop.
4. Não divulgar a demonstração como site oficial ou prometer resultados de busca.

Conceito e desenvolvimento — OLEGARIO TECH®.