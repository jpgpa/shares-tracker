import type { IStockSummary } from '../../../shared/types';
import { StockStatsRow } from './StockStatsRow';

interface StockStatsTableProps {
  stocks: IStockSummary[];
}

const COLUMNS = [
  'Ticker',
  'Avg Buy Price',
  'Current Price',
  'Shares',
  'Invested',
  'Value',
  'Gain/Loss',
  '%',
];

export function StockStatsTable({ stocks }: StockStatsTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow">
      <table className="w-full table-auto text-left text-sm">
        <thead>
          <tr className="border-b-2 border-gray-200 bg-gray-50">
            {COLUMNS.map((col) => (
              <th
                key={col}
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <StockStatsRow key={stock.ticker} stock={stock} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
