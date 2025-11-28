import { useState, useEffect, useCallback } from 'react';
export const useApi = (apiFunction, dependencies = [], immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);

      try {
        const result = await apiFunction(...args);
        setData(result);
        return result;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, immediate]);

  return {
    data,
    loading,
    error,
    execute,
    refetch: execute,
    reset,
  };
};

export const useMutation = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (apiFunction, ...args) => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    mutate,
    loading,
    error,
    data,
    reset,
  };
};

export const usePagination = (
  apiFunction,
  initialParams = { page: 1, limit: 10 }
) => {
  const [params, setParams] = useState(initialParams);
  const [allData, setAllData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const {
    data,
    loading,
    error,
    execute: fetchData,
  } = useApi(() => apiFunction(params), [JSON.stringify(params)], true);

  useEffect(() => {
    if (data) {
      if (params.page === 1) {
        // Reset data for first page
        setAllData(data.items || data.data || []);
      } else {
        // Append data for subsequent pages
        setAllData((prev) => [...prev, ...(data.items || data.data || [])]);
      }

      setTotalCount(data.total || data.totalCount || 0);
      setHasMore(
        data.hasMore || (data.items || data.data || []).length === params.limit
      );
    }
  }, [data, params.page, params.limit]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setParams((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  }, [loading, hasMore]);

  const refresh = useCallback(() => {
    setParams((prev) => ({ ...prev, page: 1 }));
    setAllData([]);
  }, []);

  const updateParams = useCallback((newParams) => {
    setParams((prev) => ({ ...prev, ...newParams, page: 1 }));
    setAllData([]);
  }, []);

  return {
    data: allData,
    loading,
    error,
    totalCount,
    hasMore,
    params,
    loadMore,
    refresh,
    updateParams,
    refetch: fetchData,
  };
};
