import React, { useState } from 'react';
import { FormState } from './Calculator';

const ScalableRecipe = () => {
  const [values, setValues] = useState({
    flour: 750,
    water: 70,
    salt: 5,
    yeast: 0.5,
  } as FormState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);

    setValues({
      ...values,
      [e.target.name]: val,
    });
  };

  const calcFromPercentage = (flour: number, other: number) =>
    Math.round((flour * other) / 100);

  return (
    <div>
      <div>
        <p>Build Recipe From Baker's Percentages</p>
        {Object.keys(values).map((field) => (
          <div key={`input-${field}`} className="text-center my-2">
            <label htmlFor={field} className="w-1/4 inline-block text-center">
              {field.replace(/^\w/, (c) => c.toUpperCase())}{' '}
              {field !== 'flour' ? '(%)' : '(g)'}
            </label>
            <input
              name={field}
              id={field}
              type="number"
              onChange={handleChange}
              value={values[field as keyof typeof values]}
              className="bg-gray-400 w-1/4 text-center"
              min="0"
              step="0.5"
            />
          </div>
        ))}
      </div>
      <div>
        <p>Result</p>
        {Object.keys(values).map((field) => (
          <div key={`output-${field}`}>
            <p>
              {field.replace(/^\w/, (c) => c.toUpperCase())} -{' '}
              {field === 'flour'
                ? values.flour
                : calcFromPercentage(
                    values.flour,
                    values[field as keyof typeof values]
                  )}{' '}
              (g)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScalableRecipe;
