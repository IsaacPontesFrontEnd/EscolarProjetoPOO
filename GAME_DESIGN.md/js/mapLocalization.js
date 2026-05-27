const nodeTranslations = {
  pt: {
    "node-1": {
      type: "Batalha",
      title: "Limiar Frio",
      description: "Uma passagem estreita onde a primeira sombra espera."
    },
    "node-2": {
      type: "Evento",
      title: "Moldura Sussurrante",
      description: "Um retrato fala com uma voz quase familiar."
    },
    "node-3": {
      type: "Descanso",
      title: "Lanterna Fraca",
      description: "Uma pequena chama segura a escuridao na borda da sala."
    },
    "node-4": {
      type: "Misterio",
      title: "Porta Sem Marca",
      description: "A macaneta esta quente. A sala atras dela respira."
    },
    "node-5": {
      type: "Batalha",
      title: "Salao Negro",
      description: "Algo bloqueia o caminho e nao pretende se mover."
    }
  }
};

export function getLocalizedNode(node, language) {
  const translation = nodeTranslations[language]?.[node.id];

  return {
    ...node,
    typeLabel: translation?.type ?? node.type,
    title: translation?.title ?? node.title,
    description: translation?.description ?? node.description
  };
}
