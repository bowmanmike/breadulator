import React, { useState } from 'react';
import { Ingredient, Recipe } from '../lib/recipe';
// import DisplayTable from './DisplayTable';
// import ScalableRecipe from './ScalableRecipe';

// export interface FormState {
//   scale: number;
//   flour: number;
//   water: number;
//   salt: number;
//   yeast: number;
// }

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
  // const [mode, setMode] = useState('PERCENTAGE' as CalcMode);
  // const swapMode = () =>
  //   mode === 'PERCENTAGE' ? setMode('WEIGHT') : setMode('PERCENTAGE');

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const val = parseInt(e.target.value);

  //   setValues({
  //     ...values,
  //     [e.target.name]: val,
  //   });
  // };

  // const resetForm = () => {
  //   const newValues: Recipe = Object.keys(values).reduce((acc, key) => {
  //     acc[key as keyof typeof values] = 0;
  //     return acc;
  //   }, {} as Recipe);

  //   setValues(newValues);
  // };

  return (
    <div className="flex flex-col md:flex-row space-x-4">
      <div className="border border-gray-400 w-full md:w-1/2">
        input form here
      </div>
      <div className="border border-gray-400 w-full md:w-1/2">
        <h2>Scaled</h2>
        <div>
          <label htmlFor="input-scale">Scale</label>
          <input
            type="number"
            min={0}
            step="0.1"
            value={scale}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setScale(parseFloat(e.target.value))
            }
          />
        </div>
        {Recipe.ingredients().map((ingredient) => (
          <div key={`output-${ingredient}`}>
            <div>
              {ingredient} -{' '}
              {Math.round(
                recipe.scaledIngredients(scale)[ingredient as Ingredient]
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
