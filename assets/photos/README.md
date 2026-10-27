# Padrão Pneus — fotos reais (planejamento)

Este diretório é um guia de organização de futuras **fotos reais autorizadas** da Padrão Pneus. Fotografias de equipe e produtos já foram enviadas à pasta `assets/` (na raiz) e estão presentes na prévia, inclusive `assets/04-estoque-pneus-e-produtos.webp` no card da seção Nossa Estrutura. A foto definitiva da fachada ainda precisa de seleção e aprovação.

## Organização proposta

- `fachada-atual.webp`: foto diurna, atualizada, da entrada e identidade própria da loja; futuro uso após aprovação; o módulo atual é `data-photo-slot="estrutura"` com foto interna real.
- `equipe-atendimento.webp`: pessoas e atendimento, somente com autorização dos retratados.
- `servico-pneus.webp`: pneus e serviço, com ambiente real.
- `alinhamento.webp`: equipamento e trabalho real, caso seja prestado pela loja.
- `balanceamento.webp`: processo ou equipamento real, caso seja prestado pela loja.

## Publicação segura e consistente

1. Confirmar com Rodolfo as informações visuais e a permissão para publicar cada imagem.
2. Se houver marcas antigas ou de terceiros na fachada, discutir o enquadramento e a estratégia com o proprietário. **Não criar uma representação enganosa da loja.** Evitar usar essas marcas como identidade do novo site.
3. Converter fotos otimizadas para WebP/AVIF, mantendo origem para edição. Alvo inicial: largura 1400–1800px para fachada e 900–1400px para demais fotos, com qualidade visual adequada e sem metadados pessoais desnecessários.
4. Preparar versões adequadas para celular e desktop quando necessário. Usar proporção e `object-fit:cover` para não distorcer a cena. Informar dimensões e texto alternativo descritivo; `loading="lazy"` abaixo da primeira dobra.
5. Após o upload, inserir **somente quando houver o arquivo real**, dentro de `div.feature-image.photo-ready`:

```html
<img class="feature-photo" src="assets/photos/fachada-atual.webp" alt="Fachada atual da Padrão Pneus, em Valinhos" width="1600" height="1000" decoding="async" loading="lazy">
```

O `design-system.css` já oferece enquadramento, cobertura e contraste para esta foto. Manter a descrição editorial por cima e testar legibilidade. Outros novos slots fotográficos devem seguir o mesmo padrão. Não inventar avaliações, pessoas, equipamentos ou estrutura.

## Status

**Preparado para futura inclusão; nenhum arquivo fotográfico foi homologado.**
