export class Card {
  constructor({ id, name, description, cost, attack, health, rarity, specialEffects = [] }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.cost = cost;
    this.attack = attack;
    this.health = health;
    this.rarity = rarity;
    this.specialEffects = specialEffects;
  }
}
