const STARTING_HP = 30;
const STARTING_HAND_SIZE = 3;
const MAX_RESOURCES = 10;
const ENEMY_ATTACK = 3;

function addCombatLog(battleState, text) {
  battleState.combatLog.push(text);
}

function createDeck(cards) {
  return [...cards];
}

function drawOneCard(battleState) {
  if (battleState.deck.length === 0) {
    return;
  }

  battleState.hand.push(battleState.deck.shift());
}

export function createBattleState(cards) {
  const battleState = {
    playerHp: STARTING_HP,
    enemyHp: STARTING_HP,
    currentTurn: "player",
    turnNumber: 1,
    resources: 1,
    maxResources: 1,
    deck: createDeck(cards),
    hand: [],
    discard: [],
    combatLog: [],
    message: "Player turn. Play a card or end the turn."
  };

  addCombatLog(battleState, "Turn 1 started.");
  addCombatLog(battleState, "Player gained 1 blood.");
  drawCards(battleState, STARTING_HAND_SIZE);
  return battleState;
}

export function drawCards(battleState, amount = 1) {
  for (let index = 0; index < amount; index += 1) {
    drawOneCard(battleState);
  }
}

export function canPlayCard(battleState, cardIndex) {
  const card = battleState.hand[cardIndex];

  return Boolean(
    card &&
    battleState.currentTurn === "player" &&
    battleState.resources >= card.cost &&
    battleState.playerHp > 0 &&
    battleState.enemyHp > 0
  );
}

export function playCard(battleState, cardIndex) {
  if (!canPlayCard(battleState, cardIndex)) {
    battleState.message = "Not enough resources, or it is not the player's turn.";
    return;
  }

  const [card] = battleState.hand.splice(cardIndex, 1);
  battleState.resources -= card.cost;
  battleState.enemyHp = Math.max(0, battleState.enemyHp - card.attack);
  battleState.discard.push(card);
  battleState.message = `${card.name} dealt ${card.attack} damage.`;
  addCombatLog(battleState, `${card.name} was played.`);
  addCombatLog(battleState, `${card.name} dealt ${card.attack} damage.`);
  addCombatLog(battleState, `${card.name} was destroyed.`);

  if (battleState.enemyHp === 0) {
    battleState.message = "Enemy defeated.";
    addCombatLog(battleState, "Enemy NPC was destroyed.");
  }
}

export function endPlayerTurn(battleState) {
  if (battleState.currentTurn !== "player" || battleState.playerHp === 0 || battleState.enemyHp === 0) {
    return;
  }

  battleState.currentTurn = "enemy";
  battleState.message = "Enemy turn.";
  addCombatLog(battleState, "Player turn ended.");
  addCombatLog(battleState, "Enemy NPC turn started.");
}

export function resolveEnemyTurn(battleState) {
  if (battleState.currentTurn !== "enemy" || battleState.playerHp === 0 || battleState.enemyHp === 0) {
    return;
  }

  battleState.playerHp = Math.max(0, battleState.playerHp - ENEMY_ATTACK);
  battleState.message = `Enemy dealt ${ENEMY_ATTACK} damage.`;
  addCombatLog(battleState, `Enemy NPC dealt ${ENEMY_ATTACK} damage.`);

  if (battleState.playerHp === 0) {
    battleState.message = "Player defeated.";
    addCombatLog(battleState, "Player was destroyed.");
    return;
  }

  battleState.turnNumber += 1;
  battleState.currentTurn = "player";
  addCombatLog(battleState, "Enemy NPC turn ended.");
  addCombatLog(battleState, `Turn ${battleState.turnNumber} started.`);
  const previousMaxResources = battleState.maxResources;
  battleState.maxResources = Math.min(MAX_RESOURCES, battleState.maxResources + 1);
  battleState.resources = battleState.maxResources;
  if (battleState.maxResources > previousMaxResources) {
    addCombatLog(battleState, "Player gained 1 blood.");
  }
  drawCards(battleState, 1);
}
