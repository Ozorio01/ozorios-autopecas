# AutoPeças POS

Sistema interno de vendas para loja/oficina de autopeças. Uso **exclusivo dos vendedores**
(o cliente final não acessa o sistema) — vendedor cadastra o cliente, monta a venda a partir
do catálogo, escolhe forma de pagamento e emite a nota.

Este repositório contém, por enquanto, **apenas o protótipo de front-end** (HTML, CSS e
JavaScript puros, sem framework e sem backend). O objetivo é validar o fluxo visual e de
interação antes de plugar banco de dados e servidor.

## Estrutura

```
autopecas-pos/
├── index.html          # tela de login do vendedor
├── dashboard.html       # painel de vendas (catálogo + carrinho + emissão de nota)
├── css/
│   └── style.css        # tema visual do sistema
├── js/
│   ├── data.js           # dados mockados (produtos, clientes) — hoje fixos no front
│   └── app.js             # toda a interação: catálogo, carrinho, cliente, totais, nota
└── README.md
```

## Como rodar localmente

Não precisa de instalação nenhuma ainda — é HTML/CSS/JS puro. Duas formas:

**Opção 1 — abrir direto no navegador**
Dê duplo clique em `index.html`.

**Opção 2 — servidor local (recomendado, evita bloqueios de CORS mais adiante)**
```bash
# Python
python3 -m http.server 5500

# ou Node (se tiver o pacote instalado globalmente)
npx serve .
```
Depois acesse `http://localhost:5500`.

## O que já está no protótipo

- Login do vendedor (visual, sem autenticação real ainda).
- Catálogo de peças com busca por nome/código e filtro por categoria.
- Carrinho de venda com quantidade, subtotal por item e remoção.
- Seleção de cliente já cadastrado (busca por nome ou CPF/CNPJ).
- Cálculo de subtotal, desconto e total.
- Emissão de "nota" simulada (modal de confirmação com número da nota).
- Layout responsivo até tablet; em telas muito estreitas o painel de venda
  se adapta (ideal ainda é usar em desktop/tablet no caixa).

## Próximos passos (fora do escopo deste protótipo)

1. **Backend (Node.js + Express, por exemplo)**
   - Rotas REST: `/api/produtos`, `/api/clientes`, `/api/vendas`, `/api/notas`.
   - Autenticação de vendedor (login com sessão/JWT).
2. **Banco de dados (PostgreSQL, por exemplo)**
   - Tabelas: `produtos`, `clientes`, `vendedores`, `vendas`, `itens_venda`, `notas_fiscais`.
   - Controle de estoque em tempo real (dar baixa ao finalizar venda).
3. **Emissão fiscal de verdade**
   - Integração com um provedor de NF-e/NFC-e (ex: Focus NFe, eNotas, ou o SEFAZ direto)
     para emitir a nota fiscal real, não apenas o recibo interno que o protótipo mostra hoje.
4. **Trocar os mocks por chamadas de API**
   - `js/data.js` deixa de existir; `js/app.js` passa a buscar dados com `fetch('/api/...')`.
   - Os pontos já estão marcados no código com comentários `// TODO backend`.

## Publicando no GitHub

```bash
cd autopecas-pos
git init
git add .
git commit -m "Protótipo inicial do front-end do AutoPeças POS"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/autopecas-pos.git
git push -u origin main
```
