import { getLocalizedCard } from "./cardLocalization.js";
import { translate } from "./i18n.js";

function getSelectedCard(cards, selectedCardId) {
  return cards.find((card) => card.id === selectedCardId) ?? cards[0];
}

function formatSpecialEffects(card, language) {
  return card.specialEffects.length > 0
    ? card.specialEffects.join(", ")
    : translate(language, "noSpecialEffects");
}

function createCardButton(card, selectedCard, language) {
  const localizedCard = getLocalizedCard(card, language);
  const button = document.createElement("button");
  button.className = "card";
  button.type = "button";
  button.dataset.cardId = card.id;
  button.setAttribute("aria-pressed", String(card.id === selectedCard.id));

  const rarity = document.createElement("span");
  rarity.className = "card__rarity";
  rarity.textContent = localizedCard.rarity;

  const name = document.createElement("strong");
  name.className = "card__name";
  name.textContent = localizedCard.name;

  const description = document.createElement("span");
  description.className = "card__description";
  description.textContent = localizedCard.description;

  const stats = document.createElement("span");
  stats.className = "card__stats";
  stats.textContent = `${card.cost} ${translate(language, "cost")} / ${card.attack} ${translate(language, "attack")} / ${card.health} ${translate(language, "health")}`;

  button.append(rarity, name, description, stats);
  return button;
}

function renderHoverPanel(panel, card, language) {
  const t = (key) => translate(language, key);
  const localizedCard = card ? getLocalizedCard(card, language) : null;
  panel.replaceChildren();

  const eyebrow = document.createElement("p");
  eyebrow.className = "card-info-panel__eyebrow";
  eyebrow.textContent = card ? t("cardInformation") : t("hoverInformation");

  const name = document.createElement("h2");
  name.className = "card-info-panel__name";
  name.textContent = localizedCard ? localizedCard.name : t("hoverCard");

  const description = document.createElement("p");
  description.className = "card-info-panel__description";
  description.textContent = card
    ? localizedCard.description
    : t("hoverCardDetails");

  const details = document.createElement("dl");
  details.className = "card-info-panel__details";

  [
    [t("cost"), card?.cost ?? "-"],
    [t("attack"), card?.attack ?? "-"],
    [t("health"), card?.health ?? "-"],
    [t("specialEffects"), card ? formatSpecialEffects(card, language) : "-"]
  ].forEach(([label, value]) => {
    const term = document.createElement("dt");
    term.textContent = label;

    const detail = document.createElement("dd");
    detail.textContent = value;

    details.append(term, detail);
  });

  panel.append(eyebrow, name, description, details);
}

function renderInspector(inspector, card, language) {
  const t = (key) => translate(language, key);
  const localizedCard = getLocalizedCard(card, language);
  inspector.replaceChildren();

  const rarity = document.createElement("p");
  rarity.className = "card-inspector__rarity";
  rarity.textContent = localizedCard.rarity;

  const name = document.createElement("h2");
  name.className = "card-inspector__name";
  name.textContent = localizedCard.name;

  const description = document.createElement("p");
  description.className = "card-inspector__description";
  description.textContent = localizedCard.description;

  const details = document.createElement("dl");
  details.className = "card-inspector__details";

  [
    ["ID", card.id],
    [t("cost"), card.cost],
    [t("attack"), card.attack],
    [t("health"), card.health]
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
  const language = gameState.settings.language;
  const t = (key) => translate(language, key);
  const section = document.createElement("section");
  section.className = "card-library";
  section.setAttribute("aria-label", "Card database");

  const heading = document.createElement("h2");
  heading.className = "card-library__title";
  heading.textContent = t("cards");

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
      grid.append(createCardButton(card, selectedCard, language));
    });
  };

  paintCards();
  renderInspector(inspector, selectedCard, language);
  renderHoverPanel(hoverPanel, null, language);

  grid.addEventListener("click", (event) => {
    const cardButton = event.target.closest("[data-card-id]");

    if (!cardButton) {
      return;
    }

    gameState.selectedCardId = cardButton.dataset.cardId;
    selectedCard = getSelectedCard(cards, gameState.selectedCardId);
    paintCards();
    renderInspector(inspector, selectedCard, language);
  });

  grid.addEventListener("mouseover", (event) => {
    const cardButton = event.target.closest("[data-card-id]");

    if (!cardButton) {
      return;
    }

    renderHoverPanel(hoverPanel, getSelectedCard(cards, cardButton.dataset.cardId), language);
  });

  grid.addEventListener("focusin", (event) => {
    const cardButton = event.target.closest("[data-card-id]");

    if (!cardButton) {
      return;
    }

    renderHoverPanel(hoverPanel, getSelectedCard(cards, cardButton.dataset.cardId), language);
  });

  sidePanel.append(inspector, hoverPanel);
  layout.append(grid, sidePanel);
  section.append(heading, layout);
  root.append(section);
}
