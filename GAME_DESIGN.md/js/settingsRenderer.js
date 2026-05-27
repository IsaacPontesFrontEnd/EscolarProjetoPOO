import { applyAudioSettings } from "./audioManager.js";
import { translate } from "./i18n.js";

export function renderSettings(root, gameState, actions = {}) {
  const t = (key) => translate(gameState.settings.language, key);

  const section = document.createElement("section");
  section.className = "settings";
  section.setAttribute("aria-label", t("settingsTitle"));

  const title = document.createElement("h1");
  title.className = "settings__title";
  title.textContent = t("settingsTitle");

  const form = document.createElement("div");
  form.className = "settings__form";

  const languageField = document.createElement("label");
  languageField.className = "settings-field";

  const languageLabel = document.createElement("span");
  languageLabel.className = "settings-field__label";
  languageLabel.textContent = t("language");

  const languageSelect = document.createElement("select");
  languageSelect.className = "settings-field__control";

  [
    ["en", t("english")],
    ["pt", t("portuguese")]
  ].forEach(([value, label]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    languageSelect.append(option);
  });
  languageSelect.value = gameState.settings.language;

  languageSelect.addEventListener("change", () => {
    gameState.settings.language = languageSelect.value;
    renderSettings(root, gameState, actions);
  });

  languageField.append(languageLabel, languageSelect);

  const audioField = document.createElement("label");
  audioField.className = "settings-field settings-field--inline";

  const audioCheckbox = document.createElement("input");
  audioCheckbox.type = "checkbox";
  audioCheckbox.checked = gameState.settings.audioEnabled;
  audioCheckbox.addEventListener("change", () => {
    gameState.settings.audioEnabled = audioCheckbox.checked;
    applyAudioSettings(gameState.settings);
  });

  const audioLabel = document.createElement("span");
  audioLabel.className = "settings-field__label";
  audioLabel.textContent = t("audioEnabled");

  audioField.append(audioCheckbox, audioLabel);

  const volumeField = document.createElement("label");
  volumeField.className = "settings-field";

  const volumeLabel = document.createElement("span");
  volumeLabel.className = "settings-field__label";
  volumeLabel.textContent = `${t("volume")}: ${Math.round(gameState.settings.volume * 100)}%`;

  const volumeInput = document.createElement("input");
  volumeInput.className = "settings-field__control";
  volumeInput.type = "range";
  volumeInput.min = "0";
  volumeInput.max = "1";
  volumeInput.step = "0.01";
  volumeInput.value = String(gameState.settings.volume);
  volumeInput.addEventListener("input", () => {
    gameState.settings.volume = Number(volumeInput.value);
    volumeLabel.textContent = `${t("volume")}: ${Math.round(gameState.settings.volume * 100)}%`;
    applyAudioSettings(gameState.settings);
  });

  volumeField.append(volumeLabel, volumeInput);

  const actionsRow = document.createElement("div");
  actionsRow.className = "settings__actions";

  const backButton = document.createElement("button");
  backButton.className = "settings__button";
  backButton.type = "button";
  backButton.textContent = t("back");
  backButton.addEventListener("click", () => {
    actions.back?.();
  });

  actionsRow.append(backButton);
  form.append(languageField, audioField, volumeField, actionsRow);
  section.append(title, form);
  root.replaceChildren(section);
}
