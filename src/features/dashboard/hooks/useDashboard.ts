import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { useStockQuotes } from './useStockQuotes';
import type { IHolding, IStockSummary, IPortfolioSummary } from '../../../shared/types';
import type { IPieChartSegment, IPerformanceDataPoint } from '../types';

function buildStockSummaries(
  holdings: IHolding[],
  quotes: Record<string, { currentPrice: number }>
): IStockSummary[] {
  const grouped = new Map<string, IHolding[]>();
  for (const h of holdings) {
    const list = grouped.get(h.ticker) ?? [];
    list.push(h);
    grouped.set(h.ticker, list);
  }

  return Array.from(grouped.entries()).map(([ticker, items]) => {
    const totalQuantity = items.reduce((sum, h) => sum + h.quantity, 0);
    const totalInvested = items.reduce((sum, h) => sum + h.quantity * h.buy_price, 0);
    const averageBuyPrice = totalInvested / totalQuantity;
    const currentPrice = quotes[ticker]?.currentPrice ?? 0;
    const currentValue = totalQuantity * currentPrice;
    const gainLoss = currentValue - totalInvested;
    const gainLossPercent = totalInvested > 0 ? (gainLoss / totalInvested) * 100 : 0;

    return {
      ticker, totalQuantity, totalInvested, averageBuyPrice,
      currentPrice, currentValue, gainLoss, gainLossPercent,
    };
  });
}

function buildPortfolioSummary(summaries: IStockSummary[]): IPortfolioSummary {
  const totalInvested = summaries.reduce((s, x) => s + x.totalInvested, 0);
  const currentValue = summaries.reduce((s, x) => s + x.currentValue, 0);
  const totalGainLoss = currentValue - totalInvested;
  const totalGainLossPercent = totalInvested > 0 ? (totalGainLoss / totalInvested) * 100 : 0;
  return { totalInvested, currentValue, totalGainLoss, totalGainLossPercent };
}

function buildPieChartData(summaries: IStockSummary[]): IPieChartSegment[] {
  const totalValue = summaries.reduce((s, x) => s + x.currentValue, 0);
  if (totalValue === 0) return [];
  return summaries.map((s) => ({
    ticker: s.ticker,
    value: s.currentValue,
    percentage: (s.currentValue / totalValue) * 100,
  }));
}

function buildPerformanceData(holdings: IHolding[]): IPerformanceDataPoint[] {
  const sorted = [...holdings].sort(
    (a, b) => new Date(a.buy_date).getTime() - new Date(b.buy_date).getTime()
  );
  let cumulative = 0;
  return sorted.map((h) => {
    cumulative += h.quantity * h.buy_price;
    return { date: h.buy_date, value: cumulative };
  });
}

async function queryHoldings(): Promise<{
  data: IHolding[];
  errorMessage: string | null;
}> {
  const { data, error } = await supabase.from('holdings').select('*');
  if (error) {
    return { data: [], errorMessage: error.message };
  }
  return { data: (data as IHolding[]) ?? [], errorMessage: null };
}

export function useDashboard() {
  const [holdings, setHoldings] = useState<IHolding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHoldings = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await queryHoldings();
    setHoldings(result.data);
    setError(result.errorMessage);
    setLoading(false);
  }, []);

  useEffect(() => {
    let cancelled = false;

    queryHoldings().then((result) => {
      if (!cancelled) {
        setHoldings(result.data);
        setError(result.errorMessage);
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const tickers = useMemo(
    () => [...new Set(holdings.map((h) => h.ticker))],
    [holdings]
  );

  const {
    quotes,
    loading: quotesLoading,
    error: quotesError,
    refetch: refetchQuotes,
  } = useStockQuotes(tickers);

  const stockSummaries = useMemo(
    () => buildStockSummaries(holdings, quotes), [holdings, quotes]
  );
  const portfolioSummary = useMemo(
    () => buildPortfolioSummary(stockSummaries), [stockSummaries]
  );
  const pieChartData = useMemo(
    () => buildPieChartData(stockSummaries), [stockSummaries]
  );
  const performanceData = useMemo(
    () => buildPerformanceData(holdings), [holdings]
  );

  const refetch = useCallback(() => {
    fetchHoldings();
    refetchQuotes();
  }, [fetchHoldings, refetchQuotes]);

  return {
    stockSummaries, portfolioSummary, pieChartData, performanceData,
    loading: loading || quotesLoading,
    error: error ?? quotesError,
    refetch,
  };
}
