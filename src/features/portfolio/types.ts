export interface IHoldingFormState {
  ticker: string;
  quantity: string;
  buyPrice: string;
  buyDate: string;
}

export interface IFormErrors {
  ticker?: string;
  quantity?: string;
  buyPrice?: string;
  buyDate?: string;
}
