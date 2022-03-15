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
    return new Recipe({ flour: 500, water: 375, salt: 10, yeast: 2 });
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
    const res = Math.round((this[ingredient] / this.flour) * 1000) / 10;
    // console.log({ res, actual: (this[ingredient] / this.flour) * 1000 });
    return res;
  }

  allBakersPercentages() {
    return {
      flour: 100,
      water: Math.round(this.water / this.flour),
      salt: Math.round(this.salt / this.flour),
      yeast: Math.round(this.yeast / this.flour),
    };
  }

  setAmountByPercentage(ingredient: Ingredient, percentage: number) {
    if (ingredient === 'flour') return 100.0;

    const flourAmount = this.flour;

    // Weird, this works if you type the number into the box, but not if you
    // click the up/down arrows. very odd
    const newIngredientAmount = Math.round(flourAmount * (percentage / 100));
    // console.log({ newIngredientAmount, flourAmount, percentage });

    this[ingredient] = newIngredientAmount;

    return newIngredientAmount;
  }

  static ingredients(): Ingredient[] {
    return ['flour', 'water', 'salt', 'yeast'];
  }
}
