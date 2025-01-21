// weatherService.js
import axios from "axios";

const apiKey = "44188e003e154e15a4a182122252101";

export const fetchWeather = async (latitude, longitude) => {
  const params = {
    key: apiKey,
    q: `${latitude},${longitude}`,
  };
  try {
    const response = await axios.get(
      "https://api.weatherapi.com/v1/current.json",
      { params }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error; // Re-throw for component-level handling
  }
};
