import { translate } from "./i18n.js";

export function renderEndScreen(root, result, language, actions = {}) {
  const t = (key) => translate(language, key);
  const section = document.createElement("section");
  section.className = `end-screen end-screen--${result}`;

  const title = document.createElement("h1");
  title.className = "end-screen__title";
  title.textContent = result === "victory" ? t("victoryTitle") : t("defeatTitle");

  const text = document.createElement("p");
  text.className = "end-screen__text";
  text.textContent = result === "victory" ? t("victoryText") : t("defeatText");

  const actionsRow = document.createElement("div");
  actionsRow.className = "end-screen__actions";

  const continueButton = document.createElement("button");
  continueButton.className = "end-screen__button end-screen__button--primary";
  continueButton.type = "button";
  continueButton.textContent = t("continueMap");
  continueButton.addEventListener("click", () => actions.continueMap?.());

  const menuButton = document.createElement("button");
  menuButton.className = "end-screen__button";
  menuButton.type = "button";
  menuButton.textContent = t("returnMenu");
  menuButton.addEventListener("click", () => actions.returnMenu?.());

  actionsRow.append(continueButton, menuButton);
  section.append(title, text, actionsRow);
  root.replaceChildren(section);
}
