import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrencyCompact } from '../../../shared/formatCurrency';
import type { IPerformanceDataPoint } from '../types';

interface PerformanceChartProps {
  data: IPerformanceDataPoint[];
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Investment Over Time
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            stroke="#9CA3AF"
          />
          <YAxis
            tickFormatter={formatCurrencyCompact}
            tick={{ fontSize: 12 }}
            stroke="#9CA3AF"
          />
          <Tooltip
            formatter={(value?: string | number) => [
              Number(value ?? 0).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }),
              'Value',
            ]}
            labelFormatter={(label) => `Date: ${String(label)}`}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ r: 3, fill: '#3B82F6' }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
