import { gameState } from "./gameState.js";
import { createBattleState } from "./battleSystem.js";
import { renderBattle } from "./battleRenderer.js";
import { cardDatabase } from "./cardDatabase.js";
import { renderCardCollection } from "./cardRenderer.js";
import { renderEndScreen } from "./endScreenRenderer.js";
import { createMapState } from "./mapSystem.js";
import { renderRoguelikeMap } from "./mapRenderer.js";
import { applyPsychologicalEvents } from "./psychologicalEvents.js";
import { renderSafeArea } from "./safeAreaRenderer.js";
import { renderSettings } from "./settingsRenderer.js";
import { translate } from "./i18n.js";
import { renderMainMenu } from "./ui.js";

const app = document.querySelector("#app");

function syncAppLanguage() {
  if (app) {
    app.dataset.language = gameState.settings.language;
  }
}

function renderGameplay() {
  if (!app) {
    return;
  }

  syncAppLanguage();
  app.replaceChildren();
  renderBattle(app, gameState.battle, {
    language: gameState.settings.language,
    onBattleEnd: (result) => renderBattleEndScreen(result)
  });

  const deckPanel = document.createElement("section");
  deckPanel.className = "deck-drawer";
  deckPanel.hidden = true;

  const deckButton = document.createElement("button");
  deckButton.className = "shadow-map-return";
  deckButton.type = "button";
  deckButton.textContent = translate(gameState.settings.language, "viewDeck");
  deckButton.addEventListener("click", () => {
    deckPanel.hidden = !deckPanel.hidden;
    deckButton.textContent = deckPanel.hidden
      ? translate(gameState.settings.language, "viewDeck")
      : translate(gameState.settings.language, "hideDeck");
  });

  renderCardCollection(deckPanel, cardDatabase, gameState);
  app.append(deckButton, deckPanel);

  const mapButton = document.createElement("button");
  mapButton.className = "shadow-map-return";
  mapButton.type = "button";
  mapButton.textContent = translate(gameState.settings.language, "returnToMap");
  mapButton.addEventListener("click", () => renderMapScreen());
  app.append(mapButton);
  applyPsychologicalEvents(app, "gameplay");
}

function renderBattleEndScreen(result) {
  if (!app) {
    return;
  }

  gameState.currentScreen = result;
  renderEndScreen(app, result, gameState.settings.language, {
    continueMap: () => renderMapScreen(),
    returnMenu: () => renderMenu()
  });
}

function startGameplay({ resetBattle = false } = {}) {
  if (resetBattle || !gameState.battle) {
    gameState.battle = createBattleState(cardDatabase);
  }

  gameState.currentScreen = "gameplay";
  renderGameplay();
}

function renderSafeAreaScreen() {
  if (!app) {
    return;
  }

  gameState.currentScreen = "safeArea";
  syncAppLanguage();
  renderSafeArea(app, cardDatabase, gameState, {
    enterShadowWorld: () => renderMapScreen()
  });
  applyPsychologicalEvents(app, "safeArea");
}

function startSafeArea({ resetBattle = false } = {}) {
  if (resetBattle || !gameState.battle) {
    gameState.battle = createBattleState(cardDatabase);
  }

  if (resetBattle || !gameState.map) {
    gameState.map = createMapState();
  }

  renderSafeAreaScreen();
}

function renderMapScreen() {
  if (!app) {
    return;
  }

  if (!gameState.map) {
    gameState.map = createMapState();
  }

  gameState.currentScreen = "map";
  syncAppLanguage();
  renderRoguelikeMap(app, gameState.map, {
    language: gameState.settings.language,
    enterBattle: () => startGameplay()
  });
  applyPsychologicalEvents(app, "map");
}

function renderMenu() {
  if (!app) {
    return;
  }

  gameState.currentScreen = "mainMenu";
  syncAppLanguage();
  renderMainMenu(app, {
    "new-game": () => startSafeArea({ resetBattle: true }),
    "continue": () => startSafeArea(),
    "settings": () => renderSettingsScreen()
  }, gameState.settings.language);
  applyPsychologicalEvents(app, "mainMenu");
}

function renderSettingsScreen() {
  if (!app) {
    return;
  }

  gameState.currentScreen = "settings";
  syncAppLanguage();
  renderSettings(app, gameState, {
    back: () => renderMenu()
  });
}

if (app && gameState.currentScreen === "mainMenu") {
  gameState.battle = createBattleState(cardDatabase);
  gameState.map = createMapState();
  renderMenu();
}
