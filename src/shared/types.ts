export interface IHolding {
  id: string;
  ticker: string;
  quantity: number;
  buy_price: number;
  buy_date: string;
  created_at: string;
}

export interface IHoldingInsert {
  ticker: string;
  quantity: number;
  buy_price: number;
  buy_date: string;
}

export interface IStockQuote {
  currentPrice: number;
  change: number;
  changePercent: number;
  highPrice: number;
  lowPrice: number;
  openPrice: number;
  previousClose: number;
}

export interface IStockCandle {
  close: number[];
  high: number[];
  low: number[];
  open: number[];
  volume: number[];
  timestamp: number[];
  status: string;
}

export interface IStockSummary {
  ticker: string;
  totalQuantity: number;
  totalInvested: number;
  averageBuyPrice: number;
  currentPrice: number;
  currentValue: number;
  gainLoss: number;
  gainLossPercent: number;
}

export interface IPortfolioSummary {
  totalInvested: number;
  currentValue: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
}
