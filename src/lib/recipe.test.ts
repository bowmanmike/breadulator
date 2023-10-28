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
      const expected = new Recipe({
        flour: 1000,
        water: 700,
        salt: 24,
        yeast: 4,
      });

      expect(recipe.scaledIngredients(2.0)).toEqual(expected);
    });

    test('scale of 0.5 returns half the original ingredients', () => {
      const expected = new Recipe({
        flour: 250,
        water: 175,
        salt: 6,
        yeast: 1,
      });

      expect(recipe.scaledIngredients(0.5)).toEqual(expected);
    });
  });

  describe('setAmountByPercentage', () => {
    beforeEach(() => {
      expect(recipe.bakersPercentage('flour')).toEqual(100.0);
      expect(recipe.bakersPercentage('water')).toEqual(70.0);
      expect(recipe.bakersPercentage('salt')).toEqual(2.4);
      expect(recipe.bakersPercentage('yeast')).toEqual(0.4);
    });

    test('always returns 100.0 for flour', () => {
      expect(recipe.setAmountByPercentage('flour', 75)).toEqual(100.0);
    });

    test('sets the ingredient to the corresponding percentage', () => {
      expect(recipe.setAmountByPercentage('water', 75.0)).toEqual(375.0);
      expect(recipe.water).toEqual(375.0);
    });

    test('it works with a percentage over 100', () => {
      recipe.setAmountByPercentage('water', 105.0);

      expect(recipe.water).toEqual(525.0);
    });

    test('it can be called multiple times in a row', () => {
      recipe.setAmountByPercentage('water', 76);
      recipe.setAmountByPercentage('water', 77);
      recipe.setAmountByPercentage('water', 78);

      expect(recipe.water).toEqual(390.0);
    });
  });
});
