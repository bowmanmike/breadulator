import React, { useState } from 'react';

interface FormState {
  flour: number;
  water: number;
  salt: number;
  yeast: number;
}

const Calculator = () => {
  const [values, setValues] = useState({
    flour: 0,
    water: 0,
    salt: 0,
    yeast: 0,
  } as FormState);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('submitting');
    console.log({ values });
  };

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
      <div>Calculator</div>
      <form onSubmit={submitForm}>
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
        <button type="submit">Submit</button>
        <button type="button" onClick={resetForm}>
          Clear
        </button>
      </form>
      <div>
        <h1>Percentages</h1>
      </div>
      <div>
        <h1>State</h1>
        {Object.keys(values).map((k) => (
          <div key={k}>
            {k} - {values[k as keyof typeof values]}
          </div>
        ))}
      </div>
    </>
  );
};

export default Calculator;
