import { FormState, CalcMode } from './Calculator';
import PercentageTable from './PercentageTable';
import GramsTable from './GramsTable';

const DisplayTable = ({ data, mode }: { data: FormState; mode: CalcMode }) => (
  <div>
    {mode === 'PERCENTAGE' ? (
      <PercentageTable data={data} />
    ) : (
      <GramsTable data={data} />
    )}
  </div>
);

export default DisplayTable;
