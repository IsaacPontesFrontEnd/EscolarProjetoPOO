const menuItems = [
  { id: "new-game", label: "New Game", primary: true },
  { id: "continue", label: "Continue" },
  { id: "settings", label: "Settings" }
];

export function renderMainMenu(root, actionMap = {}) {
  const menu = document.createElement("section");
  menu.className = "main-menu";

  const title = document.createElement("h1");
  title.className = "main-menu__title";
  title.textContent = "Horror";

  const subtitle = document.createElement("p");
  subtitle.className = "main-menu__subtitle";
  subtitle.textContent = "Main Menu";

  const actionList = document.createElement("div");
  actionList.className = "main-menu__actions";

  menuItems.forEach((item) => {
    const button = document.createElement("button");
    button.className = item.primary
      ? "main-menu__button main-menu__button--primary"
      : "main-menu__button";
    button.type = "button";
    button.dataset.action = item.id;
    button.textContent = item.label;
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
