import React, { useState } from 'react';
import DisplayTable from './DisplayTable';
import ScalableRecipe from './ScalableRecipe';

export interface FormState {
  flour: number;
  water: number;
  salt: number;
  yeast: number;
}

export type CalcMode = 'WEIGHT' | 'PERCENTAGE';

const Calculator = () => {
  const [values, setValues] = useState({
    flour: 500,
    water: 350,
    salt: 12,
    yeast: 2,
  } as FormState);
  const [mode, setMode] = useState('PERCENTAGE' as CalcMode);
  const swapMode = () =>
    mode === 'PERCENTAGE' ? setMode('WEIGHT') : setMode('PERCENTAGE');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);

    setValues({
      ...values,
      [e.target.name]: val,
    });
  };

  const resetForm = () => {
    const newValues: FormState = Object.keys(values).reduce((acc, key) => {
      acc[key as keyof typeof values] = 0;
      return acc;
    }, {} as FormState);

    setValues(newValues);
  };

  return (
    <>
      <h1>Calculator</h1>
      <div className="flex flex-col md:flex-row space-x-4">
        <div className="border border-gray-400 w-full md:w-1/2">
          {Object.keys(values).map((field) => (
            <div key={field} className="text-center my-2">
              <label htmlFor={field} className="w-1/4 inline-block text-center">
                {field.replace(/^\w/, (c) => c.toUpperCase())}
              </label>
              <input
                name={field}
                id={field}
                type="number"
                onChange={handleChange}
                value={values[field as keyof typeof values]}
                className="bg-gray-400 w-1/4 text-center"
              />
            </div>
          ))}
          <button type="button" onClick={resetForm}>
            Clear
          </button>
          <button type="button" onClick={swapMode}>
            Swap
          </button>
        </div>
        <div className="border border-gray-700 w-full md:w-1/2">
          <DisplayTable data={values} mode={mode} />
        </div>
      </div>
      <ScalableRecipe />
    </>
  );
};

export default Calculator;
