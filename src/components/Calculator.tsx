import React, { useState } from 'react';
import { RadioGroup } from '@headlessui/react';

import { Recipe, Ingredient } from '../lib/recipe';

export type CalcMode = 'WEIGHT' | 'PERCENTAGE';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const amountForMode = (recipe: Recipe, ingredient: Ingredient, mode: CalcMode): number => {
  if (mode === 'WEIGHT') return recipe[ingredient];

  return recipe.bakersPercentage(ingredient);
};

const PlainButton = ({ text, onClick, styles }: { text: string; onClick: () => void; styles?: string }) => (
  <button type="button" onClick={onClick} className={`my-2 w-full rounded p-2 shadow-md ${styles}`}>
    {text}
  </button>
);

const Calculator = () => {
  const [recipe, setRecipe] = useState(Recipe.defaultRecipe());

  const [scale, setScale] = useState(1.0);

  const [mode, setMode] = useState('WEIGHT' as CalcMode);
  const swapMode = () => setMode((prevMode) => (prevMode === 'WEIGHT' ? 'PERCENTAGE' : 'WEIGHT'));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);

    setRecipe(new Recipe({ ...recipe, [e.target.name]: val }));
  };

  return (
    <div className="my-4 flex flex-col space-x-4 bg-green-200 p-2 md:flex-row">
      <div className="w-full md:w-1/2">
        <RadioGroup value={mode as CalcMode} onChange={swapMode} className="flex space-x-2">
          {['WEIGHT', 'PERCENTAGE'].map((displayMode) => (
            <RadioGroup.Option
              key={displayMode}
              value={displayMode}
              className={({ active, checked }) =>
                classNames(
                  active ? 'ring-2 ring-indigo-500 ring-offset-2' : '',
                  checked ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white text-gray-900 hover:bg-gray-50',
                  'flex w-full items-center justify-center rounded-md py-3 px-3 text-center text-sm uppercase shadow-md'
                )
              }
            >
              <RadioGroup.Label>{displayMode}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </RadioGroup>

        <PlainButton onClick={() => setRecipe(Recipe.defaultRecipe())} text="Reset To Default" styles="bg-yellow-600" />
        {Recipe.ingredients().map((ingredient) => (
          <div key={`input-${ingredient}`} className="flex items-center justify-start space-x-2 space-y-1">
            <label htmlFor={ingredient} className="w-1/6">
              {ingredient.replace(/^\w/, (c) => c.toUpperCase())}
            </label>
            {/* If mode === 'PERCENTAGE', changing this input breaks. */}
            {/* Will need to calculate the amount to set the value based on the changing percentage. */}
            {/* Maybe it does make sense to have two separate forms after all */}
            <input
              type="number"
              min={0}
              step="0.5"
              value={amountForMode(recipe, ingredient, mode)}
              onChange={handleChange}
              name={ingredient}
              // readOnly={mode === 'PERCENTAGE' && ingredient === 'flour'}
              readOnly={mode === 'PERCENTAGE'}
              className="w-full rounded shadow-md"
              id={ingredient}
            />
          </div>
        ))}
        {/* {mode === 'PERCENTAGE' && */}
        {/*   Recipe.ingredients().map((ingredient) => ( */}
        {/*     <div key={`input-${ingredient}`}> */}
        {/*       <label htmlFor={ingredient}>{ingredient.replace(/^\w/, (c) => c.toUpperCase())}</label> */}
        {/*       <input */}
        {/*         type="number" */}
        {/*         min={0} */}
        {/*         step="0.5" */}
        {/*         value={recipe.bakersPercentage(ingredient)} */}
        {/*         onChange={handleChange} */}
        {/*         name={ingredient} */}
        {/*         readOnly={ingredient === 'flour'} */}
        {/*       /> */}
        {/*     </div> */}
        {/*   ))} */}
      </div>
      <div className="w-full md:w-1/2">
        <div className="">
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
        <div className="flex flex-col">
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
                          {ingredient.replace(/^\w/, (c) => c.toUpperCase())}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {recipe.scaledIngredients(scale)[ingredient]}g
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {recipe.bakersPercentage(ingredient)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
