import React, { useState, useEffect, useRef, useCallback } from "react";

function WeatherApp() {
  const [city, setCity] = useState("New York");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const cache = useRef({});
  const backgroundFetchTimeout = useRef(null);
  const API_FAILURE_COUNT = useRef(0);
  const MAX_API_RETRIES = 3;
  const RETRY_DELAY = 2000; // milliseconds
  const DEBOUNCE_DELAY = 500;
  const CACHE_EXPIRY_MS = 60 * 1000; // 1 minute
  const BACKGROUND_REFRESH_INTERVAL = 2 * 60 * 1000; // 2 minutes

  const debounce = useCallback((func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  }, []);

  const fetchWeatherData = useCallback(
    async (cityToFetch, isBackground = false, retryAttempt = 0) => {
      if (!cityToFetch.trim()) return;

      if (!isBackground) setLoading(true);
      setError(null);

      const cachedData = cache.current[cityToFetch];
      const headers = new Headers();
      if (cachedData && cachedData.etag) {
        headers.append("If-None-Match", cachedData.etag);
      }

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityToFetch}&appid=f35ff8dad69f75883b4254de476ff958`,
          { headers }
        );

        if (response.status === 304) {
          console.log("Serving from cache (ETag):", cityToFetch);
          if (!isBackground) setWeather(cachedData.data);
          return;
        }

        if (!response.ok) {
          if (retryAttempt < MAX_API_RETRIES) {
            console.log(
              `Retrying API call for ${cityToFetch} (attempt ${
                retryAttempt + 1
              })...`
            );
            await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
            return fetchWeatherData(
              cityToFetch,
              isBackground,
              retryAttempt + 1
            );
          }
          API_FAILURE_COUNT.current++;
          const errorMessage =
            response.status === 404
              ? "City not found."
              : `Failed to fetch weather data. Server returned ${response.status}.`;
          if (!isBackground) setError(errorMessage);
          return;
        }

        const data = await response.json();
        if (!data || !data.main || data.main.temp === undefined) {
          if (!isBackground)
            setError("Received unexpected data format from the weather API.");
          return;
        }

        const weatherData = data.main;
        const etag = response.headers.get("ETag");

        cache.current = {
          ...cache.current,
          [cityToFetch]: { data: weatherData, etag, timestamp: Date.now() },
        };
        if (!isBackground) setWeather(weatherData);
        API_FAILURE_COUNT.current = 0; // Reset failure count on success
      } catch (error) {
        console.error("Error fetching weather:", error);
        if (retryAttempt < MAX_API_RETRIES) {
          console.log(
            `Retrying API call for ${cityToFetch} (attempt ${
              retryAttempt + 1
            })...`
          );
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
          return fetchWeatherData(cityToFetch, isBackground, retryAttempt + 1);
        }
        API_FAILURE_COUNT.current++;
        if (!isBackground)
          setError(
            "Failed to fetch weather data. Check your network connection."
          );
      } finally {
        if (!isBackground) setLoading(false);
      }
    },
    []
  );

  // Debounced fetch on city change
  useEffect(() => {
    setIsTyping(true);
    const debouncedFetch = debounce(() => {
      fetchWeatherData(city);
      setIsTyping(false);
    }, DEBOUNCE_DELAY);

    debouncedFetch();
    return () => clearTimeout(debouncedFetch.timeout);
  }, [city, fetchWeatherData, debounce]);

  // Background Refresh
  useEffect(() => {
    if (API_FAILURE_COUNT.current >= MAX_API_RETRIES) {
      console.log("Background refresh paused due to persistent API failures.");
      return; // Stop background refresh if API is consistently failing
    }

    const scheduleRefresh = () => {
      backgroundFetchTimeout.current = setTimeout(() => {
        if (city) {
          console.log("Initiating background refresh for:", city);
          fetchWeatherData(city, true);
        }
        scheduleRefresh();
      }, BACKGROUND_REFRESH_INTERVAL);
    };

    scheduleRefresh();
    return () => clearTimeout(backgroundFetchTimeout.current);
  }, [city, fetchWeatherData]);

  // Consider showing a message if API is persistently failing
  useEffect(() => {
    if (API_FAILURE_COUNT.current >= MAX_API_RETRIES) {
      setError(
        "Weather data is currently unavailable. Please try again later."
      );
      setLoading(false); // Ensure loading state is cleared
    }
  }, [API_FAILURE_COUNT]);

  const kelvinToCelsius = (kelvin) => Math.round(kelvin - 273.15);

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      {isTyping && <div>Typing...</div>}
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      {weather && (
        <div>
          <h2>Temperature: \( {kelvinToCelsius(weather.temp)} \)°C</h2>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
