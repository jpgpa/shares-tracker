import { useState, useEffect, useCallback } from 'react';
import type { IStockQuote } from '../../../shared/types';
import { fetchQuotes } from '../../../lib/finnhub';

interface IUseStockQuotesReturn {
  quotes: Record<string, IStockQuote>;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

async function queryQuotes(
  tickers: string[]
): Promise<{ data: Record<string, IStockQuote>; errorMessage: string | null }> {
  if (tickers.length === 0) {
    return { data: {}, errorMessage: null };
  }

  try {
    const data = await fetchQuotes(tickers);
    return { data, errorMessage: null };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Failed to fetch quotes';
    return { data: {}, errorMessage: message };
  }
}

export function useStockQuotes(tickers: string[]): IUseStockQuotesReturn {
  const [quotes, setQuotes] = useState<Record<string, IStockQuote>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const serializedTickers = JSON.stringify([...tickers].sort());

  useEffect(() => {
    let cancelled = false;
    const parsedTickers: string[] = JSON.parse(serializedTickers);

    setLoading(true);
    queryQuotes(parsedTickers).then((result) => {
      if (!cancelled) {
        setQuotes(result.data);
        setError(result.errorMessage);
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [serializedTickers]);

  const refetch = useCallback(async () => {
    const parsedTickers: string[] = JSON.parse(serializedTickers);
    setLoading(true);
    setError(null);

    const result = await queryQuotes(parsedTickers);
    setQuotes(result.data);
    setError(result.errorMessage);
    setLoading(false);
  }, [serializedTickers]);

  return { quotes, loading, error, refetch };
}
