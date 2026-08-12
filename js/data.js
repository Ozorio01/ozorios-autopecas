// data.js — dados de exemplo (mock). No projeto real isso viria do banco de dados via API.

const CATEGORIAS = [
  { id: "todas", nome: "Todas" },
  { id: "motor", nome: "Motor" },
  { id: "freios", nome: "Freios" },
  { id: "suspensao", nome: "Suspensão" },
  { id: "eletrica", nome: "Elétrica" },
  { id: "acessorios", nome: "Acessórios" },
];

// custo = preço pago ao fornecedor (usado para calcular a margem do vendedor)
// tabela = preço de tabela/sugerido (referência antes de qualquer desconto)
const PRODUTOS = [
  { id: "P001", codigo: "MT-2201", nome: "Filtro de Óleo Blindado", fabricante: "Tecfil", categoria: "motor", tabela: 34.9, preco: 34.9, custo: 21.8, estoque: 42, unidade: "un" },
  { id: "P002", codigo: "MT-2214", nome: "Correia Dentada Reforçada", fabricante: "Gates", categoria: "motor", tabela: 89.5, preco: 89.5, custo: 58.2, estoque: 15, unidade: "un" },
  { id: "P003", codigo: "MT-2230", nome: "Vela de Ignição Iridium", fabricante: "NGK", categoria: "motor", tabela: 27.3, preco: 27.3, custo: 15.9, estoque: 120, unidade: "un" },
  { id: "P004", codigo: "FR-1102", nome: "Pastilha de Freio Dianteira", fabricante: "Fras-le", categoria: "freios", tabela: 118.0, preco: 118.0, custo: 79.5, estoque: 8, unidade: "jogo" },
  { id: "P005", codigo: "FR-1115", nome: "Disco de Freio Ventilado", fabricante: "Fremax", categoria: "freios", tabela: 156.9, preco: 156.9, custo: 104.0, estoque: 6, unidade: "un" },
  { id: "P006", codigo: "FR-1130", nome: "Fluido de Freio DOT4 500ml", fabricante: "Bosch", categoria: "freios", tabela: 22.4, preco: 22.4, custo: 13.1, estoque: 55, unidade: "un" },
  { id: "P007", codigo: "SP-3301", nome: "Amortecedor Traseiro a Gás", fabricante: "Cofap", categoria: "suspensao", tabela: 214.0, preco: 214.0, custo: 148.0, estoque: 10, unidade: "un" },
  { id: "P008", codigo: "SP-3310", nome: "Kit Batente + Coifa", fabricante: "Nakata", categoria: "suspensao", tabela: 68.5, preco: 68.5, custo: 41.0, estoque: 18, unidade: "kit" },
  { id: "P009", codigo: "SP-3322", nome: "Bandeja de Suspensão", fabricante: "Nakata", categoria: "suspensao", tabela: 175.3, preco: 175.3, custo: 121.0, estoque: 4, unidade: "un" },
  { id: "P010", codigo: "EL-4401", nome: "Bateria 60Ah Selada", fabricante: "Moura", categoria: "eletrica", tabela: 389.0, preco: 389.0, custo: 289.0, estoque: 12, unidade: "un" },
  { id: "P011", codigo: "EL-4415", nome: "Alternador Recondicionado", fabricante: "Bosch", categoria: "eletrica", tabela: 320.0, preco: 320.0, custo: 214.0, estoque: 3, unidade: "un" },
  { id: "P012", codigo: "EL-4430", nome: "Kit Lâmpadas LED H4", fabricante: "Philips", categoria: "eletrica", tabela: 95.0, preco: 95.0, custo: 54.0, estoque: 27, unidade: "kit" },
  { id: "P013", codigo: "AC-5501", nome: "Tapete Automotivo 5 Peças", fabricante: "Borcol", categoria: "acessorios", tabela: 129.9, preco: 129.9, custo: 71.0, estoque: 33, unidade: "jogo" },
  { id: "P014", codigo: "AC-5512", nome: "Capa de Volante Couro", fabricante: "Borcol", categoria: "acessorios", tabela: 44.9, preco: 44.9, custo: 22.0, estoque: 60, unidade: "un" },
  { id: "P015", codigo: "AC-5530", nome: "Suporte Veicular Celular", fabricante: "Multilaser", categoria: "acessorios", tabela: 39.0, preco: 39.0, custo: 18.5, estoque: 48, unidade: "un" },
];

const CLIENTES = [
  { id: "C001", nome: "Auto Center Silva", doc: "12.345.678/0001-90", tipo: "PJ", cidade: "Campinas - SP" },
  { id: "C002", nome: "João Pedro Almeida", doc: "234.567.890-11", tipo: "PF", cidade: "Valinhos - SP" },
  { id: "C003", nome: "Oficina Rota Norte", doc: "98.765.432/0001-10", tipo: "PJ", cidade: "Sumaré - SP" },
  { id: "C004", nome: "Marcela Ferreira Costa", doc: "345.678.901-22", tipo: "PF", cidade: "Campinas - SP" },
  { id: "C005", nome: "Transportadora Vale Verde", doc: "11.222.333/0001-44", tipo: "PJ", cidade: "Paulínia - SP" },
];

const VENDEDOR_LOGADO = { nome: "Rafael Nogueira", matricula: "V-014", turno: "Turno Manhã" };
