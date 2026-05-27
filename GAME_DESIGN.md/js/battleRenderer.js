import {
  canPlayCard,
  endPlayerTurn,
  playCard,
  queueVisualEvent,
  resolveEnemyTurn
} from "./battleSystem.js";
import { getLocalizedCard } from "./cardLocalization.js";
import { translate } from "./i18n.js";
import { localizeBattleText } from "./messageLocalization.js";

function getEvents(visualEvents, type, target) {
  return visualEvents.filter((event) => event.type === type && event.target === target);
}

function createStat(label, value, key, visualEvents) {
  const item = document.createElement("div");
  item.className = "battle-stat";

  const damageEvents = getEvents(visualEvents, "damage", key);
  const resourceEvents = getEvents(visualEvents, "resource", key);

  if (damageEvents.length > 0) {
    item.classList.add("battle-stat--hit");
  }

  if (resourceEvents.length > 0) {
    item.classList.add("battle-stat--gain");
  }

  const statLabel = document.createElement("span");
  statLabel.className = "battle-stat__label";
  statLabel.textContent = label;

  const statValue = document.createElement("strong");
  statValue.className = "battle-stat__value";
  statValue.textContent = value;

  item.append(statLabel, statValue);

  if (key === "player" || key === "enemy") {
    const bar = document.createElement("span");
    bar.className = "battle-stat__bar";

    const fill = document.createElement("span");
    fill.className = "battle-stat__bar-fill";
    fill.style.width = `${Math.max(0, Math.min(100, (Number(value) / 30) * 100))}%`;

    bar.append(fill);
    item.append(bar);
  }

  damageEvents.forEach((event) => {
    const number = document.createElement("span");
    number.className = "feedback-number feedback-number--damage";
    number.textContent = `-${event.amount}`;
    item.append(number);
  });

  resourceEvents.forEach((event) => {
    const number = document.createElement("span");
    number.className = "feedback-number feedback-number--gain";
    number.textContent = `+${event.amount}`;
    item.append(number);
  });

  return item;
}

function createHandCard(card, index, battleState, language) {
  const localizedCard = getLocalizedCard(card, language);
  const button = document.createElement("button");
  button.className = "battle-card";
  button.type = "button";
  button.dataset.handIndex = String(index);
  button.disabled = !canPlayCard(battleState, index);

  const name = document.createElement("strong");
  name.className = "battle-card__name";
  name.textContent = localizedCard.name;

  const description = document.createElement("span");
  description.className = "battle-card__description";
  description.textContent = localizedCard.description;

  const stats = document.createElement("span");
  stats.className = "battle-card__stats";
  stats.textContent = `${card.cost} ${translate(language, "cost")} / ${card.attack} ${translate(language, "attack")} / ${card.health} ${translate(language, "health")}`;

  button.append(name, description, stats);
  return button;
}

function createLastPlayedCard(card, visualEvents, t, language) {
  const panel = document.createElement("aside");
  panel.className = "battle-played-card";
  panel.setAttribute("aria-label", "Last played card");

  if (!card) {
    panel.textContent = t("noCardPlayed");
    return panel;
  }
  const localizedCard = getLocalizedCard(card, language);

  const affected = visualEvents.some((event) => event.cardId === card.id);
  if (affected) {
    panel.classList.add("battle-played-card--affected");
  }

  const label = document.createElement("span");
  label.className = "battle-played-card__label";
  label.textContent = t("lastPlayed");

  const name = document.createElement("strong");
  name.className = "battle-played-card__name";
  name.textContent = localizedCard.name;

  const text = document.createElement("span");
  text.className = "battle-played-card__text";
  text.textContent = `${card.attack} ${t("damageToEnemy")}`;

  panel.append(label, name, text);
  return panel;
}

function createCombatLog(logEntries, t, language, cardNameMap) {
  const log = document.createElement("section");
  log.className = "combat-log";
  log.setAttribute("aria-label", "Combat log");

  const title = document.createElement("h3");
  title.className = "combat-log__title";
  title.textContent = t("combatLog");

  const list = document.createElement("ol");
  list.className = "combat-log__list";

  logEntries.forEach((entry) => {
    const item = document.createElement("li");
    item.className = "combat-log__entry";
    item.textContent = localizeBattleText(entry, language, cardNameMap);
    list.append(item);
  });

  log.append(title, list);
  return log;
}

function getBattleResult(battleState) {
  if (battleState.enemyHp === 0) {
    return "victory";
  }

  if (battleState.playerHp === 0) {
    return "defeat";
  }

  return null;
}

function getTurnLabel(turn, t) {
  return turn === "player" ? t("turnPlayer") : t("turnEnemy");
}

export function renderBattle(root, battleState, options = {}) {
  const language = options.language ?? "en";
  const t = (key) => translate(language, key);
  const cardNameMap = Object.fromEntries(
    battleState.deck
      .concat(battleState.hand, battleState.discard)
      .map((card) => [card.name, getLocalizedCard(card, language).name])
  );
  const section = document.createElement("section");
  section.className = "battle";
  section.setAttribute("aria-label", "Battle system");
  let battleEndNotified = false;

  const notifyBattleEnd = () => {
    const result = getBattleResult(battleState);

    if (result && !battleEndNotified) {
      battleEndNotified = true;
      window.setTimeout(() => options.onBattleEnd?.(result), 900);
    }
  };

  const render = () => {
    const visualEvents = [...battleState.visualEvents];
    battleState.visualEvents = [];
    section.replaceChildren();

    const heading = document.createElement("h2");
    heading.className = "battle__title";
    heading.textContent = t("battle");

    const stats = document.createElement("div");
    stats.className = "battle__stats";
    stats.append(
      createStat(t("currentTurn"), `${battleState.turnNumber} - ${getTurnLabel(battleState.currentTurn, t)}`, "turn", visualEvents),
      createStat(t("currentBlood"), `${battleState.resources}/${battleState.maxResources}`, "resources", visualEvents),
      createStat(t("playerHp"), battleState.playerHp, "player", visualEvents),
      createStat(t("enemyHp"), battleState.enemyHp, "enemy", visualEvents)
    );

    const message = document.createElement("p");
    message.className = "battle__message";
    message.textContent = localizeBattleText(battleState.message, language, cardNameMap);

    const controls = document.createElement("div");
    controls.className = "battle__controls";

    const drawButton = document.createElement("button");
    drawButton.className = "battle__button";
    drawButton.type = "button";
    drawButton.dataset.action = "draw";
    drawButton.disabled = battleState.currentTurn !== "player" || battleState.deck.length === 0;
    drawButton.textContent = `${t("drawCard")} (${battleState.deck.length})`;

    const endTurnButton = document.createElement("button");
    endTurnButton.className = "battle__button battle__button--primary";
    endTurnButton.type = "button";
    endTurnButton.dataset.action = "end-turn";
    endTurnButton.disabled = battleState.currentTurn !== "player";
    endTurnButton.textContent = t("endTurn");

    controls.append(drawButton, endTurnButton);

    const handTitle = document.createElement("h3");
    handTitle.className = "battle__hand-title";
    handTitle.textContent = t("hand");

    const hand = document.createElement("div");
    hand.className = "battle__hand";
    if (getEvents(visualEvents, "card-placement", "hand").length > 0) {
      hand.classList.add("battle__hand--placement");
    }

    battleState.hand.forEach((card, index) => {
      hand.append(createHandCard(card, index, battleState, language));
    });

    if (battleState.hand.length === 0) {
      const empty = document.createElement("p");
      empty.className = "battle__empty";
      empty.textContent = t("noCards");
      hand.append(empty);
    }

    section.append(
      heading,
      stats,
      message,
      controls,
      createLastPlayedCard(battleState.lastPlayedCard, visualEvents, t, language),
      handTitle,
      hand,
      createCombatLog(battleState.combatLog, t, language, cardNameMap)
    );
  };

  section.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-action]");
    const cardButton = event.target.closest("[data-hand-index]");

    if (cardButton) {
      playCard(battleState, Number(cardButton.dataset.handIndex));
      render();
      notifyBattleEnd();
      return;
    }

    if (!actionButton) {
      return;
    }

    if (actionButton.dataset.action === "draw") {
      battleState.deck.length > 0 && battleState.hand.push(battleState.deck.shift());
      queueVisualEvent(battleState, { type: "card-placement", target: "hand" });
      battleState.message = "Drew a card.";
      render();
      return;
    }

    if (actionButton.dataset.action === "end-turn") {
      endPlayerTurn(battleState);
      render();
      window.setTimeout(() => {
        resolveEnemyTurn(battleState);
        render();
        notifyBattleEnd();
      }, 500);
    }
  });

  render();
  notifyBattleEnd();
  root.append(section);
}
