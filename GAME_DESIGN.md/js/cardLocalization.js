const cardTranslations = {
  pt: {
    "candlemourner": {
      name: "Enlutado da Vela",
      description: "Uma figura silenciosa que guarda a luz de velas morrendo."
    },
    "rusted-watcher": {
      name: "Vigia Enferrujado",
      description: "Sua armadura range mesmo quando ninguem esta se movendo."
    },
    "grave-oracle": {
      name: "Oraculo do Tumulo",
      description: "Sussurra nomes que ainda nao foram enterrados."
    },
    "veil-stalker": {
      name: "Espreitador do Veu",
      description: "Visto apenas em reflexos e portas entreabertas."
    },
    "bone-choir": {
      name: "Coro de Ossos",
      description: "Um coral de vozes ocas sob o piso da capela."
    },
    "black-lantern": {
      name: "Lanterna Negra",
      description: "Sua chama nao revela a escuridao. Ela a alimenta."
    },
    "ashen-bride": {
      name: "Noiva Cinzenta",
      description: "Ela caminha pelo corredor toda meia-noite, sozinha e paciente."
    },
    "cellar-thing": {
      name: "Coisa do Porao",
      description: "Algo nas paredes aprendeu a respirar."
    },
    "saint-of-mold": {
      name: "Santo do Mofo",
      description: "Um icone arruinado florescendo com uma vida impossivel."
    },
    "the-hollow-king": {
      name: "O Rei Vazio",
      description: "Nenhuma coroa restou, mas toda sombra ainda se ajoelha."
    }
  }
};

const rarityTranslations = {
  pt: {
    Common: "Comum",
    Uncommon: "Incomum",
    Rare: "Rara",
    Epic: "Epica",
    Legendary: "Lendaria"
  }
};

export function getLocalizedCard(card, language) {
  const translation = cardTranslations[language]?.[card.id];

  return {
    ...card,
    name: translation?.name ?? card.name,
    description: translation?.description ?? card.description,
    rarity: rarityTranslations[language]?.[card.rarity] ?? card.rarity
  };
}
