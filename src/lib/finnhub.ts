import type { IStockQuote, IStockCandle } from '../shared/types';

const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY as string;
const BASE_URL = 'https://finnhub.io/api/v1';

interface FinnhubQuoteResponse {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
}

interface FinnhubCandleResponse {
  c: number[];
  h: number[];
  l: number[];
  o: number[];
  v: number[];
  t: number[];
  s: string;
}

export async function fetchQuote(ticker: string): Promise<IStockQuote> {
  const res = await fetch(
    `${BASE_URL}/quote?symbol=${encodeURIComponent(ticker)}&token=${API_KEY}`
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch quote for ${ticker}`);
  }
  const data: FinnhubQuoteResponse = await res.json();
  return {
    currentPrice: data.c,
    change: data.d,
    changePercent: data.dp,
    highPrice: data.h,
    lowPrice: data.l,
    openPrice: data.o,
    previousClose: data.pc,
  };
}

export async function fetchQuotes(
  tickers: string[]
): Promise<Record<string, IStockQuote>> {
  const uniqueTickers = [...new Set(tickers)];
  const quotes: Record<string, IStockQuote> = {};

  for (const ticker of uniqueTickers) {
    quotes[ticker] = await fetchQuote(ticker);
  }

  return quotes;
}

export async function fetchCandles(
  ticker: string,
  from: number,
  to: number,
  resolution: string = 'D'
): Promise<IStockCandle> {
  const params = new URLSearchParams({
    symbol: ticker,
    resolution,
    from: String(from),
    to: String(to),
    token: API_KEY,
  });

  const res = await fetch(`${BASE_URL}/stock/candle?${params}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch candles for ${ticker}`);
  }

  const data: FinnhubCandleResponse = await res.json();
  return {
    close: data.c,
    high: data.h,
    low: data.l,
    open: data.o,
    volume: data.v,
    timestamp: data.t,
    status: data.s,
  };
}
