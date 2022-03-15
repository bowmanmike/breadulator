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
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle sm:px-6 lg:px-8">
          <table className="w-full bg-red-200">
            <thead>
              <tr>
                <th>
                  <h2 className="mb-2 text-xl font-semibold underline">Enter Your Recipe Details Here</h2>
                </th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              {Recipe.ingredients().map((ingredient) => {
                const amountId = `${ingredient}-amount`;

                return (
                  <tr key={ingredient} className="flex w-full items-center justify-around space-x-2">
                    <td className="w-1/3 md:w-1/6">
                      <label htmlFor={amountId} className="block w-full">
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
                        className="w-full rounded-md border-none shadow"
                      />
                    </td>
                    <td className="w-1/3">
                      <input
                        type="number"
                        id={`${ingredient}-percentage`}
                        min={0}
                        step={ingredient === 'yeast' ? '0.1' : undefined}
                        value={recipe.bakersPercentage(ingredient)}
                        onChange={handlePercentageChange}
                        name={ingredient}
                        className="w-full rounded-md border-none shadow"
                        readOnly={ingredient === 'flour'}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <div className="flex items-center justify-around pt-2">
                    <div className="flex-start flex w-1/2 items-center space-x-2 space-y-2">
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
                </td>
              </tr>
              <tr>
                <td>
                  <PlainButton
                    onClick={() => setRecipe(Recipe.defaultRecipe())}
                    text="Reset Ingredients To Default"
                    styles="bg-yellow-600"
                  />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
