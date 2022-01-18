// import React, { useState } from 'react';

// interface FormState {
//   flour: number;
//   water: number;
//   salt: number;
//   yeast: number;
// }

const Calculator = () => (
  <>
    <div>Calculator</div>
    {/* <form onSubmit={submitForm}> */}
    <form>
      <label htmlFor="flour">Flour</label>
      <input type="number" />
    </form>
  </>
);
// const [values, setValues] = useState({
//   flour: 0,
//   water: 0,
//   salt: 0,
//   yeast: 0,
// } as FormState);

// const resetForm = (): void => {
//   const newValues: FormState = Object.keys(values).reduce(
//     (acc, key: string) => {
//       acc[key] = 0;
//       return acc;
//     },
//     {}
//   );

//   setValues(newValues);
// };

// function updateValues(e: React.FormEvent<HTMLFormElement>) {
//   let { value } = e.target;
//   if (e.target.type === 'number') {
//     value = parseInt(e.target.value);
//   }

//   setValues({
//     ...values,
//     [e.target.name]: value,
//   });
// }

// function submitForm(e: React.FormEvent<HTMLFormElement>) {
//   e.preventDefault();

//   resetForm();
// }

export default Calculator;
