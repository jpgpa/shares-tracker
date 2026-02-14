import { formatCurrency } from '../../../shared/formatCurrency';
import type { IStockSummary } from '../../../shared/types';

interface StockStatsRowProps {
  stock: IStockSummary;
}

export function StockStatsRow({ stock }: StockStatsRowProps) {
  const isPositive = stock.gainLoss >= 0;
  const colorClass = isPositive ? 'text-green-600' : 'text-red-600';

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-4 py-3 font-semibold text-gray-900">
        {stock.ticker}
      </td>
      <td className="px-4 py-3 text-gray-700">
        {formatCurrency(stock.averageBuyPrice)}
      </td>
      <td className="px-4 py-3 text-gray-700">
        {formatCurrency(stock.currentPrice)}
      </td>
      <td className="px-4 py-3 text-gray-700">{stock.totalQuantity}</td>
      <td className="px-4 py-3 text-gray-700">
        {formatCurrency(stock.totalInvested)}
      </td>
      <td className="px-4 py-3 text-gray-700">
        {formatCurrency(stock.currentValue)}
      </td>
      <td className={`px-4 py-3 font-medium ${colorClass}`}>
        {isPositive ? '+' : ''}
        {formatCurrency(stock.gainLoss)}
      </td>
      <td className={`px-4 py-3 font-medium ${colorClass}`}>
        {isPositive ? '+' : ''}
        {stock.gainLossPercent.toFixed(2)}%
      </td>
    </tr>
  );
}
