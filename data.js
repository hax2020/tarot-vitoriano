// data.js
// Estrutura local das 78 cartas do Tarot para o Oráculo Vitoriano.

const tarotData = [];

const majorArcanaNames = [
  "O Louco",
  "O Mago",
  "A Sacerdotisa",
  "A Imperatriz",
  "O Imperador",
  "O Hierofante",
  "Os Enamorados",
  "A Carruagem",
  "A Força",
  "O Eremita",
  "A Roda da Fortuna",
  "A Justiça",
  "O Enforcado",
  "A Morte",
  "A Temperança",
  "O Diabo",
  "A Torre",
  "A Estrela",
  "A Lua",
  "O Sol",
  "O Julgamento",
  "O Mundo"
];

for (let i = 1; i <= 78; i++) {
  let nome;
  let descNormal;
  let descInvertida;

  if (i <= 22) {
    nome = majorArcanaNames[i - 1];
    descNormal = `A manifestação pura da força de ${nome}. Representa caminho direto, iluminação e o aspecto consciente das suas ações e destino.`;
    descInvertida = `O reflexo sombrio ou atrasado de ${nome}. Indica a necessidade de cautela, introversão ou a quebra de ilusões no seu caminho.`;
  } else {
    const offset = i - 23;
    const suits = ["Paus", "Copas", "Espadas", "Ouros"];
    const suitIndex = Math.floor(offset / 14);
    const suitName = suits[suitIndex] || "Mistério";
    const val = (offset % 14) + 1;

    let valName = String(val);
    if (val === 1) valName = "Ás";
    else if (val === 11) valName = "Pajem";
    else if (val === 12) valName = "Cavaleiro";
    else if (val === 13) valName = "Rainha";
    else if (val === 14) valName = "Rei";

    nome = `${valName} de ${suitName}`;
    descNormal = `A energia de ${suitName} age a seu favor. Traz movimento prático, clareza, prosperidade ou emoções plenas conforme o contexto da leitura.`;
    descInvertida = `Bloqueios na energia de ${suitName}. Sugere atrasos, tensões internas, excessos, passividade ou emoções contidas.`;
  }

  tarotData.push({
    idBase: i,
    nome,
    imagem: `images/Cartas-${i}.png`,
    texto: descNormal,
    textoInvertido: descInvertida,
    valorCompletoNormal: i,
    valorCompletoInvertido: i + 78
  });
}

function getCardByIdBase(idBase) {
  return tarotData.find((carta) => carta.idBase === idBase) || null;
}

window.tarotData = tarotData;
window.getCardByIdBase = getCardByIdBase;