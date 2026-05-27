import { getLocalizedCard } from "./cardLocalization.js";
import { translate } from "./i18n.js";

function createDeckCard(card, language) {
  const localizedCard = getLocalizedCard(card, language);
  const item = document.createElement("button");
  item.className = "safe-deck-card";
  item.type = "button";
  item.dataset.cardId = card.id;

  const name = document.createElement("strong");
  name.className = "safe-deck-card__name";
  name.textContent = localizedCard.name;

  const details = document.createElement("span");
  details.className = "safe-deck-card__details";
  details.textContent = `${card.cost} ${translate(language, "cost")} / ${card.attack} ${translate(language, "attack")} / ${card.health} ${translate(language, "health")}`;

  item.append(name, details);
  return item;
}

function renderDeckInspector(root, card, t, language) {
  const localizedCard = getLocalizedCard(card, language);
  root.replaceChildren();

  const label = document.createElement("p");
  label.className = "safe-panel__eyebrow";
  label.textContent = t("selectedCard");

  const name = document.createElement("h3");
  name.className = "safe-panel__heading";
  name.textContent = localizedCard.name;

  const description = document.createElement("p");
  description.className = "safe-panel__text";
  description.textContent = localizedCard.description;

  const stats = document.createElement("p");
  stats.className = "safe-panel__text";
  stats.textContent = `${localizedCard.rarity} / ${card.cost} ${t("cost")} / ${card.attack} ${t("attack")} / ${card.health} ${t("health")}`;

  root.append(label, name, description, stats);
}

export function renderSafeArea(root, cards, gameState, actions = {}) {
  const language = gameState.settings.language;
  const t = (key) => translate(language, key);
  const section = document.createElement("section");
  section.className = "safe-area";
  section.setAttribute("aria-label", "Safe area");

  const header = document.createElement("header");
  header.className = "safe-area__header";

  const title = document.createElement("h1");
  title.className = "safe-area__title";
  title.textContent = t("safeArea");

  const subtitle = document.createElement("p");
  subtitle.className = "safe-area__subtitle";
  subtitle.textContent = t("safeSubtitle");

  header.append(title, subtitle);

  const layout = document.createElement("div");
  layout.className = "safe-area__layout";

  const deckPanel = document.createElement("section");
  deckPanel.className = "safe-panel safe-panel--deck";
  deckPanel.setAttribute("aria-label", "Deck management");

  const deckTitle = document.createElement("h2");
  deckTitle.className = "safe-panel__title";
  deckTitle.textContent = t("deckManagement");

  const deckSummary = document.createElement("p");
  deckSummary.className = "safe-panel__text";
  deckSummary.textContent = `${cards.length} ${t("deckReady")}`;

  const deckList = document.createElement("div");
  deckList.className = "safe-deck-list";

  const inspector = document.createElement("aside");
  inspector.className = "safe-deck-inspector";
  inspector.setAttribute("aria-live", "polite");

  let selectedCard = cards.find((card) => card.id === gameState.selectedCardId) ?? cards[0];

  cards.forEach((card) => {
    deckList.append(createDeckCard(card, language));
  });

  renderDeckInspector(inspector, selectedCard, t, language);

  deckList.addEventListener("click", (event) => {
    const cardButton = event.target.closest("[data-card-id]");

    if (!cardButton) {
      return;
    }

    gameState.selectedCardId = cardButton.dataset.cardId;
    selectedCard = cards.find((card) => card.id === gameState.selectedCardId) ?? cards[0];
    renderDeckInspector(inspector, selectedCard, t, language);
  });

  deckPanel.append(deckTitle, deckSummary, deckList, inspector);

  const npcPanel = document.createElement("section");
  npcPanel.className = "safe-panel";
  npcPanel.setAttribute("aria-label", "NPC placeholder");

  const npcTitle = document.createElement("h2");
  npcTitle.className = "safe-panel__title";
  npcTitle.textContent = t("keeper");

  const npcText = document.createElement("p");
  npcText.className = "safe-panel__text";
  npcText.textContent = t("keeperText");

  npcPanel.append(npcTitle, npcText);

  const lorePanel = document.createElement("section");
  lorePanel.className = "safe-panel";
  lorePanel.setAttribute("aria-label", "Lore panel");

  const loreTitle = document.createElement("h2");
  loreTitle.className = "safe-panel__title";
  loreTitle.textContent = t("lore");

  const loreText = document.createElement("p");
  loreText.className = "safe-panel__text";
  loreText.textContent = t("loreText");

  lorePanel.append(loreTitle, loreText);

  const transitionPanel = document.createElement("section");
  transitionPanel.className = "safe-panel safe-panel--transition";

  const transitionText = document.createElement("p");
  transitionText.className = "safe-panel__text";
  transitionText.textContent = t("transitionText");

  const transitionButton = document.createElement("button");
  transitionButton.className = "safe-area__button";
  transitionButton.type = "button";
  transitionButton.textContent = t("enterShadowWorld");
  transitionButton.addEventListener("click", () => {
    actions.enterShadowWorld?.();
  });

  transitionPanel.append(transitionText, transitionButton);

  layout.append(deckPanel, npcPanel, lorePanel, transitionPanel);
  section.append(header, layout);
  root.replaceChildren(section);
}
