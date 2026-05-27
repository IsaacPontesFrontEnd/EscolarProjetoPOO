import {
  canPlayCard,
  endPlayerTurn,
  playCard,
  resolveEnemyTurn
} from "./battleSystem.js";

function createStat(label, value) {
  const item = document.createElement("div");
  item.className = "battle-stat";

  const statLabel = document.createElement("span");
  statLabel.className = "battle-stat__label";
  statLabel.textContent = label;

  const statValue = document.createElement("strong");
  statValue.className = "battle-stat__value";
  statValue.textContent = value;

  item.append(statLabel, statValue);
  return item;
}

function createHandCard(card, index, battleState) {
  const button = document.createElement("button");
  button.className = "battle-card";
  button.type = "button";
  button.dataset.handIndex = String(index);
  button.disabled = !canPlayCard(battleState, index);

  const name = document.createElement("strong");
  name.className = "battle-card__name";
  name.textContent = card.name;

  const description = document.createElement("span");
  description.className = "battle-card__description";
  description.textContent = card.description;

  const stats = document.createElement("span");
  stats.className = "battle-card__stats";
  stats.textContent = `${card.cost} Cost / ${card.attack} ATK / ${card.health} HP`;

  button.append(name, description, stats);
  return button;
}

function createCombatLog(logEntries) {
  const log = document.createElement("section");
  log.className = "combat-log";
  log.setAttribute("aria-label", "Combat log");

  const title = document.createElement("h3");
  title.className = "combat-log__title";
  title.textContent = "Combat Log";

  const list = document.createElement("ol");
  list.className = "combat-log__list";

  logEntries.forEach((entry) => {
    const item = document.createElement("li");
    item.className = "combat-log__entry";
    item.textContent = entry;
    list.append(item);
  });

  log.append(title, list);
  return log;
}

export function renderBattle(root, battleState) {
  const section = document.createElement("section");
  section.className = "battle";
  section.setAttribute("aria-label", "Battle system");

  const render = () => {
    section.replaceChildren();

    const heading = document.createElement("h2");
    heading.className = "battle__title";
    heading.textContent = "Battle";

    const stats = document.createElement("div");
    stats.className = "battle__stats";
    stats.append(
      createStat("Current Turn", `${battleState.turnNumber} - ${battleState.currentTurn}`),
      createStat("Current Blood", `${battleState.resources}/${battleState.maxResources}`),
      createStat("Player HP", battleState.playerHp),
      createStat("Enemy NPC HP", battleState.enemyHp)
    );

    const message = document.createElement("p");
    message.className = "battle__message";
    message.textContent = battleState.message;

    const controls = document.createElement("div");
    controls.className = "battle__controls";

    const drawButton = document.createElement("button");
    drawButton.className = "battle__button";
    drawButton.type = "button";
    drawButton.dataset.action = "draw";
    drawButton.disabled = battleState.currentTurn !== "player" || battleState.deck.length === 0;
    drawButton.textContent = `Draw Card (${battleState.deck.length})`;

    const endTurnButton = document.createElement("button");
    endTurnButton.className = "battle__button battle__button--primary";
    endTurnButton.type = "button";
    endTurnButton.dataset.action = "end-turn";
    endTurnButton.disabled = battleState.currentTurn !== "player";
    endTurnButton.textContent = "End Turn";

    controls.append(drawButton, endTurnButton);

    const handTitle = document.createElement("h3");
    handTitle.className = "battle__hand-title";
    handTitle.textContent = "Hand";

    const hand = document.createElement("div");
    hand.className = "battle__hand";

    battleState.hand.forEach((card, index) => {
      hand.append(createHandCard(card, index, battleState));
    });

    if (battleState.hand.length === 0) {
      const empty = document.createElement("p");
      empty.className = "battle__empty";
      empty.textContent = "No cards in hand.";
      hand.append(empty);
    }

    section.append(heading, stats, message, controls, handTitle, hand, createCombatLog(battleState.combatLog));
  };

  section.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-action]");
    const cardButton = event.target.closest("[data-hand-index]");

    if (cardButton) {
      playCard(battleState, Number(cardButton.dataset.handIndex));
      render();
      return;
    }

    if (!actionButton) {
      return;
    }

    if (actionButton.dataset.action === "draw") {
      battleState.deck.length > 0 && battleState.hand.push(battleState.deck.shift());
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
      }, 500);
    }
  });

  render();
  root.append(section);
}
