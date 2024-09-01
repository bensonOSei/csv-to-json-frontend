import { useState, useEffect, useCallback, useRef } from "react";
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
  progress: number;
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
  const [progress, setProgress] = useState<number>(0);
  const renderCount = useRef(0)


  const fetchData = useCallback(async () => {
    console.log("Fetching data...");
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setLoading(true);
    setError(null);
    setProgress(0);

    try {
      const config: AxiosRequestConfig = {
        url,
        method,
        headers,
        params,
        data,
        cancelToken: source.token,
        onUploadProgress: (progressEvent) => {
          const progress = (progressEvent.loaded / (progressEvent.total || 1)) * 50;
          setProgress(progress);
        },
        onDownloadProgress: (progressEvent) => {
          const progress = 50 + (progressEvent.loaded / (progressEvent.total || 1)) * 50;
          setProgress(progress);
        }
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
      setCancelTokenSource(null); // Clear the cancel token after request completes
    }
  }, [url, method, data, headers, params, onSuccess, onError]);

  useEffect(() => {
    renderCount.current += 1;
    console.log({ renderCount });
    fetchData();

    return () => {
      if (cancelTokenSource) {
        cancelTokenSource.cancel("Operation canceled by the user.");
      }
    };
  }, dependencies); // Automatically refetch if dependencies change

  const refetch = useCallback(() => {
    console.log("Refetching data...");
    if (cancelTokenSource) {
      cancelTokenSource.cancel("Operation canceled by the user.");
    }
    fetchData();
  }, [fetchData, cancelTokenSource]);

  const cancelRequest = useCallback(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel("Operation canceled by the user.");
    }
  }, [cancelTokenSource]);

  return { data: responseData, loading, error, refetch, cancelRequest, progress };
}
