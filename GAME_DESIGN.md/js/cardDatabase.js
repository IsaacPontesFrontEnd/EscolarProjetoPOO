import { Card } from "./Card.js";

const cardData = [
  {
    id: "candlemourner",
    name: "Candlemourner",
    description: "A silent figure that guards dying candlelight.",
    cost: 1,
    attack: 1,
    health: 3,
    rarity: "Common"
  },
  {
    id: "rusted-watcher",
    name: "Rusted Watcher",
    description: "Its armor creaks even when nobody is moving.",
    cost: 2,
    attack: 2,
    health: 2,
    rarity: "Common"
  },
  {
    id: "grave-oracle",
    name: "Grave Oracle",
    description: "Whispers names that have not been buried yet.",
    cost: 2,
    attack: 1,
    health: 4,
    rarity: "Uncommon"
  },
  {
    id: "veil-stalker",
    name: "Veil Stalker",
    description: "Seen only in reflections and half-open doors.",
    cost: 3,
    attack: 4,
    health: 2,
    rarity: "Uncommon"
  },
  {
    id: "bone-choir",
    name: "Bone Choir",
    description: "A chorus of hollow voices under the chapel floor.",
    cost: 3,
    attack: 3,
    health: 3,
    rarity: "Uncommon"
  },
  {
    id: "black-lantern",
    name: "Black Lantern",
    description: "Its flame does not reveal the dark. It feeds it.",
    cost: 4,
    attack: 2,
    health: 6,
    rarity: "Rare"
  },
  {
    id: "ashen-bride",
    name: "Ashen Bride",
    description: "She walks the aisle every midnight, alone and patient.",
    cost: 4,
    attack: 5,
    health: 3,
    rarity: "Rare"
  },
  {
    id: "cellar-thing",
    name: "Cellar Thing",
    description: "Something in the walls learned how to breathe.",
    cost: 5,
    attack: 6,
    health: 5,
    rarity: "Rare"
  },
  {
    id: "saint-of-mold",
    name: "Saint of Mold",
    description: "A ruined icon blooming with impossible life.",
    cost: 6,
    attack: 5,
    health: 8,
    rarity: "Epic"
  },
  {
    id: "the-hollow-king",
    name: "The Hollow King",
    description: "No crown remains, but every shadow still kneels.",
    cost: 8,
    attack: 9,
    health: 9,
    rarity: "Legendary"
  }
];

export const cardDatabase = cardData.map((card) => new Card(card));
