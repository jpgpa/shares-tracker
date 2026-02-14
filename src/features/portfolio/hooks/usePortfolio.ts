import { useCallback, useEffect, useState } from 'react';

import type { IHolding, IHoldingInsert } from '../../../shared/types';

import { supabase } from '../../../lib/supabase';

async function queryHoldings(): Promise<{ data: IHolding[]; errorMessage: string | null }> {
  const { data, error } = await supabase
    .from('holdings')
    .select('*')
    .order('buy_date', { ascending: false });

  if (error) {
    return { data: [], errorMessage: error.message };
  }

  return { data: (data as IHolding[]) ?? [], errorMessage: null };
}

export function usePortfolio() {
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

  const addHolding = useCallback(
    async (data: IHoldingInsert) => {
      setError(null);

      const { error: insertError } = await supabase
        .from('holdings')
        .insert(data);

      if (insertError) {
        setError(insertError.message);
        return;
      }

      await fetchHoldings();
    },
    [fetchHoldings],
  );

  const deleteHolding = useCallback(
    async (id: string) => {
      setError(null);

      const { error: deleteError } = await supabase
        .from('holdings')
        .delete()
        .eq('id', id);

      if (deleteError) {
        setError(deleteError.message);
        return;
      }

      await fetchHoldings();
    },
    [fetchHoldings],
  );

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

  return { holdings, loading, error, addHolding, deleteHolding };
}
