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

    // recipe[name] = newAmount;
    console.log({ newRecipe, newValue });
    setRecipe(newRecipe);
  };

  return (
    <div className="my-4 flex flex-col space-x-4 bg-green-200 p-2">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden sm:rounded-lg">
            <div className="">
              <PlainButton
                onClick={() => setRecipe(Recipe.defaultRecipe())}
                text="Reset To Default"
                styles="bg-yellow-600"
              />
              <div className="flex items-center justify-between">
                <div className="flex-start flex w-1/2 items-center space-x-2">
                  <label htmlFor="set-scale" className="w-1/2">
                    Current Scale:
                  </label>
                  <input
                    type="number"
                    id="set-scale"
                    value={scale}
                    onChange={(e) => setScale(parseFloat(e.target.value))}
                    min={0}
                    max={5}
                    step="0.1"
                    className="w-1/2 rounded border-none shadow-md"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label htmlFor="input-scale">Scale</label>
                  <input
                    type="range"
                    min={0}
                    max={5}
                    step="0.1"
                    value={scale}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setScale(parseFloat(e.target.value))}
                  />
                </div>
              </div>
              <PlainButton onClick={() => setScale(1.0)} text="Reset Scale" styles="bg-orange-600" />
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Ingredient
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Amount (grams)
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody>
                {Recipe.ingredients().map((ingredient, ingredientIdx) => (
                  <tr key={ingredient} className={ingredientIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {capitalize(ingredient)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      <input
                        type="number"
                        min={0}
                        step="0.5"
                        value={recipe[ingredient]}
                        onChange={handleAmountChange}
                        name={ingredient}
                        className="rounded shadow-md"
                        id={`${ingredient}-weight`}
                      />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      <input
                        type="number"
                        min={0}
                        step="0.1"
                        value={recipe.bakersPercentage(ingredient)}
                        onChange={handlePercentageChange}
                        name={ingredient}
                        readOnly={ingredient === 'flour'}
                        className="rounded shadow-md"
                        id={`${ingredient}-percentage`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
