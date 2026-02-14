import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../../shared/formatCurrency';
import type { IPieChartSegment } from '../types';

interface PortfolioPieChartProps {
  data: IPieChartSegment[];
}

const COLORS = [
  '#3B82F6',
  '#10B981',
  '#F59E0B',
  '#EF4444',
  '#8B5CF6',
  '#EC4899',
  '#06B6D4',
  '#F97316',
];

interface ITooltipPayloadItem {
  name: string;
  value: number;
  payload: IPieChartSegment;
}

function CustomTooltip({ active, payload }: {
  active?: boolean;
  payload?: ITooltipPayloadItem[];
}) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const segment = payload[0].payload;
  return (
    <div className="rounded-lg bg-white px-3 py-2 shadow-lg border border-gray-200">
      <p className="font-semibold text-gray-900">{segment.ticker}</p>
      <p className="text-sm text-gray-600">
        Value: {formatCurrency(segment.value)}
      </p>
      <p className="text-sm text-gray-600">
        Share: {segment.percentage.toFixed(1)}%
      </p>
    </div>
  );
}

export function PortfolioPieChart({ data }: PortfolioPieChartProps) {
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Portfolio Allocation
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="ticker"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name }: { name?: string }) => name ?? ''}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.ticker}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
