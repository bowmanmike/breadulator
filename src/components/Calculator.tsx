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
          <div className="bg-red-200">
            <h2 className="text-xl font-semibold underline">Enter Your Recipe Details Here</h2>
            <div className="flex flex-col space-y-2">
              {Recipe.ingredients().map((ingredient) => {
                const amountId = `${ingredient}-amount`;

                return (
                  <div key={ingredient} className="flex w-full items-center justify-around space-x-2">
                    <div className="w-12">
                      <label htmlFor={amountId} className="block w-full">
                        {capitalize(ingredient)}
                      </label>
                    </div>
                    <div className="">
                      <input
                        type="number"
                        id={amountId}
                        min={0}
                        value={recipe[ingredient]}
                        onChange={handleAmountChange}
                        className="w-full rounded-md border-none shadow"
                      />
                    </div>
                    <div className="">
                      <input
                        type="number"
                        id={`${ingredient}-percentage`}
                        min={0}
                        value={recipe.bakersPercentage(ingredient)}
                        onChange={handlePercentageChange}
                        className="w-full rounded-md border-none shadow"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* TABLE STARTS HERE */}
          <div className="overflow-hidden sm:rounded-lg">
            <table className="max-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th colSpan={3}>Enter Your Recipe Details</th>
                </tr>
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
                        step="0.25"
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
          <div className="mt-4 flex flex-col space-x-2 md:flex-row ">
            <div className="flex w-1/2 flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
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
                            Initial Amount (g)
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                          >
                            Scaled Amount (g)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Recipe.ingredients().map((ingredient, ingredientIdx) => (
                          <tr key={ingredient} className={ingredientIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                              {capitalize(ingredient)}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{recipe[ingredient]}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                              {recipe.scaledIngredients(scale)[ingredient]}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <PlainButton
                onClick={() => setRecipe(Recipe.defaultRecipe())}
                text="Reset Ingredients To Default"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
