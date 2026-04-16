require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Categoria = require("./models/Categoria");
const Produto = require("./models/Produto");

const CATEGORIAS = [
  { nome: "Tênis" },
  { nome: "Camisetas" },
  { nome: "Calças" },
  { nome: "Acessórios" },
  { nome: "Bolsas" },
  { nome: "Relógios" },
];

// Imagens reais do Unsplash (CDN público, sem auth)
const PRODUTOS = [
  // ── Tênis ─────────────────────────────────────────────────
  {
    nome: "Tênis Air Runner Pro",
    preco: 349.9,
    urlImagem: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    categoria: "Tênis",
    descricao: "Tênis esportivo com amortecimento de alta performance e solado antiderrapante. Ideal para corridas longas e treinos intensos.",
  },
  {
    nome: "Tênis Urbano Classic",
    preco: 249.9,
    urlImagem: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80",
    categoria: "Tênis",
    descricao: "Design moderno e minimalista para o dia a dia. Cabedal em couro vegano com palmilha anatômica.",
  },
  {
    nome: "Tênis Trail Boost",
    preco: 429.0,
    urlImagem: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
    categoria: "Tênis",
    descricao: "Desenvolvido para trilhas e terrenos irregulares. Sola Vibram ultra aderente e biqueira reforçada.",
  },
  {
    nome: "Tênis Slip-On Comfort",
    preco: 189.9,
    urlImagem: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80",
    categoria: "Tênis",
    descricao: "Fácil de calçar e extremamente leve. Elástico lateral garante ajuste perfeito sem cadarço.",
  },
  {
    nome: "Tênis Performance X9",
    preco: 519.0,
    urlImagem: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=80",
    categoria: "Tênis",
    descricao: "Tecnologia de carbono no solado para máxima propulsão. Escolha de atletas profissionais.",
  },

  // ── Camisetas ─────────────────────────────────────────────
  {
    nome: "Camiseta Básica Premium",
    preco: 79.9,
    urlImagem: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    categoria: "Camisetas",
    descricao: "100% algodão penteado 30/1. Toque suave, corte regular e tintura premium que não desbota.",
  },
  {
    nome: "Camiseta Oversized Vintage",
    preco: 109.9,
    urlImagem: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80",
    categoria: "Camisetas",
    descricao: "Corte largo inspirado nos anos 90. Lavagem especial para efeito desgastado autêntico.",
  },
  {
    nome: "Camiseta Dry-Fit Esportiva",
    preco: 89.9,
    urlImagem: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&q=80",
    categoria: "Camisetas",
    descricao: "Tecido tecnológico que evacua o suor rapidamente. UV50+ e secagem 3x mais rápida que o algodão.",
  },
  {
    nome: "Camiseta Polo Elegante",
    preco: 139.0,
    urlImagem: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    categoria: "Camisetas",
    descricao: "Piquet de alta qualidade com bordado sutil. Transita entre o casual e o semi-formal com facilidade.",
  },
  {
    nome: "Camiseta Estampada Art",
    preco: 99.9,
    urlImagem: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80",
    categoria: "Camisetas",
    descricao: "Estampa exclusiva de artista brasileiro em serigrafia 8 cores. Edição limitada.",
  },

  // ── Calças ────────────────────────────────────────────────
  {
    nome: "Calça Jeans Slim Fit",
    preco: 199.9,
    urlImagem: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
    categoria: "Calças",
    descricao: "Denim premium com 2% elastano para maior mobilidade. Lavagem escura que valoriza o caimento.",
  },
  {
    nome: "Calça Cargo Street",
    preco: 229.0,
    urlImagem: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
    categoria: "Calças",
    descricao: "Múltiplos bolsos funcionais com design streetwear contemporâneo. Tecido ripstop resistente.",
  },
  {
    nome: "Calça Moletom Comfort",
    preco: 159.9,
    urlImagem: "https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?w=600&q=80",
    categoria: "Calças",
    descricao: "Moletom fleece ultra macio. Elástico ajustável e bolsos laterais fundos. Perfeita para dias frios.",
  },
  {
    nome: "Calça Social Slim",
    preco: 269.0,
    urlImagem: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
    categoria: "Calças",
    descricao: "Alfaiataria estruturada em bengaline com caimento impecável. Ideal para ambiente corporativo.",
  },

  // ── Acessórios ────────────────────────────────────────────
  {
    nome: "Boné Dad Hat Premium",
    preco: 89.9,
    urlImagem: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80",
    categoria: "Acessórios",
    descricao: "Aba curva, fecho metálico ajustável e bordado em relevo. 100% algodão lavado.",
  },
  {
    nome: "Meia Cano Alto Pack 3",
    preco: 49.9,
    urlImagem: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=600&q=80",
    categoria: "Acessórios",
    descricao: "Kit com 3 pares em algodão com elastano. Cano alto com ribana dupla para não escorregar.",
  },
  {
    nome: "Cinto Couro Genuíno",
    preco: 129.9,
    urlImagem: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&q=80",
    categoria: "Acessórios",
    descricao: "Couro bovino curtido ao vegetal. Fivela inox escovado. Largura 3,5 cm. Tamanhos P ao GG.",
  },
  {
    nome: "Óculos Wayfarer Clássico",
    preco: 179.9,
    urlImagem: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
    categoria: "Acessórios",
    descricao: "Armação acetato com lentes polarizadas UV400. Proteção solar máxima com estilo atemporal.",
  },

  // ── Bolsas ────────────────────────────────────────────────
  {
    nome: "Mochila Urbana 25L",
    preco: 259.9,
    urlImagem: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    categoria: "Bolsas",
    descricao: "Compartimento para notebook 15\", bolso anti-furto traseiro e alças ergonômicas acolchoadas.",
  },
  {
    nome: "Bolsa Tote Canvas",
    preco: 149.9,
    urlImagem: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    categoria: "Bolsas",
    descricao: "Lona resistente à água com alças reforçadas. Espaçosa e dobrável. Sustentável e durável.",
  },
  {
    nome: "Pochete Crossbody",
    preco: 119.0,
    urlImagem: "https://images.unsplash.com/photo-1614179818511-90fc92c64cb3?w=600&q=80",
    categoria: "Bolsas",
    descricao: "Alça ajustável transpassada. Nylon impermeável com zíper YKK. Ideal para viagens e festivais.",
  },
  {
    nome: "Mala de Bordo Slim",
    preco: 389.0,
    urlImagem: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=600&q=80",
    categoria: "Bolsas",
    descricao: "Dimensões permitidas em cabine. Carcaça rígida ABS, rodas duplas 360° e cadeado TSA.",
  },

  // ── Relógios ──────────────────────────────────────────────
  {
    nome: "Relógio Minimalista Sand",
    preco: 499.0,
    urlImagem: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80",
    categoria: "Relógios",
    descricao: "Caixa 40mm em aço inox escovado. Mostrador clean com índices dourados. Pulseira couro italiano.",
  },
  {
    nome: "Relógio Cronógrafo Sport",
    preco: 749.0,
    urlImagem: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&q=80",
    categoria: "Relógios",
    descricao: "Mecanismo Seiko VK64 de cronógrafo. Resistente a 100m. Bezel giratório e pulseira de borracha.",
  },
  {
    nome: "Relógio Smartwatch Pro",
    preco: 899.0,
    urlImagem: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&q=80",
    categoria: "Relógios",
    descricao: "Monitor cardíaco, GPS integrado, 7 dias de bateria. Notificações, pagamento NFC e 50m waterproof.",
  },
  {
    nome: "Relógio Vintage Automático",
    preco: 1290.0,
    urlImagem: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80",
    categoria: "Relógios",
    descricao: "Movimento automático 21 joias. Caixa bronze oxidado, mostrador guilhochê e vidro safira.",
  },
];

async function seed() {
  await connectDB();
  console.log("✓ Conectado ao MongoDB\n");

  // Limpa tudo
  await Produto.deleteMany({});
  await Categoria.deleteMany({});
  console.log("✓ Coleções limpas\n");

  // Cria categorias
  const catMap = {};
  for (const c of CATEGORIAS) {
    const criada = await Categoria.create(c);
    catMap[c.nome] = String(criada._id);
    console.log(`  + Categoria: ${c.nome}`);
  }

  console.log(`\n✓ ${CATEGORIAS.length} categorias criadas\n`);

  // Cria produtos
  let count = 0;
  for (const p of PRODUTOS) {
    const { categoria, ...rest } = p;
    await Produto.create({ ...rest, categoria_id: catMap[categoria] });
    console.log(`  + Produto: ${p.nome} — R$ ${p.preco.toFixed(2)}`);
    count++;
  }

  console.log(`\n✓ ${count} produtos criados com sucesso!\n`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Erro no seed:", err);
  process.exit(1);
});
