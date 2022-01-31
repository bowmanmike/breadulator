import React, { useState } from 'react';
import { Recipe } from '../lib/recipe';

export type CalcMode = 'WEIGHT' | 'PERCENTAGE';

const Calculator = () => {
  const [recipe, setRecipe] = useState(
    new Recipe({
      flour: 500,
      water: 350,
      salt: 12,
      yeast: 2,
    })
  );

  const [scale, setScale] = useState(1.0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);

    setRecipe(new Recipe({ ...recipe, [e.target.name]: val }));
  };

  return (
    <div className="flex flex-col space-x-4 bg-green-500 md:flex-row">
      <div className="w-full border border-gray-400 md:w-1/2">
        <h2>Recipe</h2>
        {Recipe.ingredients().map((ingredient) => (
          <div key={`input-${ingredient}`}>
            <label htmlFor={ingredient}>{ingredient.replace(/^\w/, (c) => c.toUpperCase())}</label>
            <input
              type="number"
              min={0}
              step="0.5"
              value={recipe[ingredient]}
              onChange={handleChange}
              name={ingredient}
            />
          </div>
        ))}
      </div>
      <div className="w-full border border-gray-400 md:w-1/2">
        <h2>Scaled</h2>
        <div>
          <label htmlFor="input-scale">Scale</label>
          <input
            type="number"
            min={0}
            step="0.1"
            value={scale}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setScale(parseFloat(e.target.value))}
          />
        </div>
        {Recipe.ingredients().map((ingredient) => (
          <div key={`output-${ingredient}`}>
            <div>
              {ingredient} - {Math.round(recipe.scaledIngredients(scale)[ingredient])}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
