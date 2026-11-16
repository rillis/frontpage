# frontpage

Página inicial de [rillis.com.br](https://rillis.com.br): apresentação curta e links para o portfólio, GitHub e LinkedIn.

HTML, CSS e JavaScript puros, sem build e sem dependências (as fontes vêm do Google Fonts).

## Estrutura

- `index.html` — página principal
- `404.html` — página de erro do GitHub Pages
- `css/style.css` — estilos (tema claro/escuro)
- `js/main.js` — alternância de tema, atalhos de teclado (P, G, L) e status do último push no GitHub
- `CNAME` — domínio customizado
- `.well-known/atproto-did` — verificação do handle do Bluesky

## Rodar localmente

```bash
python3 -m http.server 8000
```

Abra http://localhost:8000.

## Deploy

GitHub Pages a partir da branch `master`: um push publica a nova versão.
