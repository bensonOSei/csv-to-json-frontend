import { useState, useEffect, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource } from "axios";

interface UseApiProps<T> {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: any; // Body payload for POST, PUT requests
  headers?: Record<string, string>;
  params?: Record<string, any>; // Query parameters
  dependencies?: any[];
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
}

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: any;
  refetch: () => void;
  cancelRequest: () => void;
}

export function useApi<T>({
  url,
  method = "GET",
  data = null,
  headers = { "Content-Type": "application/json" },
  params = {},
  dependencies = [],
  onSuccess,
  onError,
}: UseApiProps<T>): UseApiResult<T> {
  const [responseData, setResponseData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [cancelTokenSource, setCancelTokenSource] = useState<CancelTokenSource | null>(null);

  const fetchData = useCallback(async () => {
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setLoading(true);
    setError(null);

    try {
      const config: AxiosRequestConfig = {
        url,
        method,
        headers,
        params,
        data,
        cancelToken: source.token,
      };

      const response: AxiosResponse<T> = await axios(config);

      setResponseData(response.data);
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Request canceled:", err.message);
      } else {
        setError(err);
        if (onError) {
          onError(err);
        }
      }
    } finally {
      setLoading(false);
    }
  }, [url, method, data, headers, params, onSuccess, onError]);

  useEffect(() => {
    fetchData();

    return () => {
      if (cancelTokenSource) {
        cancelTokenSource.cancel("Operation canceled by the user.");
      }
    };
  }, dependencies); // Automatically refetch if dependencies change

  const refetch = () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel("Operation canceled by the user.");
    }
    fetchData();
  };

  const cancelRequest = () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel("Operation canceled by the user.");
    }
  };

  return { data: responseData, loading, error, refetch, cancelRequest };
}
