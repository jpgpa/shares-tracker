import type { IHolding } from '../../../shared/types';

import { HoldingRow } from './HoldingRow';

interface IHoldingsTableProps {
  holdings: IHolding[];
  onDelete: (id: string) => Promise<void>;
}

const COLUMNS = ['Ticker', 'Quantity', 'Buy Price', 'Buy Date', 'Total Cost', 'Actions'];

export function HoldingsTable({ holdings, onDelete }: IHoldingsTableProps) {
  if (holdings.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 px-6 py-12 text-center">
        <p className="text-gray-500">
          No holdings yet. Add your first holding above.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr>
            {COLUMNS.map((col) => (
              <th
                key={col}
                className="px-4 py-3 font-semibold text-gray-600"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {holdings.map((holding) => (
            <HoldingRow
              key={holding.id}
              holding={holding}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
