import { FormState } from './Calculator';

const GramsTable = ({ data }: { data: FormState }) => (
  <div>
    <h1>Table</h1>
    {Object.keys(data).map((ingredient) => (
      <p key={ingredient}>
        {ingredient} - {data[ingredient as keyof typeof data]}g
      </p>
    ))}
  </div>
);

export default GramsTable;
