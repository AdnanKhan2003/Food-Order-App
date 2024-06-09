import { useCallback, useEffect, useState } from "react";

export async function sendHTTPRequest(url, config) {
  const response = await fetch(url, config);
  const data = response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!!!");
  }

  return data;
}

export function useHttp(url, config, initialValue) {
  const [data, setData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function clearData() {
    setData(initialValue);
  }

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHTTPRequest(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        setError(error.message || "Something went wrong!!!");
      } finally {
        setIsLoading(false);
      }
    },
    [url, config]
  );

  useEffect(() => {
    if (config && (config.method === "GET" || !config || !config.method)) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return { data, isLoading, error, sendRequest, clearData };
}
