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

## Pendências antes do uso oficial

1. Validar a identidade própria da Padrão Pneus com Rodolfo.
2. Confirmar serviços, fotos reais, telefone, horários, endereço e permissões de marcas.
3. Testar vídeo, responsividade, desempenho, privacidade e acessibilidade em Android/iOS e desktop.
4. Não divulgar a demonstração como site oficial ou prometer resultados de busca.

Conceito e desenvolvimento — OLEGARIO TECH®.