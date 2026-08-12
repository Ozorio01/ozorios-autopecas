// data.js — dados de exemplo (mock). No projeto real isso viria do banco de dados via API.

const CATEGORIAS = [
  { id: "todas", nome: "Todas" },
  { id: "motor", nome: "Motor" },
  { id: "freios", nome: "Freios" },
  { id: "suspensao", nome: "Suspensão" },
  { id: "eletrica", nome: "Elétrica" },
  { id: "acessorios", nome: "Acessórios" },
];

const PRODUTOS = [
  { id: "P001", codigo: "MT-2201", nome: "Filtro de Óleo Blindado", categoria: "motor", preco: 34.9, estoque: 42, unidade: "un" },
  { id: "P002", codigo: "MT-2214", nome: "Correia Dentada Reforçada", categoria: "motor", preco: 89.5, estoque: 15, unidade: "un" },
  { id: "P003", codigo: "MT-2230", nome: "Vela de Ignição Iridium", categoria: "motor", preco: 27.3, estoque: 120, unidade: "un" },
  { id: "P004", codigo: "FR-1102", nome: "Pastilha de Freio Dianteira", categoria: "freios", preco: 118.0, estoque: 8, unidade: "jogo" },
  { id: "P005", codigo: "FR-1115", nome: "Disco de Freio Ventilado", categoria: "freios", preco: 156.9, estoque: 6, unidade: "un" },
  { id: "P006", codigo: "FR-1130", nome: "Fluido de Freio DOT4 500ml", categoria: "freios", preco: 22.4, estoque: 55, unidade: "un" },
  { id: "P007", codigo: "SP-3301", nome: "Amortecedor Traseiro a Gás", categoria: "suspensao", preco: 214.0, estoque: 10, unidade: "un" },
  { id: "P008", codigo: "SP-3310", nome: "Kit Batente + Coifa", categoria: "suspensao", preco: 68.5, estoque: 18, unidade: "kit" },
  { id: "P009", codigo: "SP-3322", nome: "Bandeja de Suspensão", categoria: "suspensao", preco: 175.3, estoque: 4, unidade: "un" },
  { id: "P010", codigo: "EL-4401", nome: "Bateria 60Ah Selada", categoria: "eletrica", preco: 389.0, estoque: 12, unidade: "un" },
  { id: "P011", codigo: "EL-4415", nome: "Alternador Recondicionado", categoria: "eletrica", preco: 320.0, estoque: 3, unidade: "un" },
  { id: "P012", codigo: "EL-4430", nome: "Kit Lâmpadas LED H4", categoria: "eletrica", preco: 95.0, estoque: 27, unidade: "kit" },
  { id: "P013", codigo: "AC-5501", nome: "Tapete Automotivo 5 Peças", categoria: "acessorios", preco: 129.9, estoque: 33, unidade: "jogo" },
  { id: "P014", codigo: "AC-5512", nome: "Capa de Volante Couro", categoria: "acessorios", preco: 44.9, estoque: 60, unidade: "un" },
  { id: "P015", codigo: "AC-5530", nome: "Suporte Veicular Celular", categoria: "acessorios", preco: 39.0, estoque: 48, unidade: "un" },
];

const CLIENTES = [
  { id: "C001", nome: "Auto Center Silva", doc: "12.345.678/0001-90", tipo: "PJ", cidade: "Campinas - SP" },
  { id: "C002", nome: "João Pedro Almeida", doc: "234.567.890-11", tipo: "PF", cidade: "Valinhos - SP" },
  { id: "C003", nome: "Oficina Rota Norte", doc: "98.765.432/0001-10", tipo: "PJ", cidade: "Sumaré - SP" },
  { id: "C004", nome: "Marcela Ferreira Costa", doc: "345.678.901-22", tipo: "PF", cidade: "Campinas - SP" },
  { id: "C005", nome: "Transportadora Vale Verde", doc: "11.222.333/0001-44", tipo: "PJ", cidade: "Paulínia - SP" },
];

const VENDEDOR_LOGADO = { nome: "Rafael Nogueira", matricula: "V-014", turno: "Turno Manhã" };
