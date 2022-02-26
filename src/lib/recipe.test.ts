import { Recipe } from './recipe';

describe('Recipe', () => {
  let recipe: Recipe;

  beforeEach(() => {
    recipe = Recipe.defaultRecipe();
  });

  describe('scaledIngredients', () => {
    test('scale of 1.0 returns the original ingredients', () => {
      expect(recipe.scaledIngredients(1.0)).toEqual(recipe);
    });

    test('scale of 2.0 returns double the original ingredients', () => {
      const expected = new Recipe({ flour: 1000, water: 700, salt: 24, yeast: 4 });

      expect(recipe.scaledIngredients(2.0)).toEqual(expected);
    });

    test('scale of 0.5 returns half the original ingredients', () => {
      const expected = new Recipe({ flour: 250, water: 175, salt: 6, yeast: 1 });

      expect(recipe.scaledIngredients(0.5)).toEqual(expected);
    });
  });
});
