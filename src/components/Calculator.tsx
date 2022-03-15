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

  const updateRecipeScale = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScale(parseFloat(e.target.value));
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
          <tfoot className="">
            <tr>
              <td>
                <div className="">
                  <div className="">
                    <label htmlFor="set-scale" className="">
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
                      className=""
                    />
                  </div>
                  <div className="">
                    <label htmlFor="input-scale">Scale</label>
                    <input
                      type="range"
                      min={0}
                      max={5}
                      step="0.1"
                      value={scale}
                      // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setScale(parseFloat(e.target.value))}
                      onChange={updateRecipeScale}
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
  );
};

export default Calculator;
