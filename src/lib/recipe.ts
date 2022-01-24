export class Recipe {
  flour: number;

  water: number;

  salt: number;

  yeast: number;

  scale: number;

  constructor({
    flour,
    water,
    salt,
    yeast,
  }: {
    flour: number;
    water: number;
    salt: number;
    yeast: number;
  }) {
    this.flour = flour;
    this.water = water;
    this.salt = salt;
    this.yeast = yeast;
    this.scale = 1.0;
  }

  scaledIngredients(scale = 1.0) {
    return {
      flour: this.flour * scale,
      water: this.water * scale,
      salt: this.salt * scale,
      yeast: this.yeast * scale,
    };
  }

  ingredients() {
    return ['flour', 'water', 'salt', 'yeast'];
  }
}

export type Ingredient = 'flour' | 'water' | 'salt' | 'yeast';