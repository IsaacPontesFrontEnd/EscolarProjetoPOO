import {
  completeCurrentNode,
  getCurrentNode,
  isNodeAvailable,
  isNodeCompleted
} from "./mapSystem.js";
import { translate } from "./i18n.js";
import { getLocalizedNode } from "./mapLocalization.js";

function createNodeButton(node, index, mapState, language) {
  const localizedNode = getLocalizedNode(node, language);
  const button = document.createElement("button");
  button.className = "map-node";
  button.type = "button";
  button.disabled = !isNodeAvailable(mapState, index);
  button.dataset.nodeId = node.id;

  if (isNodeCompleted(mapState, node)) {
    button.classList.add("map-node--completed");
  }

  if (index === mapState.currentNodeIndex) {
    button.classList.add("map-node--current");
  }

  const type = document.createElement("span");
  type.className = "map-node__type";
  type.textContent = localizedNode.typeLabel;

  const title = document.createElement("strong");
  title.className = "map-node__title";
  title.textContent = localizedNode.title;

  button.append(type, title);
  return button;
}

function createDetails(node, mapState, actions, render, t, language) {
  const details = document.createElement("aside");
  details.className = "map-details";

  if (!node) {
    details.textContent = t("pathEnds");
    return details;
  }

  const localizedNode = getLocalizedNode(node, language);

  const type = document.createElement("p");
  type.className = "map-details__type";
  type.textContent = localizedNode.typeLabel;

  const title = document.createElement("h2");
  title.className = "map-details__title";
  title.textContent = localizedNode.title;

  const description = document.createElement("p");
  description.className = "map-details__text";
  description.textContent = localizedNode.description;

  const action = document.createElement("button");
  action.className = "map-details__button";
  action.type = "button";
  action.textContent = node.type === "Battle" ? t("enterBattle") : t("resolveNode");
  action.disabled = isNodeCompleted(mapState, node);
  action.addEventListener("click", () => {
    if (node.type === "Battle") {
      completeCurrentNode(mapState);
      actions.enterBattle?.();
      return;
    }

    completeCurrentNode(mapState);
    render();
  });

  details.append(type, title, description, action);
  return details;
}

export function renderRoguelikeMap(root, mapState, actions = {}) {
  const language = actions.language ?? "en";
  const t = (key) => translate(language, key);
  const section = document.createElement("section");
  section.className = "roguelike-map";
  section.setAttribute("aria-label", "Shadow World map");

  const render = () => {
    section.replaceChildren();

    const header = document.createElement("header");
    header.className = "roguelike-map__header";

    const title = document.createElement("h1");
    title.className = "roguelike-map__title";
    title.textContent = t("shadowWorld");

    const subtitle = document.createElement("p");
    subtitle.className = "roguelike-map__subtitle";
    subtitle.textContent = t("mapSubtitle");

    header.append(title, subtitle);

    const layout = document.createElement("div");
    layout.className = "roguelike-map__layout";

    const path = document.createElement("div");
    path.className = "roguelike-map__path";

    mapState.nodes.forEach((node, index) => {
      path.append(createNodeButton(node, index, mapState, language));
    });

    layout.append(path, createDetails(getCurrentNode(mapState), mapState, actions, render, t, language));
    section.append(header, layout);
  };

  render();
  root.replaceChildren(section);
}
