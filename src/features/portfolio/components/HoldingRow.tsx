import { formatCurrency } from '../../../shared/formatCurrency';
import type { IHolding } from '../../../shared/types';

interface IHoldingRowProps {
  holding: IHolding;
  onDelete: (id: string) => Promise<void>;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pt-PT', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function HoldingRow({ holding, onDelete }: IHoldingRowProps) {
  const totalCost = holding.quantity * holding.buy_price;

  const handleDelete = () => {
    void onDelete(holding.id);
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 font-semibold text-gray-900">
        {holding.ticker}
      </td>
      <td className="px-4 py-3 text-gray-700">
        {holding.quantity}
      </td>
      <td className="px-4 py-3 text-gray-700">
        {formatCurrency(holding.buy_price)}
      </td>
      <td className="px-4 py-3 text-gray-700">
        {formatDate(holding.buy_date)}
      </td>
      <td className="px-4 py-3 font-medium text-gray-900">
        {formatCurrency(totalCost)}
      </td>
      <td className="px-4 py-3">
        <button
          type="button"
          onClick={handleDelete}
          className="rounded bg-red-500 px-3 py-1 text-sm font-medium text-white hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
