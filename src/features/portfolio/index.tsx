import { ErrorMessage } from '../../shared/components/ErrorMessage';
import { LoadingSpinner } from '../../shared/components/LoadingSpinner';
import { PageLayout } from '../../shared/components/PageLayout';
import { HoldingForm } from './components/HoldingForm';
import { HoldingsTable } from './components/HoldingsTable';
import { usePortfolio } from './hooks/usePortfolio';

export function PortfolioPage() {
  const { holdings, loading, error, addHolding, deleteHolding } = usePortfolio();

  return (
    <PageLayout title="Portfolio">
      <HoldingForm onSubmit={addHolding} />

      {loading && <LoadingSpinner />}

      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <HoldingsTable holdings={holdings} onDelete={deleteHolding} />
      )}
    </PageLayout>
  );
}
