import { gameState } from "./gameState.js";
import { createBattleState } from "./battleSystem.js";
import { renderBattle } from "./battleRenderer.js";
import { cardDatabase } from "./cardDatabase.js";
import { renderCardCollection } from "./cardRenderer.js";
import { renderMainMenu } from "./ui.js";

const app = document.querySelector("#app");

function renderGameplay() {
  if (!app) {
    return;
  }

  app.replaceChildren();
  renderBattle(app, gameState.battle);
  renderCardCollection(app, cardDatabase, gameState);
}

function startGameplay({ resetBattle = false } = {}) {
  if (resetBattle || !gameState.battle) {
    gameState.battle = createBattleState(cardDatabase);
  }

  gameState.currentScreen = "gameplay";
  renderGameplay();
}

function renderMenu() {
  if (!app) {
    return;
  }

  gameState.currentScreen = "mainMenu";
  renderMainMenu(app, {
    "new-game": () => startGameplay({ resetBattle: true }),
    "continue": () => startGameplay(),
    "settings": () => {}
  });
}

if (app && gameState.currentScreen === "mainMenu") {
  gameState.battle = createBattleState(cardDatabase);
  renderMenu();
}
