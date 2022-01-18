import { FormState, CalcMode } from './Calculator';
import { calcBakersPercentage } from '../lib/calculations';

const DisplayTable = ({ data, mode }: { data: FormState; mode: CalcMode }) => (
  <div>
    {mode}
    {Object.keys(data).map((ingredient) => (
      <p key={ingredient}>
        {ingredient} -{' '}
        {calcBakersPercentage(
          data.flour,
          data[ingredient as keyof typeof data]
        )}
        {mode === 'WEIGHT' ? 'g' : '%'}
      </p>
    ))}
  </div>
);

export default DisplayTable;
