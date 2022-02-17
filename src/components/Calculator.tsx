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
  <button
    type="button"
    onClick={onClick}
    className={`my-2 w-full rounded border border-slate-800 p-2 shadow-md ${styles}`}
  >
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
        <RadioGroup value={mode as CalcMode} onChange={swapMode} className="mt-2 flex space-x-2">
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
            <input
              type="number"
              min={0}
              step="0.5"
              value={amountForMode(recipe, ingredient, mode)}
              onChange={handleChange}
              name={ingredient}
              readOnly={mode === 'PERCENTAGE' && ingredient === 'flour'}
              className="w-full rounded shadow-md"
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
        <h2>Scaled</h2>
        <div className="flex-start flex items-center space-x-2">
          <label htmlFor="input-scale">Scale</label>
          <input
            type="range"
            min={0}
            max={10}
            step="0.1"
            value={scale}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setScale(parseFloat(e.target.value))}
          />
          <PlainButton onClick={() => setScale(1.0)} text="Reset Scale" styles="bg-orange-600" />
        </div>
        {Recipe.ingredients().map((ingredient) => (
          <div key={`output-${ingredient}`}>
            <div>
              <p>
                {ingredient} - {recipe.scaledIngredients(scale)[ingredient]}g or {recipe.bakersPercentage(ingredient)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
