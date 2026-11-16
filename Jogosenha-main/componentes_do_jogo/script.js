(() => {
  "use strict";

  const $ = id => document.getElementById(id);
  const el = {
    secret: $("senha-secreta"), size: $("tamanho-senha"), mode: $("modo"), limit: $("limite"),
    setup: $("configuracao"), guess: $("senha"), message: $("mensagem"), history: $("historico"),
    attempts: $("tentativas"), hints: $("dicas"), length: $("comprimento"), remaining: $("restantes"),
    start: $("iniciar"), generate: $("gerar"), newGame: $("nova-partida"), submit: $("tentar"),
    hint: $("dica"), giveUp: $("terminar"), prev: $("pagina-anterior"), next: $("pagina-proxima"),
    pageInfo: $("pagina-info"), historyTotal: $("historico-total"), theme: $("tema")
  };
  const MAX = 4000, PAGE_SIZE = 5;
  const pools = {
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", lower: "abcdefghijklmnopqrstuvwxyz", digits: "0123456789",
    symbols: "!@#$%&*?+-_=.:;"
  };
  let secret = "", attempts = 0, hintsUsed = 0, finished = true, started = false, limit = 0;
  let history = [], page = 0, hintQueue = [], hintIndex = 0, disclosedPositions = new Set();

  try { if (localStorage.getItem("senha-theme") === "light") document.body.classList.add("light"); } catch (_) { /* armazenamento opcional */ }
  el.secret.focus();

  function say(text, state = "") { el.message.textContent = text; el.message.dataset.state = state; }
  function refreshStats() {
    el.attempts.textContent = String(attempts);
    el.hints.textContent = String(hintsUsed);
    el.length.textContent = started ? String(secret.length) : "—";
    el.remaining.textContent = !started ? "∞" : limit ? String(Math.max(0, limit - attempts)) : "∞";
  }
  function setPlaying(value) {
    el.guess.disabled = !value; el.submit.disabled = !value; el.hint.disabled = !value; el.giveUp.disabled = !value;
    el.newGame.hidden = value; el.setup.hidden = value;
    $("game-title").textContent = value ? "Partida em andamento" : "Configuração";
  }
  function validSize() {
    const value = el.size.valueAsNumber;
    if (!Number.isInteger(value) || value < 1 || value > MAX) {
      say("Informe um tamanho inteiro entre 1 e 4000."); el.size.focus(); return null;
    }
    return value;
  }
  function startGame(value) {
    if (typeof value !== "string" || value.length < 1 || value.length > MAX) {
      say("A senha deve ter entre 1 e 4000 caracteres."); el.secret.focus(); return;
    }
    secret = value; attempts = 0; hintsUsed = 0; finished = false; started = true; history = []; page = 0;
    disclosedPositions = new Set(); hintQueue = makeHintQueue(); hintIndex = 0; limit = Number(el.limit.value) || 0;
    el.guess.value = ""; el.history.replaceChildren();
    refreshStats(); setPlaying(true); renderHistory();
    say(`Partida iniciada. A senha possui ${secret.length} caractere(s).`, "started");
    el.guess.focus();
  }
  function randomIndex(max) {
    const range = 0x100000000, ceiling = range - (range % max), values = new Uint32Array(1);
    do { crypto.getRandomValues(values); } while (values[0] >= ceiling);
    return values[0] % max;
  }
  function generate() {
    const length = validSize(); if (length === null) return;
    const groups = [["gen-maiusculas", pools.upper], ["gen-minusculas", pools.lower], ["gen-numeros", pools.digits], ["gen-simbolos", pools.symbols]];
    const chars = groups.filter(([id]) => $(id).checked).map(([, pool]) => pool).join("");
    if (!chars) { say("Selecione pelo menos um tipo de caractere para gerar a senha."); return; }
    let value = "";
    for (let i = 0; i < length; i++) value += chars[randomIndex(chars.length)];
    if (el.mode.value === "dupla") el.secret.value = value;
    startGame(value);
  }
  function startCustom() {
    if (el.mode.value === "solo") { generate(); return; }
    const value = el.secret.value;
    if (value.length < 1 || value.length > MAX) { say("Escolha uma senha entre 1 e 4000 caracteres."); el.secret.focus(); return; }
    startGame(value);
  }
  function evaluate(guess) {
    const result = Array(guess.length).fill("red"), usedGuess = Array(guess.length).fill(false), usedSecret = Array(secret.length).fill(false);
    // Primeiro consome todos os acertos exatos, garantindo prioridade ao verde.
    for (let i = 0; i < Math.min(guess.length, secret.length); i++) {
      if (guess[i] === secret[i]) { result[i] = "green"; usedGuess[i] = true; usedSecret[i] = true; }
    }
    // Diferença de caixa tem precedência sobre amarelo e também consome uma ocorrência.
    for (let i = 0; i < guess.length; i++) {
      if (usedGuess[i]) continue;
      for (let j = 0; j < secret.length; j++) {
        if (!usedSecret[j] && guess[i].toLocaleLowerCase() === secret[j].toLocaleLowerCase() && guess[i] !== secret[j]) {
          result[i] = "blue"; usedGuess[i] = true; usedSecret[j] = true; break;
        }
      }
    }
    // Depois, uma ocorrência ainda livre em outra posição gera amarelo.
    for (let i = 0; i < guess.length; i++) {
      if (usedGuess[i]) continue;
      for (let j = 0; j < secret.length; j++) {
        if (!usedSecret[j] && i !== j && guess[i] === secret[j]) {
          result[i] = "yellow"; usedGuess[i] = true; usedSecret[j] = true; break;
        }
      }
    }
    return result;
  }
  function submit() {
    if (!started || finished) return;
    const guess = el.guess.value;
    if (!guess.length) { say("Digite uma tentativa antes de continuar."); el.guess.focus(); return; }
    attempts++;
    const colors = evaluate(guess);
    history.push({ guess, colors }); page = Math.floor((history.length - 1) / PAGE_SIZE);
    refreshStats(); renderHistory(); el.guess.value = "";
    if (guess === secret) {
      finish("Parabéns! Você descobriu a senha!", "win");
    } else if (limit && attempts >= limit) {
      finish(`Suas tentativas acabaram. A senha era: ${secret}`, "loss");
    } else {
      say(`Tentativa ${attempts} registrada.`, ""); el.guess.focus();
    }
  }
  function finish(text, state) {
    finished = true; setPlaying(false); say(text, state);
    // Nova partida fica disponível e recebe foco, sem focar campo secreto automaticamente.
    el.newGame.focus();
  }
  function makeHintQueue() {
    const queue = [];
    const groups = [
      ["número(s)", /[0-9]/], ["letra(s) maiúscula(s)", /[A-Z]/], ["letra(s) minúscula(s)", /[a-z]/], ["símbolo(s)", /[^a-z0-9]/i]
    ];
    for (const [label, re] of groups) {
      const count = [...secret].filter(ch => re.test(ch)).length;
      if (count) queue.push(`A senha contém ${count} ${label}.`);
    }
    const positions = secret.length === 1 ? [0] : [...new Set([0, Math.floor((secret.length - 1) / 2), secret.length - 1])];
    for (const i of positions) queue.push(`Posição ${i + 1}: “${secret[i]}”.`);
    for (let i = 0; i < secret.length; i++) {
      if (!positions.includes(i)) queue.push(`Posição ${i + 1}: “${secret[i]}”.`);
    }
    return queue;
  }
  function requestHint() {
    if (!started || finished) return;
    while (hintIndex < hintQueue.length && hintQueue[hintIndex].startsWith("Posição ")) {
      const match = hintQueue[hintIndex].match(/^Posição (\d+):/);
      if (!match || !disclosedPositions.has(Number(match[1]) - 1)) break;
      hintIndex++;
    }
    if (hintIndex >= hintQueue.length) { say("Não há novas dicas disponíveis nesta partida."); el.guess.focus(); return; }
    const hint = hintQueue[hintIndex++];
    const match = hint.match(/^Posição (\d+):/);
    if (match) disclosedPositions.add(Number(match[1]) - 1);
    hintsUsed++; refreshStats(); say(hint); el.guess.focus();
  }
  function renderHistory() {
    const total = history.length, pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    page = Math.min(page, pages - 1); el.history.replaceChildren();
    const start = page * PAGE_SIZE;
    for (let n = start; n < Math.min(total, start + PAGE_SIZE); n++) {
      const item = history[n], row = document.createElement("article"); row.className = "linha";
      const head = document.createElement("div"); head.className = "linha-head";
      const title = document.createElement("strong"); title.textContent = `Tentativa ${n + 1}`;
      const count = document.createElement("span"); count.className = "hint"; count.textContent = `${item.guess.length} caractere(s)`;
      head.append(title, count); const grid = document.createElement("div"); grid.className = "guess-grid";
      grid.setAttribute("role", "list"); grid.setAttribute("aria-label", `Caracteres e pistas da tentativa ${n + 1}`);
      for (let i = 0; i < item.guess.length; i++) {
        const cell = document.createElement("span"); cell.className = `guess-cell ${item.colors[i]}`; cell.textContent = item.guess[i]; cell.title = `Posição ${i + 1}: ${colorName(item.colors[i])}`;
        cell.setAttribute("role", "listitem"); cell.setAttribute("aria-label", `Posição ${i + 1}, caractere ${item.guess[i]}, ${colorName(item.colors[i])}`); grid.appendChild(cell);
      }
      for (let i = item.guess.length; i < secret.length; i++) {
        const cell = document.createElement("span"); cell.className = "guess-cell empty"; cell.textContent = "·"; cell.title = `Posição ${i + 1}: sem caractere na tentativa`;
        cell.setAttribute("role", "listitem"); cell.setAttribute("aria-label", `Posição ${i + 1}, tentativa sem caractere`); grid.appendChild(cell);
      }
      row.append(head, grid); el.history.appendChild(row);
    }
    el.historyTotal.textContent = `${total} tentativa(s)`; el.pageInfo.textContent = `Página ${page + 1} de ${pages}`;
    el.prev.disabled = page <= 0; el.next.disabled = page >= pages - 1;
  }
  function colorName(color) { return ({ green: "verde, posição correta", yellow: "amarelo, existe em outra posição", blue: "azul, diferença de maiúscula/minúscula", red: "vermelho, sem ocorrência disponível" })[color]; }
  function newGame() {
    secret = ""; started = false; finished = true; attempts = 0; hintsUsed = 0; history = []; page = 0;
    el.secret.value = ""; el.guess.value = ""; el.history.replaceChildren(); refreshStats(); renderHistory(); setPlaying(false);
    say("Configure uma nova partida para começar."); el.secret.focus();
  }
  el.start.addEventListener("click", startCustom); el.generate.addEventListener("click", generate);
  el.submit.addEventListener("click", submit); el.hint.addEventListener("click", requestHint);
  el.giveUp.addEventListener("click", () => { if (started && !finished) finish(`Você desistiu. A senha era: ${secret}`, "giveup"); });
  el.newGame.addEventListener("click", newGame);
  el.prev.addEventListener("click", () => { if (page > 0) { page--; renderHistory(); } });
  el.next.addEventListener("click", () => { if ((page + 1) * PAGE_SIZE < history.length) { page++; renderHistory(); } });
  el.mode.addEventListener("change", () => {
    const solo = el.mode.value === "solo";
    el.secret.disabled = solo; el.secret.closest("label").hidden = solo; el.start.textContent = solo ? "Iniciar partida" : "Iniciar com esta senha";
  });
  el.theme.addEventListener("click", () => {
    document.body.classList.toggle("light");
    try { localStorage.setItem("senha-theme", document.body.classList.contains("light") ? "light" : "dark"); } catch (_) { /* tema continua na sessão */ }
  });
  el.guess.addEventListener("keydown", e => { if (e.key === "Enter") submit(); });
  el.secret.addEventListener("keydown", e => { if (e.key === "Enter") startCustom(); });
  el.size.addEventListener("keydown", e => { if (e.key === "Enter") generate(); });
  refreshStats(); setPlaying(false);
})();
