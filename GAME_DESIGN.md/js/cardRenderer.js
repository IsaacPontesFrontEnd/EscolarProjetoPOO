function getSelectedCard(cards, selectedCardId) {
  return cards.find((card) => card.id === selectedCardId) ?? cards[0];
}

function formatSpecialEffects(card) {
  return card.specialEffects.length > 0
    ? card.specialEffects.join(", ")
    : "No special effects.";
}

function createCardButton(card, selectedCard) {
  const button = document.createElement("button");
  button.className = "card";
  button.type = "button";
  button.dataset.cardId = card.id;
  button.setAttribute("aria-pressed", String(card.id === selectedCard.id));

  const rarity = document.createElement("span");
  rarity.className = "card__rarity";
  rarity.textContent = card.rarity;

  const name = document.createElement("strong");
  name.className = "card__name";
  name.textContent = card.name;

  const description = document.createElement("span");
  description.className = "card__description";
  description.textContent = card.description;

  const stats = document.createElement("span");
  stats.className = "card__stats";
  stats.textContent = `${card.cost} Cost / ${card.attack} ATK / ${card.health} HP`;

  button.append(rarity, name, description, stats);
  return button;
}

function renderHoverPanel(panel, card) {
  panel.replaceChildren();

  const eyebrow = document.createElement("p");
  eyebrow.className = "card-info-panel__eyebrow";
  eyebrow.textContent = card ? "Card Information" : "Hover Information";

  const name = document.createElement("h2");
  name.className = "card-info-panel__name";
  name.textContent = card ? card.name : "Hover a card";

  const description = document.createElement("p");
  description.className = "card-info-panel__description";
  description.textContent = card
    ? card.description
    : "Card details will appear here while the pointer is over a card.";

  const details = document.createElement("dl");
  details.className = "card-info-panel__details";

  [
    ["Cost", card?.cost ?? "-"],
    ["Attack", card?.attack ?? "-"],
    ["Health", card?.health ?? "-"],
    ["Special effects", card ? formatSpecialEffects(card) : "-"]
  ].forEach(([label, value]) => {
    const term = document.createElement("dt");
    term.textContent = label;

    const detail = document.createElement("dd");
    detail.textContent = value;

    details.append(term, detail);
  });

  panel.append(eyebrow, name, description, details);
}

function renderInspector(inspector, card) {
  inspector.replaceChildren();

  const rarity = document.createElement("p");
  rarity.className = "card-inspector__rarity";
  rarity.textContent = card.rarity;

  const name = document.createElement("h2");
  name.className = "card-inspector__name";
  name.textContent = card.name;

  const description = document.createElement("p");
  description.className = "card-inspector__description";
  description.textContent = card.description;

  const details = document.createElement("dl");
  details.className = "card-inspector__details";

  [
    ["ID", card.id],
    ["Cost", card.cost],
    ["Attack", card.attack],
    ["Health", card.health]
  ].forEach(([label, value]) => {
    const term = document.createElement("dt");
    term.textContent = label;

    const detail = document.createElement("dd");
    detail.textContent = value;

    details.append(term, detail);
  });

  inspector.append(rarity, name, description, details);
}

export function renderCardCollection(root, cards, gameState) {
  const section = document.createElement("section");
  section.className = "card-library";
  section.setAttribute("aria-label", "Card database");

  const heading = document.createElement("h2");
  heading.className = "card-library__title";
  heading.textContent = "Cards";

  const layout = document.createElement("div");
  layout.className = "card-library__layout";

  const grid = document.createElement("div");
  grid.className = "card-library__grid";

  const inspector = document.createElement("aside");
  inspector.className = "card-inspector";
  inspector.setAttribute("aria-live", "polite");

  const hoverPanel = document.createElement("aside");
  hoverPanel.className = "card-info-panel";
  hoverPanel.setAttribute("aria-live", "polite");

  const sidePanel = document.createElement("div");
  sidePanel.className = "card-library__side-panel";

  let selectedCard = getSelectedCard(cards, gameState.selectedCardId);

  const paintCards = () => {
    grid.replaceChildren();
    cards.forEach((card) => {
      grid.append(createCardButton(card, selectedCard));
    });
  };

  paintCards();
  renderInspector(inspector, selectedCard);
  renderHoverPanel(hoverPanel);

  grid.addEventListener("click", (event) => {
    const cardButton = event.target.closest("[data-card-id]");

    if (!cardButton) {
      return;
    }

    gameState.selectedCardId = cardButton.dataset.cardId;
    selectedCard = getSelectedCard(cards, gameState.selectedCardId);
    paintCards();
    renderInspector(inspector, selectedCard);
  });

  grid.addEventListener("mouseover", (event) => {
    const cardButton = event.target.closest("[data-card-id]");

    if (!cardButton) {
      return;
    }

    renderHoverPanel(hoverPanel, getSelectedCard(cards, cardButton.dataset.cardId));
  });

  grid.addEventListener("focusin", (event) => {
    const cardButton = event.target.closest("[data-card-id]");

    if (!cardButton) {
      return;
    }

    renderHoverPanel(hoverPanel, getSelectedCard(cards, cardButton.dataset.cardId));
  });

  sidePanel.append(inspector, hoverPanel);
  layout.append(grid, sidePanel);
  section.append(heading, layout);
  root.append(section);
}
