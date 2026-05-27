const exactMessages = {
  pt: {
    "Player turn. Play a card or end the turn.": "Turno do jogador. Jogue uma carta ou encerre o turno.",
    "Not enough resources, or it is not the player's turn.": "Recursos insuficientes, ou nao e o turno do jogador.",
    "Enemy defeated.": "Inimigo derrotado.",
    "Enemy turn.": "Turno do inimigo.",
    "Player defeated.": "Jogador derrotado.",
    "Drew a card.": "Carta comprada.",
    "Turn 1 started.": "Turno 1 iniciado.",
    "Player gained 1 blood.": "Jogador ganhou 1 sangue.",
    "Player turn ended.": "Turno do jogador encerrado.",
    "Enemy NPC turn started.": "Turno do Inimigo NPC iniciado.",
    "Enemy NPC turn ended.": "Turno do Inimigo NPC encerrado.",
    "Enemy NPC was destroyed.": "Inimigo NPC foi destruido.",
    "Player was destroyed.": "Jogador foi destruido."
  }
};

export function localizeBattleText(text, language, cardNameMap = {}) {
  if (language !== "pt") {
    return text;
  }

  if (exactMessages.pt[text]) {
    return exactMessages.pt[text];
  }

  const played = text.match(/^(.+) was played\.$/);
  if (played) {
    return `${cardNameMap[played[1]] ?? played[1]} foi jogada.`;
  }

  const destroyed = text.match(/^(.+) was destroyed\.$/);
  if (destroyed) {
    return `${cardNameMap[destroyed[1]] ?? destroyed[1]} foi destruida.`;
  }

  const cardDamage = text.match(/^(.+) dealt (\d+) damage\.$/);
  if (cardDamage) {
    return `${cardNameMap[cardDamage[1]] ?? cardDamage[1]} causou ${cardDamage[2]} de dano.`;
  }

  const enemyDamage = text.match(/^Enemy dealt (\d+) damage\.$/);
  if (enemyDamage) {
    return `Inimigo causou ${enemyDamage[1]} de dano.`;
  }

  const enemyNpcDamage = text.match(/^Enemy NPC dealt (\d+) damage\.$/);
  if (enemyNpcDamage) {
    return `Inimigo NPC causou ${enemyNpcDamage[1]} de dano.`;
  }

  const turnStarted = text.match(/^Turn (\d+) started\.$/);
  if (turnStarted) {
    return `Turno ${turnStarted[1]} iniciado.`;
  }

  return text;
}
