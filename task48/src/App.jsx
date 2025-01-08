import React from "react";
import "./WeatherCards.css";
import SunIcon from "./sun.png";
import RainIcon from "./rain.png";
import SnowIcon from "./snow.png";
import CloudIcon from "./cloud.png";

const weatherData = [
  {
    location: "Miami, USA",
    city: "Miami",
    country: "USA",
    conditions: "Sunny",
    temperature: 85,
    humidity: 60,
  },
  {
    location: "London, UK",
    city: "London",
    country: "UK",
    conditions: "Rainy",
    temperature: 55,
    humidity: 80,
  },
  {
    location: "Moscow, Russia",
    city: "Moscow",
    country: "Russia",
    conditions: "Snowy",
    temperature: 20,
    humidity: 90,
  },
  {
    location: "Tokyo, Japan",
    city: "Tokyo",
    country: "Japan",
    conditions: "Cloudy",
    temperature: 68,
    humidity: 75,
  },
];

function WeatherCard({ data }) {
  let backgroundImage = "";
  let animationClass = "";

  if (data.conditions === "Sunny") {
    backgroundImage = `url(${SunIcon})`;
    animationClass = "sun-animation";
  } else if (data.conditions === "Rainy") {
    backgroundImage = `url(${RainIcon})`;
    animationClass = "rain-animation";
  } else if (data.conditions === "Snowy") {
    backgroundImage = `url(${SnowIcon})`;
    animationClass = "snow-animation";
  } else if (data.conditions === "Cloudy") {
    backgroundImage = `url(${CloudIcon})`;
    animationClass = "cloud-animation";
  }

  return (
    <div
      className="weather-card"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div
        className={`weather-icon-background ${animationClass}`}
        style={{
          backgroundImage: backgroundImage,
        }}
      ></div>
      <div className="weather-content">
        <h3>
          {data.city}, {data.country}
        </h3>
        <p>Location: {data.location}</p>
        <p>Conditions: {data.conditions}</p>
        <p>Temperature: \\( {data.temperature} \\)°F</p>
        <p>Humidity: \\( {data.humidity} \\)%</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="weather-container">
      {weatherData.map((weather, index) => (
        <WeatherCard key={index} data={weather} />
      ))}
    </div>
  );
}

export default App;
