import { useState } from 'react';

import type { IHoldingInsert } from '../../../shared/types';
import type { IFormErrors, IHoldingFormState } from '../types';

interface IHoldingFormProps {
  onSubmit: (data: IHoldingInsert) => Promise<void>;
}

const INITIAL_FORM_STATE: IHoldingFormState = {
  ticker: '',
  quantity: '',
  buyPrice: '',
  buyDate: '',
};

function validate(form: IHoldingFormState): IFormErrors {
  const errors: IFormErrors = {};

  if (!form.ticker.trim()) {
    errors.ticker = 'Ticker is required';
  }

  const qty = Number(form.quantity);
  if (!form.quantity || isNaN(qty) || qty <= 0) {
    errors.quantity = 'Quantity must be greater than 0';
  }

  const price = Number(form.buyPrice);
  if (!form.buyPrice || isNaN(price) || price <= 0) {
    errors.buyPrice = 'Buy price must be greater than 0';
  }

  if (!form.buyDate) {
    errors.buyDate = 'Buy date is required';
  } else if (new Date(form.buyDate) > new Date()) {
    errors.buyDate = 'Buy date cannot be in the future';
  }

  return errors;
}

export function HoldingForm({ onSubmit }: IHoldingFormProps) {
  const [form, setForm] = useState<IHoldingFormState>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<IFormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof IHoldingFormState, value: string) => {
    const newValue = field === 'ticker' ? value.toUpperCase() : value;
    setForm((prev) => ({ ...prev, [field]: newValue }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    await onSubmit({
      ticker: form.ticker.trim(),
      quantity: Number(form.quantity),
      buy_price: Number(form.buyPrice),
      buy_date: form.buyDate,
    });

    setForm(INITIAL_FORM_STATE);
    setErrors({});
    setSubmitting(false);
  };

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className="mb-8 rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Add Holding</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor="ticker" className="mb-1 block text-sm font-medium text-gray-700">Ticker</label>
          <input id="ticker" type="text" value={form.ticker} onChange={(e) => handleChange('ticker', e.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" placeholder="IWDA.AS, VWCE.DE" />
          {errors.ticker && <p className="mt-1 text-xs text-red-600">{errors.ticker}</p>}
        </div>

        <div>
          <label htmlFor="quantity" className="mb-1 block text-sm font-medium text-gray-700">Quantity</label>
          <input id="quantity" type="number" value={form.quantity} onChange={(e) => handleChange('quantity', e.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" placeholder="10" min="0" step="1" />
          {errors.quantity && <p className="mt-1 text-xs text-red-600">{errors.quantity}</p>}
        </div>

        <div>
          <label htmlFor="buyPrice" className="mb-1 block text-sm font-medium text-gray-700">Buy Price</label>
          <input id="buyPrice" type="number" value={form.buyPrice} onChange={(e) => handleChange('buyPrice', e.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" placeholder="150.00" min="0" step="0.01" />
          {errors.buyPrice && <p className="mt-1 text-xs text-red-600">{errors.buyPrice}</p>}
        </div>

        <div>
          <label htmlFor="buyDate" className="mb-1 block text-sm font-medium text-gray-700">Buy Date</label>
          <input id="buyDate" type="date" value={form.buyDate} onChange={(e) => handleChange('buyDate', e.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
          {errors.buyDate && <p className="mt-1 text-xs text-red-600">{errors.buyDate}</p>}
        </div>
      </div>

      <div className="mt-4">
        <button type="submit" disabled={submitting}
          className="rounded bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors">
          {submitting ? 'Adding...' : 'Add Holding'}
        </button>
      </div>
    </form>
  );
}
