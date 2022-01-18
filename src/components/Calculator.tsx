import React, { useState } from 'react';
import DisplayTable from './DisplayTable';

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
    <div>
      <h1>Calculator</h1>
      <div>
        {Object.keys(values).map((field) => (
          <div key={field}>
            <label htmlFor={field}>
              {field.replace(/^\w/, (c) => c.toUpperCase())}
            </label>
            <input
              name={field}
              type="number"
              onChange={handleChange}
              value={values[field as keyof typeof values]}
            />
          </div>
        ))}
      </div>
      <button type="button" onClick={resetForm}>
        Clear
      </button>
      <div>
        <DisplayTable data={values} mode={mode} />
      </div>
    </div>
  );
};

export default Calculator;
