import { translate } from "./i18n.js";

const menuItems = [
  { id: "new-game", labelKey: "newGame", primary: true },
  { id: "continue", labelKey: "continue" },
  { id: "settings", labelKey: "settings" }
];

export function renderMainMenu(root, actionMap = {}, language = "en") {
  const t = (key) => translate(language, key);
  const menu = document.createElement("section");
  menu.className = "main-menu";

  const title = document.createElement("h1");
  title.className = "main-menu__title";
  title.textContent = "Horror";

  const subtitle = document.createElement("p");
  subtitle.className = "main-menu__subtitle";
  subtitle.textContent = t("mainMenu");

  const actionList = document.createElement("div");
  actionList.className = "main-menu__actions";

  menuItems.forEach((item) => {
    const button = document.createElement("button");
    button.className = item.primary
      ? "main-menu__button main-menu__button--primary"
      : "main-menu__button";
    button.type = "button";
    button.dataset.action = item.id;
    button.textContent = t(item.labelKey);
    actionList.append(button);
  });

  actionList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");

    if (!button) {
      return;
    }

    const action = actionMap[button.dataset.action];

    if (action) {
      action();
    }
  });

  menu.append(title, subtitle, actionList);
  root.replaceChildren(menu);
}
