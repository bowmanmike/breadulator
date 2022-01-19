import { FormState } from './Calculator';
import { calcBakersPercentage } from '../lib/calculations';

const PercentageTable = ({ data }: { data: FormState }) => (
  <div>
    <h1>Table</h1>
    {Object.keys(data).map((ingredient) => (
      <p key={ingredient}>
        {ingredient} -{' '}
        {calcBakersPercentage(
          data.flour,
          data[ingredient as keyof typeof data]
        )}
        %
      </p>
    ))}
  </div>
);

export default PercentageTable;
