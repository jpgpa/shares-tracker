import { formatCurrency } from '../../../shared/formatCurrency';
import type { IPortfolioSummary } from '../../../shared/types';

interface SummaryCardsProps {
  summary: IPortfolioSummary;
}

export function SummaryCards({ summary }: SummaryCardsProps) {
  const isPositive = summary.totalGainLoss >= 0;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="rounded-lg bg-white p-6 shadow">
        <p className="text-sm font-medium text-gray-500">Total Invested</p>
        <p className="mt-1 text-2xl font-bold text-blue-600">
          {formatCurrency(summary.totalInvested)}
        </p>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <p className="text-sm font-medium text-gray-500">Current Value</p>
        <p className="mt-1 text-2xl font-bold text-blue-600">
          {formatCurrency(summary.currentValue)}
        </p>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <p className="text-sm font-medium text-gray-500">Total Gain/Loss</p>
        <p
          className={`mt-1 text-2xl font-bold ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {formatCurrency(summary.totalGainLoss)}
        </p>
        <p
          className={`text-sm ${
            isPositive ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {isPositive ? '+' : ''}
          {summary.totalGainLossPercent.toFixed(2)}%
        </p>
      </div>
    </div>
  );
}
