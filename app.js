document.addEventListener("DOMContentLoaded", () => {
  const MAX_PLAYERS = 5;
  const MIN_PLAYERS = 1;
  const MAX_SLOTS = 5;

  const playersBoard = document.getElementById("playersBoard");
  const tableFeedback = document.getElementById("tableFeedback");

  const btnAddPlayer = document.getElementById("btnAddPlayer");
  const btnRemovePlayer = document.getElementById("btnRemovePlayer");
  const btnClearTable = document.getElementById("btnClearTable");

  const manualModal = document.getElementById("manualModal");
  const manualCardIdInput = document.getElementById("manualCardId");
  const btnConfirmManual = document.getElementById("btnConfirmManual");
  const btnCancelManual = document.getElementById("btnCancelManual");

  let leituras = [];
  let currentManualTarget = null;
  let feedbackTimeoutId = null;

  init();

  function init() {
    loadTableFromLocalStorage();
    bindEvents();
    renderTable();
  }

  function bindEvents() {
    btnAddPlayer.addEventListener("click", adicionarJogador);
    btnRemovePlayer.addEventListener("click", removerUltimoJogador);
    btnClearTable.addEventListener("click", limparMesa);

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

  function createEmptyReading(index) {
    return {
      id: `player-${Date.now()}-${index}-${Math.random().toString(16).slice(2, 8)}`,
      jogador: "",
      personagem: "",
      arete: 3,
      cardSlots: Array(MAX_SLOTS).fill(null)
    };
  }

  function normalizeArete(value) {
    let val = parseInt(value, 10);
    if (Number.isNaN(val)) val = 1;
    if (val < 1) val = 1;
    if (val > 5) val = 5;
    return val;
  }

  function normalizeReading(raw, index) {
    const arete = normalizeArete(raw?.arete ?? 3);

    let cardSlots = Array(MAX_SLOTS).fill(null);

    if (Array.isArray(raw?.cardSlots)) {
      cardSlots = raw.cardSlots.slice(0, MAX_SLOTS).map((slot) => {
        if (
          slot &&
          typeof slot.idBase === "number" &&
          slot.idBase >= 1 &&
          slot.idBase <= 78 &&
          typeof slot.isInverted === "boolean"
        ) {
          return {
            idBase: slot.idBase,
            isInverted: slot.isInverted
          };
        }
        return null;
      });

      while (cardSlots.length < MAX_SLOTS) {
        cardSlots.push(null);
      }
    }

    for (let i = arete; i < MAX_SLOTS; i++) {
      cardSlots[i] = null;
    }

    return {
      id: raw?.id || `player-${Date.now()}-${index}-${Math.random().toString(16).slice(2, 8)}`,
      jogador: typeof raw?.jogador === "string" ? raw.jogador : "",
      personagem: typeof raw?.personagem === "string" ? raw.personagem : "",
      arete,
      cardSlots
    };
  }

  function loadTableFromLocalStorage() {
    const saved = localStorage.getItem("tarot_multi_table");

    if (!saved) {
      leituras = [createEmptyReading(0)];
      saveTableToLocalStorage();
      return;
    }

    try {
      const parsed = JSON.parse(saved);

      if (!Array.isArray(parsed) || parsed.length === 0) {
        leituras = [createEmptyReading(0)];
        saveTableToLocalStorage();
        return;
      }

      leituras = parsed
        .slice(0, MAX_PLAYERS)
        .map((reading, index) => normalizeReading(reading, index));

      if (leituras.length < MIN_PLAYERS) {
        leituras.push(createEmptyReading(leituras.length));
      }
    } catch (error) {
      console.warn("Falha ao carregar mesa salva:", error);
      leituras = [createEmptyReading(0)];
      saveTableToLocalStorage();
    }
  }

  function saveTableToLocalStorage() {
    localStorage.setItem("tarot_multi_table", JSON.stringify(leituras));
  }

  function showFeedback(message) {
    tableFeedback.textContent = message;

    if (feedbackTimeoutId) {
      clearTimeout(feedbackTimeoutId);
    }

    feedbackTimeoutId = setTimeout(() => {
      tableFeedback.textContent = "";
      feedbackTimeoutId = null;
    }, 3200);
  }

  function adicionarJogador() {
    if (leituras.length >= MAX_PLAYERS) {
      showFeedback("A mesa já está no limite de 5 jogadores.");
      return;
    }

    leituras.push(createEmptyReading(leituras.length));
    saveTableToLocalStorage();
    renderTable();
    showFeedback("Novo jogador adicionado à mesa.");
  }

  function removerUltimoJogador() {
    if (leituras.length <= MIN_PLAYERS) {
      showFeedback("A mesa precisa manter ao menos 1 jogador.");
      return;
    }

    leituras.pop();
    saveTableToLocalStorage();
    renderTable();
    showFeedback("Último jogador removido da mesa.");
  }

  function limparMesa() {
    leituras = leituras.map((reading, index) => ({
      ...reading,
      cardSlots: Array(MAX_SLOTS).fill(null)
    }));

    saveTableToLocalStorage();
    renderTable();
    showFeedback("Todas as leituras da mesa foram limpas.");
  }

  function updatePlayerField(playerIndex, field, value) {
    if (!leituras[playerIndex]) return;

    leituras[playerIndex][field] = value;
    saveTableToLocalStorage();
  }

  function updatePlayerArete(playerIndex, value) {
    if (!leituras[playerIndex]) return;

    const normalized = normalizeArete(value);
    leituras[playerIndex].arete = normalized;

    for (let i = normalized; i < MAX_SLOTS; i++) {
      leituras[playerIndex].cardSlots[i] = null;
    }

    saveTableToLocalStorage();
    renderTable();
  }

  function getRandomInverted() {
    return Math.random() < 0.5;
  }

  function getUsedBaseIds(playerIndex, excludeSlotIndex = null) {
    return leituras[playerIndex].cardSlots
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

  function sortearTodasAsCartas(playerIndex) {
    const reading = leituras[playerIndex];
    if (!reading) return;

    const usadas = [];
    const arete = reading.arete;

    for (let i = 0; i < arete; i++) {
      const carta = sortearCartaVinculada(usadas);

      if (carta) {
        reading.cardSlots[i] = carta;
        usadas.push(carta.idBase);
      } else {
        reading.cardSlots[i] = null;
      }
    }

    for (let i = arete; i < MAX_SLOTS; i++) {
      reading.cardSlots[i] = null;
    }

    saveTableToLocalStorage();
    renderTable();
    showFeedback(`Leitura do Jogador ${playerIndex + 1} revelada.`);
  }

  function limparLeitura(playerIndex) {
    const reading = leituras[playerIndex];
    if (!reading) return;

    reading.cardSlots = Array(MAX_SLOTS).fill(null);

    saveTableToLocalStorage();
    renderTable();
    showFeedback(`Leitura do Jogador ${playerIndex + 1} foi limpa.`);
  }

  function inserirCartaManual(playerIndex, slotIndex, numero) {
    const reading = leituras[playerIndex];
    if (!reading) return;
    if (slotIndex < 0 || slotIndex >= MAX_SLOTS) return;
    if (numero < 1 || numero > 156) return;
    if (slotIndex >= reading.arete) return;

    let idBase = numero;
    let isInverted = false;

    if (numero > 78) {
      idBase = numero - 78;
      isInverted = true;
    }

    const duplicada = reading.cardSlots.some((slot, index) => {
      if (!slot || index === slotIndex) return false;
      return slot.idBase === idBase;
    });

    if (duplicada) {
      showFeedback("Essa lâmina já está presente na leitura desse jogador.");
      return;
    }

    reading.cardSlots[slotIndex] = { idBase, isInverted };

    saveTableToLocalStorage();
    renderTable();
    showFeedback(`Lâmina inserida no Jogador ${playerIndex + 1}, posição ${slotIndex + 1}.`);
  }

  function sortearSlot(playerIndex, slotIndex) {
    const reading = leituras[playerIndex];
    if (!reading) return;
    if (slotIndex >= reading.arete) return;

    const usadas = getUsedBaseIds(playerIndex, slotIndex);
    const carta = sortearCartaVinculada(usadas);

    if (!carta) {
      showFeedback("Não há mais lâminas disponíveis para esta leitura.");
      return;
    }

    reading.cardSlots[slotIndex] = carta;

    saveTableToLocalStorage();
    renderTable();
    showFeedback(`Nova lâmina sorteada para Jogador ${playerIndex + 1}, posição ${slotIndex + 1}.`);
  }

  function descartarSlot(playerIndex, slotIndex) {
    const reading = leituras[playerIndex];
    if (!reading) return;
    if (slotIndex >= reading.arete) return;

    reading.cardSlots[slotIndex] = null;

    saveTableToLocalStorage();
    renderTable();
    showFeedback(`Jogador ${playerIndex + 1}, posição ${slotIndex + 1} esvaziada.`);
  }

  function abrirManual(playerIndex, slotIndex) {
    currentManualTarget = { playerIndex, slotIndex };
    manualCardIdInput.value = "1";
    manualModal.classList.remove("hidden");
    manualModal.setAttribute("aria-hidden", "false");
    manualCardIdInput.focus();
    manualCardIdInput.select();
  }

  function fecharModalManual() {
    manualModal.classList.add("hidden");
    manualModal.setAttribute("aria-hidden", "true");
    currentManualTarget = null;
  }

  function confirmarInsercaoManual() {
    const val = parseInt(manualCardIdInput.value, 10);

    if (
      Number.isNaN(val) ||
      val < 1 ||
      val > 156 ||
      !currentManualTarget
    ) {
      alert("Por favor, insira um valor válido entre 1 e 156.");
      return;
    }

    inserirCartaManual(currentManualTarget.playerIndex, currentManualTarget.slotIndex, val);
    fecharModalManual();
  }

  function createActions(playerIndex, slotIndex) {
    const actionsDiv = document.createElement("div");
    actionsDiv.className = "slot-actions";

    const btnSort = document.createElement("button");
    btnSort.type = "button";
    btnSort.className = "btn-secondary btn-small";
    btnSort.textContent = "Sortear";
    btnSort.addEventListener("click", () => sortearSlot(playerIndex, slotIndex));

    const btnManual = document.createElement("button");
    btnManual.type = "button";
    btnManual.className = "btn-secondary btn-small";
    btnManual.textContent = "Inserir";
    btnManual.addEventListener("click", () => abrirManual(playerIndex, slotIndex));

    const btnDiscard = document.createElement("button");
    btnDiscard.type = "button";
    btnDiscard.className = "btn-secondary btn-small";
    btnDiscard.textContent = "Descartar";
    btnDiscard.addEventListener("click", () => descartarSlot(playerIndex, slotIndex));

    actionsDiv.appendChild(btnSort);
    actionsDiv.appendChild(btnManual);
    actionsDiv.appendChild(btnDiscard);

    return actionsDiv;
  }

  function createEmptySlot(playerIndex, slotIndex) {
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

    slotEl.appendChild(createActions(playerIndex, slotIndex));
    return slotEl;
  }

  function createFilledSlot(playerIndex, slotIndex, slotData) {
    const cardRef = window.getCardByIdBase(slotData.idBase);

    if (!cardRef) {
      return createEmptySlot(playerIndex, slotIndex);
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

    slotEl.appendChild(createActions(playerIndex, slotIndex));
    return slotEl;
  }

  function createPlayerPanel(reading, playerIndex) {
    const panel = document.createElement("section");
    panel.className = "player-panel";

    const top = document.createElement("div");
    top.className = "player-panel-top";

    const titleWrap = document.createElement("div");
    const title = document.createElement("h3");
    title.className = "player-title";
    title.textContent = `Jogador ${playerIndex + 1}`;

    const subtitle = document.createElement("p");
    subtitle.className = "player-subtitle";
    subtitle.textContent = "Leitura individual com baralho próprio.";

    titleWrap.appendChild(title);
    titleWrap.appendChild(subtitle);
    top.appendChild(titleWrap);

    panel.appendChild(top);

    const controls = document.createElement("div");
    controls.className = "player-controls";

    const inputGroup1 = document.createElement("div");
    inputGroup1.className = "input-group";

    const label1 = document.createElement("label");
    label1.textContent = "Jogador";

    const input1 = document.createElement("input");
    input1.type = "text";
    input1.value = reading.jogador;
    input1.placeholder = "Nome do Jogador";
    input1.addEventListener("input", (event) => {
      updatePlayerField(playerIndex, "jogador", event.target.value);
    });

    inputGroup1.appendChild(label1);
    inputGroup1.appendChild(input1);

    const inputGroup2 = document.createElement("div");
    inputGroup2.className = "input-group";

    const label2 = document.createElement("label");
    label2.textContent = "Personagem";

    const input2 = document.createElement("input");
    input2.type = "text";
    input2.value = reading.personagem;
    input2.placeholder = "Nome do Personagem";
    input2.addEventListener("input", (event) => {
      updatePlayerField(playerIndex, "personagem", event.target.value);
    });

    inputGroup2.appendChild(label2);
    inputGroup2.appendChild(input2);

    const inputGroup3 = document.createElement("div");
    inputGroup3.className = "input-group input-group-small";

    const label3 = document.createElement("label");
    label3.textContent = "Areté (1–5)";

    const input3 = document.createElement("input");
    input3.type = "number";
    input3.min = "1";
    input3.max = "5";
    input3.value = reading.arete;
    input3.addEventListener("input", (event) => {
      updatePlayerArete(playerIndex, event.target.value);
    });

    inputGroup3.appendChild(label3);
    inputGroup3.appendChild(input3);

    controls.appendChild(inputGroup1);
    controls.appendChild(inputGroup2);
    controls.appendChild(inputGroup3);

    panel.appendChild(controls);

    const actionRow = document.createElement("div");
    actionRow.className = "player-actions";

    const btnDraw = document.createElement("button");
    btnDraw.type = "button";
    btnDraw.className = "btn-primary";
    btnDraw.textContent = "Sortear Cartas";
    btnDraw.addEventListener("click", () => sortearTodasAsCartas(playerIndex));

    const btnClear = document.createElement("button");
    btnClear.type = "button";
    btnClear.className = "btn-secondary";
    btnClear.textContent = "Limpar Leitura";
    btnClear.addEventListener("click", () => limparLeitura(playerIndex));

    actionRow.appendChild(btnDraw);
    actionRow.appendChild(btnClear);

    panel.appendChild(actionRow);

    const cardsGrid = document.createElement("div");
    cardsGrid.className = "cards-board";

    for (let i = 0; i < reading.arete; i++) {
      const slotData = reading.cardSlots[i];
      const slotEl = slotData
        ? createFilledSlot(playerIndex, i, slotData)
        : createEmptySlot(playerIndex, i);

      cardsGrid.appendChild(slotEl);
    }

    panel.appendChild(cardsGrid);

    return panel;
  }

  function renderTable() {
    playersBoard.innerHTML = "";

    leituras.forEach((reading, index) => {
      playersBoard.appendChild(createPlayerPanel(reading, index));
    });

    btnAddPlayer.disabled = leituras.length >= MAX_PLAYERS;
    btnRemovePlayer.disabled = leituras.length <= MIN_PLAYERS;
  }
});
