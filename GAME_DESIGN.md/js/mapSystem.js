const mapNodes = [
  {
    id: "node-1",
    type: "Battle",
    title: "Cold Threshold",
    description: "A narrow crossing where the first shadow waits."
  },
  {
    id: "node-2",
    type: "Event",
    title: "Whispering Frame",
    description: "A portrait speaks in a voice that almost sounds familiar."
  },
  {
    id: "node-3",
    type: "Rest",
    title: "Dim Lantern",
    description: "A small flame holds the dark at the edge of the room."
  },
  {
    id: "node-4",
    type: "Mystery",
    title: "Unmarked Door",
    description: "The handle is warm. The room behind it is breathing."
  },
  {
    id: "node-5",
    type: "Battle",
    title: "Black Hall",
    description: "Something blocks the path and does not intend to move."
  }
];

export function createMapState() {
  return {
    currentNodeIndex: 0,
    completedNodeIds: [],
    nodes: mapNodes
  };
}

export function getCurrentNode(mapState) {
  return mapState.nodes[mapState.currentNodeIndex] ?? null;
}

export function isNodeCompleted(mapState, node) {
  return mapState.completedNodeIds.includes(node.id);
}

export function isNodeAvailable(mapState, nodeIndex) {
  return nodeIndex <= mapState.currentNodeIndex;
}

export function completeCurrentNode(mapState) {
  const node = getCurrentNode(mapState);

  if (!node || isNodeCompleted(mapState, node)) {
    return node;
  }

  mapState.completedNodeIds.push(node.id);
  mapState.currentNodeIndex = Math.min(mapState.currentNodeIndex + 1, mapState.nodes.length - 1);
  return node;
}
