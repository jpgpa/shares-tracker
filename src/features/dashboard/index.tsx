import { PageLayout } from '../../shared/components/PageLayout';
import { LoadingSpinner } from '../../shared/components/LoadingSpinner';
import { ErrorMessage } from '../../shared/components/ErrorMessage';
import { SummaryCards } from './components/SummaryCards';
import { StockStatsTable } from './components/StockStatsTable';
import { PortfolioPieChart } from './components/PortfolioPieChart';
import { PerformanceChart } from './components/PerformanceChart';
import { useDashboard } from './hooks/useDashboard';

export function DashboardPage() {
  const {
    stockSummaries,
    portfolioSummary,
    pieChartData,
    performanceData,
    loading,
    error,
    refetch,
  } = useDashboard();

  if (loading) {
    return (
      <PageLayout title="Dashboard">
        <LoadingSpinner />
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout title="Dashboard">
        <ErrorMessage message={error} />
      </PageLayout>
    );
  }

  if (stockSummaries.length === 0) {
    return (
      <PageLayout title="Dashboard">
        <div className="rounded-lg bg-white p-8 text-center shadow">
          <p className="text-gray-500">
            No holdings yet. Head over to the{' '}
            <a href="/portfolio" className="text-blue-600 underline">
              Portfolio
            </a>{' '}
            page to add your first shares.
          </p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Dashboard">
      <div className="mb-4 flex justify-end">
        <button
          onClick={refetch}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>

      <SummaryCards summary={portfolioSummary} />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <PortfolioPieChart data={pieChartData} />
        <PerformanceChart data={performanceData} />
      </div>

      <div className="mt-6">
        <StockStatsTable stocks={stockSummaries} />
      </div>
    </PageLayout>
  );
}
