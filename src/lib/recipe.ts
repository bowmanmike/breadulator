export type Ingredient = 'flour' | 'water' | 'salt' | 'yeast';

export class Recipe {
  flour: number;

  water: number;

  salt: number;

  yeast: number;

  constructor({ flour, water, salt, yeast }: { flour: number; water: number; salt: number; yeast: number }) {
    this.flour = flour;
    this.water = water;
    this.salt = salt;
    this.yeast = yeast;
  }

  static defaultRecipe() {
    return new Recipe({ flour: 500, water: 350, salt: 12, yeast: 2 });
  }

  scaledIngredients(scale = 1.0) {
    return {
      flour: Math.round(this.flour * scale),
      water: Math.round(this.water * scale),
      salt: Math.round(this.salt * scale),
      yeast: Math.round(this.yeast * scale),
    };
  }

  bakersPercentage(ingredient: Ingredient) {
    if (ingredient === 'flour') return 100;

    // Not ideal, a hack to get JS to round to 1 decimal place
    return Math.round((this[ingredient] / this.flour) * 1000) / 10;
  }

  allBakersPercentages() {
    return {
      flour: 100,
      water: Math.round(this.water / this.flour),
      salt: Math.round(this.salt / this.flour),
      yeast: Math.round(this.yeast / this.flour),
    };
  }

  static ingredients(): Ingredient[] {
    return ['flour', 'water', 'salt', 'yeast'];
  }
}
