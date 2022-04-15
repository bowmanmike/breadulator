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
      <div>
        <table className="w-full table-fixed bg-red-200">
          <thead>
            <tr>
              <th colSpan={3}>
                <h2 className="mb-2 text-xl font-semibold underline">Enter Your Recipe Details Here</h2>
              </th>
            </tr>
            <tr>
              <td className="font-semibold">Ingredient</td>
              <td className="font-semibold">Amount (g)</td>
              <td className="font-semibold">Percentage</td>
            </tr>
          </thead>
          <tbody>
            {Recipe.ingredients().map((ingredient) => {
              const amountId = `${ingredient}-amount`;

              return (
                <tr key={ingredient} className="mb-2">
                  <td>
                    <label htmlFor={amountId}>
                      {ingredient === 'yeast' ? 'Yeast or Starter' : capitalize(ingredient)}
                    </label>
                  </td>
                  <td>
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
                  <td>
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
        <div className="flex flex-col md:flex-row md:space-x-2">
          <div className="md:w-1/2">
            <PlainButton
              onClick={() => setRecipe(Recipe.defaultRecipe())}
              text="Reset Ingredients To Default"
              styles="bg-orange-200"
            />
          </div>
          <div className="md:w-1/2">
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
        <div>
          <div>
            <div>
              <h3 className="my-2 text-center font-semibold underline">Scale Recipe</h3>
              <div className="flex justify-evenly space-x-2">
                {[0.5, 0.75, 1, 1.5, 2].map((number) => (
                  <button
                    type="button"
                    className="flex-1 rounded bg-gray-200 py-2 shadow-md"
                    onClick={() => setScale(number)}
                    key={`scaleAmount-${number}`}
                  >
                    {number}x
                  </button>
                ))}
              </div>
            </div>
          </div>
          <table className="mt-6 min-w-full table-fixed divide-y divide-gray-300 border border-gray-400 md:mx-auto md:w-4/5">
            <thead className="bg-green-200 text-center">
              <tr>
                <td colSpan={2}>
                  <h3 className="mx-auto my-2 text-center font-semibold">Scaled Recipe</h3>
                </td>
              </tr>
              <tr>
                <td>Ingredient</td>
                <td>Scaled Amount (g)</td>
              </tr>
            </thead>
            <tbody className="text-center">
              {Recipe.ingredients().map((ingredient, ingredientIdx) => (
                <tr key={`scaled-${ingredient}`} className={ingredientIdx % 2 === 0 ? undefined : 'bg-green-100'}>
                  <td>{capitalize(ingredient)}</td>
                  <td className="text-center">{recipe.scaledIngredients(scale)[ingredient]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
