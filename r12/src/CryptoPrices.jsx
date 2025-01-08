import React, { useState, useEffect, useRef, useCallback } from "react";

const useRetryFetch = (fetchFunction, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const attemptRef = useRef(0);
  const timeoutIdRef = useRef(null);
  const startTimeRef = useRef(null);

  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxRetryDelay = 60000,
    backoffStrategy = "exponential",
    jitter = true,
    retryPolicy, // New option for custom retry logic
  } = options;

  const fetchDataWithRetry = useCallback(async () => {
    const executeFetch = async () => {
      attemptRef.current++;
      setIsRetrying(attemptRef.current > 1);
      startTimeRef.current = startTimeRef.current || Date.now();
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchFunction();
        if (!response.ok) {
          const shouldRetryCustom = retryPolicy
            ? retryPolicy(response.status, response)
            : null;

          if (shouldRetryCustom === false) {
            setIsLoading(false);
            setIsRetrying(false);
            setError(
              `Request failed with status ${response.status} and will not be retried.`
            );
            return;
          }

          const shouldRetryDefault = !retryPolicy; // Retry by default if no custom policy

          if (shouldRetryCustom === true || shouldRetryDefault) {
            const retryAfterHeader = response.headers.get("Retry-After");
            let delay;

            if (retryAfterHeader) {
              const parsedRetryAfter = parseInt(retryAfterHeader, 10);
              delay =
                !isNaN(parsedRetryAfter) &&
                parsedRetryAfter > 0 &&
                parsedRetryAfter < maxRetryDelay / 1000
                  ? parsedRetryAfter * 1000
                  : calculateDelay(attemptRef.current);
            } else {
              delay = calculateDelay(attemptRef.current);
            }

            console.warn(
              `Request failed with status ${response.status}. Retrying in ${
                delay / 1000
              } seconds.`
            );
            timeoutIdRef.current = setTimeout(executeFetch, delay);
            return;
          }

          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);
        setIsRetrying(false);
        attemptRef.current = 0;
        startTimeRef.current = null;
      } catch (err) {
        console.error("Error fetching data:", err);
        const elapsedTime = Date.now() - startTimeRef.current;
        if (
          attemptRef.current <= maxRetries &&
          elapsedTime < maxRetryDelay * (maxRetries + 1)
        ) {
          const delay = calculateDelay(attemptRef.current);
          console.log(
            `Retrying due to error in ${delay / 1000} seconds (attempt ${
              attemptRef.current
            }/${maxRetries}).`
          );
          timeoutIdRef.current = setTimeout(executeFetch, delay);
        } else {
          setIsLoading(false);
          setIsRetrying(false);
          setError("Failed to fetch data after multiple retries.");
        }
      }
    };

    const calculateDelay = (attempt) => {
      let delay;
      if (backoffStrategy === "exponential") {
        delay = Math.min(
          Math.pow(2, attempt - 1) * initialDelay,
          maxRetryDelay
        );
      } else {
        // linear
        delay = Math.min(attempt * initialDelay, maxRetryDelay);
      }

      if (jitter) {
        const jitterValue = Math.random() * delay * 0.2; // Add up to 20% jitter
        delay += jitterValue * (Math.random() > 0.5 ? 1 : -1);
      }
      return Math.max(initialDelay, delay); // Ensure minimum delay
    };

    executeFetch();

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [
    fetchFunction,
    maxRetries,
    initialDelay,
    maxRetryDelay,
    backoffStrategy,
    jitter,
    retryPolicy,
  ]);

  useEffect(() => {
    // Initial fetch
    fetchDataWithRetry();

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [fetchDataWithRetry]);

  const retry = useCallback(() => {
    attemptRef.current = 0; // Reset attempt count for manual retry
    startTimeRef.current = null;
    fetchDataWithRetry();
  }, [fetchDataWithRetry]);

  return { data, error, isLoading, isRetrying, retry };
};

function CryptoPrices() {
  const coins = ["bitcoin", "ethereum", "dogecoin"];

  const fetchCryptoPrices = async () => {
    const ids = coins.join(",");
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
    );
    return response;
  };

  const {
    data: pricesData,
    error,
    isLoading,
    isRetrying,
    retry: refetchPrices,
  } = useRetryFetch(fetchCryptoPrices, {
    initialDelay: 1000,
    maxRetryDelay: 60000,
    jitter: true,
    backoffStrategy: "exponential",
    retryPolicy: (statusCode, response) => {
      if (statusCode === 429) {
        console.log(
          "Custom retry policy: Handling 429 (Rate Limit) with a specific strategy."
        );
        return true; // Indicate should retry, the delay will be handled by Retry-After or backoff
      } else if (statusCode === 500 || statusCode === 503) {
        console.log(
          `Custom retry policy: Handling ${statusCode} with standard retries.`
        );
        return true;
      } else {
        console.warn(
          `Custom retry policy: Not retrying for status code ${statusCode}.`
        );
        return false;
      }
    },
  });

  const [prices, setPrices] = useState({});

  useEffect(() => {
    if (pricesData) {
      setPrices(pricesData);
    }
  }, [pricesData]);

  return (
    <div>
      <h1>Cryptocurrency Prices</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {isRetrying && <p>Retrying...</p>}
      <table>
        <thead>
          <tr>
            <th>Cryptocurrency</th>
            <th>Price (USD)</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin}>
              <td>{coin.charAt(0).toUpperCase() + coin.slice(1)}</td>
              <td>
                {prices[coin]
                  ? `$${prices[coin]?.usd}`
                  : isLoading
                  ? "Loading..."
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={refetchPrices} disabled={isLoading}>
        {isLoading ? "Loading..." : "Refresh Prices"}
      </button>
    </div>
  );
}

export default CryptoPrices;
