const subtleMessages = {
  en: [
    "For a moment, the room feels one step smaller.",
    "A line of text settles into place before you can read the first version.",
    "Something behind the interface remembers your last choice.",
    "The silence changes shape, then returns.",
    "One shadow is not aligned with its owner."
  ],
  pt: [
    "Por um instante, a sala parece um passo menor.",
    "Uma linha de texto se acomoda antes que voce leia a primeira versao.",
    "Algo atras da interface lembra sua ultima escolha.",
    "O silencio muda de forma, depois volta.",
    "Uma sombra nao esta alinhada com seu dono."
  ]
};

const temporaryCardTexts = {
  en: [
    "This was not the first time.",
    "The ink is still wet.",
    "It knows why you chose it.",
    "The words briefly refuse to stay still."
  ],
  pt: [
    "Esta nao foi a primeira vez.",
    "A tinta ainda esta molhada.",
    "Ela sabe por que voce a escolheu.",
    "As palavras se recusam a ficar paradas por um instante."
  ]
};

let activeTimers = [];

function clearTimers() {
  activeTimers.forEach((timerId) => window.clearTimeout(timerId));
  activeTimers = [];
}

function schedule(callback, delay) {
  const timerId = window.setTimeout(callback, delay);
  activeTimers.push(timerId);
}

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function showStrangeMessage(root, language) {
  const message = document.createElement("aside");
  message.className = "psych-message";
  message.setAttribute("aria-live", "polite");
  message.textContent = pickRandom(subtleMessages[language] ?? subtleMessages.en);
  root.append(message);

  schedule(() => {
    message.classList.add("psych-message--leaving");
  }, 3600);

  schedule(() => {
    message.remove();
  }, 4500);
}

function applySoftGlitch(root) {
  root.classList.add("psych-soft-glitch");

  schedule(() => {
    root.classList.remove("psych-soft-glitch");
  }, 700);
}

function temporarilyChangeCardText(root, language) {
  const descriptions = [...root.querySelectorAll(".card__description, .battle-card__description, .safe-panel__text")];

  if (descriptions.length === 0) {
    return;
  }

  const target = pickRandom(descriptions);
  const originalText = target.textContent;

  target.classList.add("psych-text-shift");
  target.textContent = pickRandom(temporaryCardTexts[language] ?? temporaryCardTexts.en);

  schedule(() => {
    target.textContent = originalText;
    target.classList.remove("psych-text-shift");
  }, 1800);
}

export function applyPsychologicalEvents(root, context = "default") {
  const language = root.dataset.language ?? "en";
  clearTimers();

  if (context === "mainMenu") {
    return;
  }

  showStrangeMessage(root, language);

  if (Math.random() < 0.35) {
    schedule(() => applySoftGlitch(root), 900);
  }

  if (Math.random() < 0.45) {
    schedule(() => temporarilyChangeCardText(root, language), 1400);
  }
}
