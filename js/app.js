// app.js — interatividade do protótipo (front-end apenas, sem persistência real).
// No projeto final, os pontos marcados com "// TODO backend" viram chamadas fetch() para a API.

const estado = {
  categoriaAtiva: "todas",
  termoBusca: "",
  itens: [],       // [{ produtoId, qtd }]
  clienteId: null,
  formaPagamento: "Pix",
  tipoDesconto: "percentual", // "percentual" | "valor" — o vendedor escolhe como digitar
  descontoDigitado: 0,         // valor que o vendedor digitou (número puro)
};

const fmtMoeda = (valor) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function iniciar() {
  renderCategorias();
  renderProdutos();
  renderItensVenda();
  atualizarPassos();

  document.getElementById("busca-input").addEventListener("input", (e) => {
    estado.termoBusca = e.target.value.toLowerCase();
    renderProdutos();
  });

  document.getElementById("busca-cliente").addEventListener("input", (e) => {
    renderListaClientes(e.target.value);
  });
  document.getElementById("busca-cliente").addEventListener("focus", (e) => {
    renderListaClientes(e.target.value);
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".seletor-cliente")) {
      document.getElementById("lista-clientes").classList.remove("aberta");
    }
  });

  document.getElementById("remover-cliente").addEventListener("click", () => {
    estado.clienteId = null;
    atualizarClienteSelecionado();
    atualizarBotaoFinalizar();
    atualizarPassos();
  });

  document.querySelectorAll(".forma-pag").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".forma-pag").forEach((b) => b.classList.remove("selecionada"));
      btn.classList.add("selecionada");
      estado.formaPagamento = btn.dataset.forma;
    });
  });

  document.getElementById("input-desconto").addEventListener("input", (e) => {
    estado.descontoDigitado = parseFloat(e.target.value) || 0;
    atualizarTotais();
  });

  document.querySelectorAll(".tipo-desconto").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tipo-desconto").forEach((b) => b.classList.remove("ativo"));
      btn.classList.add("ativo");
      estado.tipoDesconto = btn.dataset.tipo;
      atualizarTotais();
    });
  });

  document.getElementById("btn-finalizar").addEventListener("click", finalizarVenda);
  document.getElementById("btn-fechar-nota").addEventListener("click", () => {
    document.getElementById("overlay-nota").classList.remove("aberta");
  });
  document.getElementById("btn-nova-venda").addEventListener("click", () => {
    document.getElementById("overlay-nota").classList.remove("aberta");
    novaVenda();
  });

  document.getElementById("btn-sair").addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

/* ---------------- CATEGORIAS ---------------- */

function renderCategorias() {
  const wrap = document.getElementById("lista-categorias");
  wrap.innerHTML = "";
  CATEGORIAS.forEach((cat) => {
    const el = document.createElement("button");
    el.className = "chip-categoria" + (cat.id === estado.categoriaAtiva ? " ativa" : "");
    el.textContent = cat.nome;
    el.addEventListener("click", () => {
      estado.categoriaAtiva = cat.id;
      renderCategorias();
      renderProdutos();
    });
    wrap.appendChild(el);
  });
}

/* ---------------- CATÁLOGO DE PRODUTOS ---------------- */

function produtosFiltrados() {
  return PRODUTOS.filter((p) => {
    const bateCategoria = estado.categoriaAtiva === "todas" || p.categoria === estado.categoriaAtiva;
    const bateBusca =
      !estado.termoBusca ||
      p.nome.toLowerCase().includes(estado.termoBusca) ||
      p.codigo.toLowerCase().includes(estado.termoBusca) ||
      p.fabricante.toLowerCase().includes(estado.termoBusca);
    return bateCategoria && bateBusca;
  });
}

const ICONES_CATEGORIA = {
  motor: "⚙️",
  freios: "🛑",
  suspensao: "🔩",
  eletrica: "🔋",
  acessorios: "🧰",
};

function renderProdutos() {
  const grade = document.getElementById("grade-produtos");
  const lista = produtosFiltrados();
  grade.innerHTML = "";

  if (lista.length === 0) {
    grade.innerHTML = `<div class="carrinho-vazio" style="grid-column:1/-1;">
        <div class="icone-vazio">🔧</div>
        Nenhuma peça encontrada para essa busca.
      </div>`;
    return;
  }

  lista.forEach((p) => {
    const card = document.createElement("div");
    card.className = "cartao-produto";
    const estoqueBaixo = p.estoque <= 6;
    card.innerHTML = `
      <div class="cartao-topo">
        <div class="icone-peca">${ICONES_CATEGORIA[p.categoria] || "🔧"}</div>
        <div class="estoque-tag ${estoqueBaixo ? "baixo" : ""}">${p.estoque} ${p.unidade}</div>
      </div>
      <div class="codigo">${p.codigo}</div>
      <div class="nome-produto">${p.nome}</div>
      <div class="fabricante-produto">${p.fabricante}</div>
      <div class="cartao-rodape">
        <div class="preco-produto">${fmtMoeda(p.preco)}</div>
        <button class="btn-add" title="Adicionar à venda">+</button>
      </div>
    `;
    card.querySelector(".btn-add").addEventListener("click", () => adicionarItem(p.id));
    grade.appendChild(card);
  });
}

/* ---------------- CARRINHO / ITENS DA VENDA ---------------- */

function adicionarItem(produtoId) {
  const existente = estado.itens.find((i) => i.produtoId === produtoId);
  if (existente) {
    existente.qtd += 1;
  } else {
    estado.itens.push({ produtoId, qtd: 1 });
  }
  renderItensVenda();
  mostrarToast("Item adicionado à venda");
}

function alterarQtd(produtoId, delta) {
  const item = estado.itens.find((i) => i.produtoId === produtoId);
  if (!item) return;
  item.qtd += delta;
  if (item.qtd <= 0) {
    estado.itens = estado.itens.filter((i) => i.produtoId !== produtoId);
  }
  renderItensVenda();
}

function removerItem(produtoId) {
  estado.itens = estado.itens.filter((i) => i.produtoId !== produtoId);
  renderItensVenda();
}

function renderItensVenda() {
  const wrap = document.getElementById("lista-itens-venda");
  wrap.innerHTML = "";

  if (estado.itens.length === 0) {
    wrap.innerHTML = `<div class="carrinho-vazio">
        <div class="icone-vazio">🧾</div>
        Nenhum item adicionado ainda.<br>Toque em "+" nas peças ao lado.
      </div>`;
  } else {
    estado.itens.forEach((item) => {
      const p = PRODUTOS.find((x) => x.id === item.produtoId);
      const linha = document.createElement("div");
      linha.className = "item-venda";
      linha.innerHTML = `
        <div class="info-item">
          <div class="nome-item">${p.nome}</div>
          <div class="codigo-item">${p.codigo}</div>
          <div class="preco-unit">${fmtMoeda(p.preco)} / ${p.unidade}</div>
        </div>
        <div class="stepper">
          <button class="menos">−</button>
          <span class="qtd">${item.qtd}</span>
          <button class="mais">+</button>
        </div>
        <div class="subtotal-item">${fmtMoeda(p.preco * item.qtd)}</div>
        <button class="remover-item" title="Remover">✕</button>
      `;
      linha.querySelector(".menos").addEventListener("click", () => alterarQtd(item.produtoId, -1));
      linha.querySelector(".mais").addEventListener("click", () => alterarQtd(item.produtoId, 1));
      linha.querySelector(".remover-item").addEventListener("click", () => removerItem(item.produtoId));
      wrap.appendChild(linha);
    });
  }

  atualizarTotais();
  atualizarBotaoFinalizar();
}

/* ---------------- CLIENTE ---------------- */

function renderListaClientes(termo) {
  const wrap = document.getElementById("lista-clientes");
  const t = (termo || "").toLowerCase();
  const lista = CLIENTES.filter(
    (c) => c.nome.toLowerCase().includes(t) || c.doc.toLowerCase().includes(t)
  );

  wrap.innerHTML = "";
  if (lista.length === 0) {
    wrap.innerHTML = `<div class="item-cliente">Nenhum cliente encontrado.</div>`;
  } else {
    lista.forEach((c) => {
      const el = document.createElement("div");
      el.className = "item-cliente";
      el.innerHTML = `<div class="nome-cli">${c.nome}</div><div class="doc-cli">${c.doc} · ${c.cidade}</div>`;
      el.addEventListener("click", () => {
        estado.clienteId = c.id;
        atualizarClienteSelecionado();
        document.getElementById("busca-cliente").value = "";
        wrap.classList.remove("aberta");
        atualizarBotaoFinalizar();
        atualizarPassos();
      });
      wrap.appendChild(el);
    });
  }
  wrap.classList.add("aberta");
}

function atualizarClienteSelecionado() {
  const box = document.getElementById("cliente-selecionado");
  if (!estado.clienteId) {
    box.classList.remove("visivel");
    return;
  }
  const c = CLIENTES.find((x) => x.id === estado.clienteId);
  document.getElementById("cliente-nome").textContent = c.nome;
  document.getElementById("cliente-doc").textContent = `${c.doc} · ${c.cidade}`;
  box.classList.add("visivel");
}

/* ---------------- TOTAIS ---------------- */

function calcularTotais() {
  const subtotal = estado.itens.reduce((soma, item) => {
    const p = PRODUTOS.find((x) => x.id === item.produtoId);
    return soma + p.preco * item.qtd;
  }, 0);
  const custoTotal = estado.itens.reduce((soma, item) => {
    const p = PRODUTOS.find((x) => x.id === item.produtoId);
    return soma + p.custo * item.qtd;
  }, 0);

  let desconto = 0;
  if (estado.tipoDesconto === "percentual") {
    desconto = subtotal * (Math.min(estado.descontoDigitado, 100) / 100);
  } else {
    desconto = Math.min(estado.descontoDigitado, subtotal);
  }

  const total = Math.max(subtotal - desconto, 0);
  const margemValor = total - custoTotal;
  const margemPercentual = total > 0 ? (margemValor / total) * 100 : 0;

  return { subtotal, custoTotal, desconto, total, margemValor, margemPercentual };
}

function atualizarTotais() {
  const { subtotal, desconto, total, margemValor, margemPercentual } = calcularTotais();
  document.getElementById("txt-subtotal").textContent = fmtMoeda(subtotal);
  document.getElementById("txt-desconto").textContent = "− " + fmtMoeda(desconto);
  document.getElementById("txt-total").textContent = fmtMoeda(total);
  atualizarMargem(margemValor, margemPercentual);
  atualizarPassos();
}

function atualizarMargem(margemValor, margemPercentual) {
  const txtPercentual = document.getElementById("margem-percentual");
  const barra = document.getElementById("margem-barra");
  const detalhe = document.getElementById("margem-detalhe");

  if (estado.itens.length === 0) {
    txtPercentual.textContent = "0%";
    txtPercentual.className = "margem-percentual";
    barra.style.width = "0%";
    barra.className = "margem-barra-preenchida";
    detalhe.textContent = "Adicione produtos para calcular";
    return;
  }

  let nivel = "ok";
  if (margemPercentual < 10) nivel = "baixa";
  else if (margemPercentual < 20) nivel = "atencao";

  const classeExtra = nivel === "ok" ? "" : " " + nivel;
  txtPercentual.textContent = `${margemPercentual.toFixed(1)}%`;
  txtPercentual.className = "margem-percentual" + classeExtra;
  barra.style.width = `${Math.max(Math.min(margemPercentual, 100), 0)}%`;
  barra.className = "margem-barra-preenchida" + classeExtra;

  const mensagens = {
    ok: `Margem saudável: ${fmtMoeda(margemValor)} de lucro nesta venda.`,
    atencao: `Atenção: margem apertada (${fmtMoeda(margemValor)} de lucro).`,
    baixa: `Cuidado: margem baixa ou negativa (${fmtMoeda(margemValor)}).`,
  };
  detalhe.textContent = mensagens[nivel];
}

/* ---------------- PASSO A PASSO ---------------- */

function atualizarPassos() {
  const p1 = document.querySelector('.passo[data-passo="1"]');
  const p2 = document.querySelector('.passo[data-passo="2"]');
  const p3 = document.querySelector('.passo[data-passo="3"]');
  const p4 = document.querySelector('.passo[data-passo="4"]');
  [p1, p2, p3, p4].forEach((p) => p.classList.remove("concluido", "atual"));

  if (!estado.clienteId) {
    p1.classList.add("atual");
    return;
  }
  p1.classList.add("concluido");

  if (estado.itens.length === 0) {
    p2.classList.add("atual");
    return;
  }
  p2.classList.add("concluido");
  p3.classList.add("atual");
}

function atualizarBotaoFinalizar() {
  const btn = document.getElementById("btn-finalizar");
  btn.disabled = estado.itens.length === 0 || !estado.clienteId;
}

/* ---------------- FINALIZAR VENDA / EMITIR NOTA ---------------- */

function finalizarVenda() {
  // TODO backend: POST /vendas { clienteId, itens, formaPagamento, vendedorId }
  // O servidor validaria estoque, gravaria a venda e retornaria o número da nota fiscal.

  const { total } = calcularTotais();
  const c = CLIENTES.find((x) => x.id === estado.clienteId);
  const numeroNota = Math.floor(100000 + Math.random() * 899999);
  const qtdItens = estado.itens.reduce((s, i) => s + i.qtd, 0);

  const chaveSimulada = Array.from({ length: 4 }, () =>
    Math.floor(1000 + Math.random() * 9000)
  ).join(" ");

  document.getElementById("modal-numero-nota").textContent = `Nota Nº ${numeroNota}`;
  document.getElementById("modal-cliente").textContent = c.nome;
  document.getElementById("modal-pagamento").textContent = estado.formaPagamento;
  document.getElementById("modal-itens").textContent = qtdItens;
  document.getElementById("modal-chave").textContent = chaveSimulada + " ...";
  document.getElementById("modal-total").textContent = fmtMoeda(total);

  document.querySelector('.passo[data-passo="3"]').classList.remove("atual");
  document.querySelector('.passo[data-passo="3"]').classList.add("concluido");
  document.querySelector('.passo[data-passo="4"]').classList.add("concluido");

  document.getElementById("overlay-nota").classList.add("aberta");
}

function novaVenda() {
  estado.itens = [];
  estado.clienteId = null;
  estado.descontoDigitado = 0;
  document.getElementById("input-desconto").value = "";
  atualizarClienteSelecionado();
  renderItensVenda();
  mostrarToast("Nova venda iniciada");
}

/* ---------------- TOAST ---------------- */

let toastTimeout;
function mostrarToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("visivel");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("visivel"), 2200);
}

iniciar();
