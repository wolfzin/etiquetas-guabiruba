# Site Institucional — Etiquetas Guabiruba (versão final)

Landing page estática, responsiva e otimizada, focada em gerar orçamentos
pelo WhatsApp.

## Estrutura
```
etiquetas-guabiruba/
├── index.html          → estrutura e conteúdo (SEO + dados estruturados)
├── css/styles.css      → design (cores, tipografia, animações)
├── js/script.js        → contatos, menu, animações
├── robots.txt          → indexação
├── sitemap.xml         → mapa do site
└── assets/             → logos, favicons e fotos
```

## ⚙️ Configurar contatos (ÚNICO passo obrigatório)
Abra **`js/script.js`** e edite o bloco `CONFIG` no topo:

```js
const CONFIG = {
  mensagem: "Olá! Vim pelo site da Etiquetas Guabiruba e gostaria de solicitar um orçamento.",
  whatsapps: [
    { rotulo: "WhatsApp Comercial",  numero: "5547999999999" },
    { rotulo: "WhatsApp Orçamentos", numero: "5547988888888" },
  ],
  emails: [
    "contato@etiquetasguabiruba.com.br",
    "vendas@etiquetasguabiruba.com.br",
  ],
};
```
- `numero`: só dígitos → país (55) + DDD + número. Ex.: `5547999999999`.
- O número aparece formatado automaticamente no botão: `(47) 99999-9999`.
- Todos os botões de WhatsApp do site usam o **primeiro** número; a seção
  Contato mostra os **dois**.

## 🖼️ Trocar as fotos da galeria (sem mexer no código)
Substitua os arquivos abaixo dentro de `assets/`, mantendo o **mesmo nome**:
```
galeria-1.webp   galeria-2.webp   galeria-3.webp
galeria-4.webp   galeria-5.webp   hero-destaque.webp   (foto do hero)
```
Recomendado: WebP ou JPG salvo com esse nome, proporção ~4:5, largura mínima 800px.

## Publicar (gratuito)
Site 100% estático → GitHub Pages, Netlify ou Vercel.
Ao publicar, troque `www.etiquetasguabiruba.com.br` pelo domínio real em
`index.html`, `robots.txt` e `sitemap.xml`.

## Personalização
- Cores/tipografia: `:root` no início de `css/styles.css`.
- Textos: direto no `index.html`.
