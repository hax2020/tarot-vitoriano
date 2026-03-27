document.addEventListener("DOMContentLoaded", () => {
  const MAX_SLOTS = 5;

  const playerNameInput = document.getElementById("playerName");
  const charNameInput = document.getElementById("charName");
  const areteValueInput = document.getElementById("areteValue");
  const btnDrawAll = document.getElementById("btnDrawAll");
  const btnClearAll = document.getElementById("btnClearAll");
  const cardsBoard = document.getElementById("cardsBoard");
  const actionFeedback = document.getElementById("actionFeedback");

  const manualModal = document.getElementById("manualModal");
  const manualCardIdInput = document.getElementById("manualCardId");
  const btnConfirmManual = document.getElementById("btnConfirmManual");
  const btnCancelManual = document.getElementById("btnCancelManual");

  let cardSlots = Array(MAX_SLOTS).fill(null);
  let currentManualSlotIndex = null;
  let feedbackTimeoutId = null;

  init();

  function init() {
    loadFromLocalStorage();
    bindEvents();
    renderBoard();
  }

  function bindEvents() {
    playerNameInput.addEventListener("input", saveToLocalStorage);
    charNameInput.addEventListener("input", saveToLocalStorage);

    areteValueInput.addEventListener("input", () => {
      validateArete();
      trimSlotsByArete();
      saveToLocalStorage();
      renderBoard();
    });

    btnDrawAll.addEventListener("click", sortearTodasAsCartas);
    btnClearAll.addEventListener("click", limparCartas);

    btnCancelManual.addEventListener("click", fecharModalManual);
    btnConfirmManual.addEventListener("click", confirmarInsercaoManual);

    manualModal.addEventListener("click", (event) => {
      if (event.target === manualModal) {
        fecharModalManual();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !manualModal.classList.contains("hidden")) {
        fecharModalManual();
      }
    });
  }

  function validateArete() {
    let val = parseInt(areteValueInput.value, 10);

    if (Number.isNaN(val)) val = 1;
    if (val < 1) val = 1;
    if (val > 5) val = 5;

    areteValueInput.value = val;
    return val;
  }

  function getArete() {
    return validateArete();
  }

  function trimSlotsByArete() {
    const arete = getArete();
    for (let i = arete; i < MAX_SLOTS; i++) {
      cardSlots[i] = null;
    }
  }

  function loadFromLocalStorage() {
    const savedPlayer = localStorage.getItem("tarot_playerName");
    const savedChar = localStorage.getItem("tarot_charName");
    const savedArete = localStorage.getItem("tarot_areteValue");

    if (savedPlayer !== null) playerNameInput.value = savedPlayer;
    if (savedChar !== null) charNameInput.value = savedChar;
    if (savedArete !== null) areteValueInput.value = savedArete;

    validateArete();
    trimSlotsByArete();
  }

  function saveToLocalStorage() {
    localStorage.setItem("tarot_playerName", playerNameInput.value.trim());
    localStorage.setItem("tarot_charName", charNameInput.value.trim());
    localStorage.setItem("tarot_areteValue", String(getArete()));
  }

  function showFeedback(message) {
    actionFeedback.textContent = message;

    if (feedbackTimeoutId) {
      clearTimeout(feedbackTimeoutId);
    }

    feedbackTimeoutId = setTimeout(() => {
      actionFeedback.textContent = "";
      feedbackTimeoutId = null;
    }, 3200);
  }

  function getRandomInverted() {
    return Math.random() < 0.5;
  }

  function getUsedBaseIds(excludeSlotIndex = null) {
    return cardSlots
      .map((slot, index) => {
        if (!slot) return null;
        if (excludeSlotIndex !== null && index === excludeSlotIndex) return null;
        return slot.idBase;
      })
      .filter((id) => id !== null);
  }

  function sortearCartaVinculada(excludedBaseIds = []) {
    const disponiveis = [];

    for (let i = 1; i <= 78; i++) {
      if (!excludedBaseIds.includes(i)) {
        disponiveis.push(i);
      }
    }

    if (disponiveis.length === 0) {
      return null;
    }

    const idBase = disponiveis[Math.floor(Math.random() * disponiveis.length)];

    return {
      idBase,
      isInverted: getRandomInverted()
    };
  }

  function sortearTodasAsCartas() {
    const arete = getArete();
    const usadas = [];

    for (let i = 0; i < arete; i++) {
      const carta = sortearCartaVinculada(usadas);

      if (carta) {
        cardSlots[i] = carta;
        usadas.push(carta.idBase);
      } else {
        cardSlots[i] = null;
      }
    }

    for (let i = arete; i < MAX_SLOTS; i++) {
      cardSlots[i] = null;
    }

    showFeedback("Leitura revelada sob o véu do tempo.");
    renderBoard();
  }

  function limparCartas() {
    cardSlots = Array(MAX_SLOTS).fill(null);
    showFeedback("Lâminas recolhidas ao baralho.");
    renderBoard();
  }

  function inserirCartaManual(slotIndex, numero) {
    if (slotIndex < 0 || slotIndex >= MAX_SLOTS) return;
    if (numero < 1 || numero > 156) return;

    let idBase = numero;
    let isInverted = false;

    if (numero > 78) {
      idBase = numero - 78;
      isInverted = true;
    }

    const duplicada = cardSlots.some((slot, index) => {
      if (!slot || index === slotIndex) return false;
      return slot.idBase === idBase;
    });

    if (duplicada) {
      showFeedback("Essa lâmina já está presente na leitura.");
      return;
    }

    cardSlots[slotIndex] = { idBase, isInverted };
    showFeedback(`Lâmina ${numero} inserida na posição ${slotIndex + 1}.`);
    renderBoard();
  }

  function sortearSlot(slotIndex) {
    const arete = getArete();
    if (slotIndex >= arete) return;

    const usadas = getUsedBaseIds(slotIndex);
    const carta = sortearCartaVinculada(usadas);

    if (!carta) {
      showFeedback("Não há mais lâminas disponíveis para esta leitura.");
      return;
    }

    cardSlots[slotIndex] = carta;
    showFeedback(`Nova lâmina sorteada para a posição ${slotIndex + 1}.`);
    renderBoard();
  }

  function descartarSlot(slotIndex) {
    const arete = getArete();
    if (slotIndex >= arete) return;

    cardSlots[slotIndex] = null;
    showFeedback(`Posição ${slotIndex + 1} esvaziada.`);
    renderBoard();
  }

  function abrirManual(slotIndex) {
    currentManualSlotIndex = slotIndex;
    manualCardIdInput.value = "1";
    manualModal.classList.remove("hidden");
    manualModal.setAttribute("aria-hidden", "false");
    manualCardIdInput.focus();
    manualCardIdInput.select();
  }

  function fecharModalManual() {
    manualModal.classList.add("hidden");
    manualModal.setAttribute("aria-hidden", "true");
    currentManualSlotIndex = null;
  }

  function confirmarInsercaoManual() {
    const val = parseInt(manualCardIdInput.value, 10);

    if (Number.isNaN(val) || val < 1 || val > 156 || currentManualSlotIndex === null) {
      alert("Por favor, insira um valor válido entre 1 e 156.");
      return;
    }

    inserirCartaManual(currentManualSlotIndex, val);
    fecharModalManual();
  }

  function createEmptySlot(slotIndex) {
    const slotEl = document.createElement("section");
    slotEl.className = "card-slot";

    const header = document.createElement("div");
    header.className = "slot-header";
    header.textContent = `Posição ${slotIndex + 1}`;
    slotEl.appendChild(header);

    const emptyCard = document.createElement("div");
    emptyCard.className = "card-container is-empty";

    const emptyInner = document.createElement("div");
    emptyInner.className = "card-inner";

    const emptyBack = document.createElement("div");
    emptyBack.className = "card-face card-back";
    emptyBack.style.opacity = "0.35";

    emptyInner.appendChild(emptyBack);
    emptyCard.appendChild(emptyInner);
    slotEl.appendChild(emptyCard);

    const infoDiv = document.createElement("div");
    infoDiv.className = "card-info";

    const nameDiv = document.createElement("div");
    nameDiv.className = "card-name";
    nameDiv.textContent = "Lâmina Oculta";

    const stateDiv = document.createElement("div");
    stateDiv.className = "card-state";
    stateDiv.textContent = "Aguardando revelação";

    const descDiv = document.createElement("div");
    descDiv.className = "card-desc";
    descDiv.textContent = "Sortear, inserir manualmente ou deixar o destino escolher pela leitura.";

    infoDiv.appendChild(nameDiv);
    infoDiv.appendChild(stateDiv);
    infoDiv.appendChild(descDiv);
    slotEl.appendChild(infoDiv);

    slotEl.appendChild(createActions(slotIndex));
    return slotEl;
  }

  function createFilledSlot(slotIndex, slotData) {
    const cardRef = window.getCardByIdBase(slotData.idBase);

    if (!cardRef) {
      return createEmptySlot(slotIndex);
    }

    const slotEl = document.createElement("section");
    slotEl.className = "card-slot";

    const header = document.createElement("div");
    header.className = "slot-header";
    header.textContent = `Posição ${slotIndex + 1}`;
    slotEl.appendChild(header);

    const cardContainer = document.createElement("div");
    cardContainer.className = `card-container ${slotData.isInverted ? "revealed-inverted" : "revealed-normal"}`;

    const cardInner = document.createElement("div");
    cardInner.className = "card-inner";

    const cardBack = document.createElement("div");
    cardBack.className = "card-face card-back";

    const cardFront = document.createElement("div");
    cardFront.className = "card-face card-front";

    const img = document.createElement("img");
    img.src = cardRef.imagem;
    img.alt = cardRef.nome;
    img.draggable = false;
    img.loading = "lazy";

    img.onerror = () => {
      console.warn(`Imagem não encontrada: ${cardRef.imagem}`);
    };

    cardFront.appendChild(img);
    cardInner.appendChild(cardBack);
    cardInner.appendChild(cardFront);
    cardContainer.appendChild(cardInner);
    slotEl.appendChild(cardContainer);

    const infoDiv = document.createElement("div");
    infoDiv.className = "card-info";

    const nameDiv = document.createElement("div");
    nameDiv.className = "card-name";
    nameDiv.textContent = cardRef.nome;

    const stateDiv = document.createElement("div");
    stateDiv.className = "card-state";
    stateDiv.textContent = slotData.isInverted ? "Posição Invertida" : "Posição Normal";

    const descDiv = document.createElement("div");
    descDiv.className = "card-desc";
    descDiv.textContent = slotData.isInverted ? cardRef.textoInvertido : cardRef.texto;

    infoDiv.appendChild(nameDiv);
    infoDiv.appendChild(stateDiv);
    infoDiv.appendChild(descDiv);
    slotEl.appendChild(infoDiv);

    slotEl.appendChild(createActions(slotIndex));
    return slotEl;
  }

  function createActions(slotIndex) {
    const actionsDiv = document.createElement("div");
    actionsDiv.className = "slot-actions";

    const btnSort = document.createElement("button");
    btnSort.type = "button";
    btnSort.className = "btn-secondary btn-small";
    btnSort.textContent = "Sortear";
    btnSort.addEventListener("click", () => sortearSlot(slotIndex));

    const btnManual = document.createElement("button");
    btnManual.type = "button";
    btnManual.className = "btn-secondary btn-small";
    btnManual.textContent = "Inserir";
    btnManual.addEventListener("click", () => abrirManual(slotIndex));

    const btnDiscard = document.createElement("button");
    btnDiscard.type = "button";
    btnDiscard.className = "btn-secondary btn-small";
    btnDiscard.textContent = "Descartar";
    btnDiscard.addEventListener("click", () => descartarSlot(slotIndex));

    actionsDiv.appendChild(btnSort);
    actionsDiv.appendChild(btnManual);
    actionsDiv.appendChild(btnDiscard);

    return actionsDiv;
  }

  function renderBoard() {
    const arete = getArete();
    cardsBoard.innerHTML = "";

    for (let i = 0; i < arete; i++) {
      const slotData = cardSlots[i];
      const slotEl = slotData ? createFilledSlot(i, slotData) : createEmptySlot(i);
      cardsBoard.appendChild(slotEl);
    }
  }
});
