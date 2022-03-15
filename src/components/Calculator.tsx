import React, { useState } from 'react';

import { Recipe, Ingredient } from '../lib/recipe';
import { capitalize } from '../lib/capitalize';

export type CalcMode = 'WEIGHT' | 'PERCENTAGE';

const PlainButton = ({ text, onClick, styles }: { text: string; onClick: () => void; styles?: string }) => (
  <button type="button" onClick={onClick} className={`my-2 w-full rounded p-2 shadow-md ${styles}`}>
    {text}
  </button>
);

const Calculator = () => {
  const [recipe, setRecipe] = useState(Recipe.defaultRecipe());

  const [scale, setScale] = useState(1.0);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    const name = e.target.name as Ingredient;

    setRecipe(new Recipe({ ...recipe, [name]: val }));
  };
  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    const name = e.target.name as Ingredient;

    const newValue = recipe.setAmountByPercentage(name, val);
    const newRecipe = new Recipe({ ...recipe, [name]: newValue });

    setRecipe(newRecipe);
  };

  return (
    <div className="my-4">
      <div className="">
        <table className="w-full table-fixed bg-red-200">
          <thead className="">
            <tr>
              <th colSpan={3}>
                <h2 className="mb-2 text-xl font-semibold underline">Enter Your Recipe Details Here</h2>
              </th>
            </tr>
            <tr>
              <td>Ingredient</td>
              <td>Amount (g)</td>
              <td>Percentage</td>
            </tr>
          </thead>
          <tbody>
            {Recipe.ingredients().map((ingredient) => {
              const amountId = `${ingredient}-amount`;

              return (
                <tr key={ingredient} className="mb-2">
                  <td className="w-1/6">
                    <label htmlFor={amountId} className="">
                      {capitalize(ingredient)}
                    </label>
                  </td>
                  <td className="w-1/3">
                    <input
                      type="number"
                      id={amountId}
                      min={0}
                      value={recipe[ingredient]}
                      onChange={handleAmountChange}
                      name={ingredient}
                      className="w-full rounded shadow-md"
                    />
                  </td>
                  <td className="">
                    <input
                      type="number"
                      id={`${ingredient}-percentage`}
                      min={0}
                      step={ingredient === 'yeast' ? '0.1' : undefined}
                      value={recipe.bakersPercentage(ingredient)}
                      onChange={handlePercentageChange}
                      name={ingredient}
                      className="w-full rounded shadow-sm"
                      readOnly={ingredient === 'flour'}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <div>
            <div>
              <PlainButton
                onClick={() => setRecipe(Recipe.defaultRecipe())}
                text="Reset Ingredients To Default"
                styles="bg-orange-200"
              />
            </div>
          </div>
          <div>
            <div>
              <PlainButton
                onClick={() =>
                  setRecipe(
                    new Recipe({
                      flour: 0,
                      water: 0,
                      salt: 0,
                      yeast: 0,
                    })
                  )
                }
                text="Set Ingredients to 0"
                styles="bg-red-400"
              />
            </div>
          </div>
        </div>
        <div>
          <div>
            <div>
              <h3 className="my-2 text-center font-semibold underline">Scale Recipe</h3>
              <div className="flex justify-evenly space-x-2">
                {[0.5, 0.75, 1, 1.5, 2].map((number) => (
                  <button className="flex-1 rounded bg-gray-200 py-2 shadow-md" onClick={() => setScale(number)}>
                    {number}x
                  </button>
                ))}
              </div>
            </div>
          </div>
          <h3 className="my-2 text-center">Scaled Recipe</h3>
          <table className="w-full table-fixed bg-green-300">
            <thead>
              <tr>
                <td>Ingredient</td>
                <td>Scaled Amount (g)</td>
              </tr>
            </thead>
            {Recipe.ingredients().map((ingredient) => (
              <tr>
                <td>{capitalize(ingredient)}</td>
                <td className="text-center">{recipe.scaledIngredients(scale)[ingredient]}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
