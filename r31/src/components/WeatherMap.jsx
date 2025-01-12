/* // components/WeatherMap.js
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoianVhbmRpZWdvdmVsc29sIiwiYSI6ImNtNXNnN2swZDBsd3IybXB2MDFvb2N5bmQifQ.iWeZFqsMeQhkarysi4X6IQ";

const WeatherMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-100); // Initial longitude
  const [lat, setLat] = useState(40); // Initial latitude
  const [zoom, setZoom] = useState(3); // Initial zoom

  useEffect(() => {
    if (map.current) return; // prevent map from initializing more than once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12", // Or your preferred style
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  useEffect(() => {
    if (!map.current) return;

    // Example: Fetch and display temperature data as a heatmap (adjust based on your API and desired visualization)
    const fetchTemperatureData = async () => {
      try {
        // Replace with your actual API endpoint and parameters
        const response = await fetch(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&appid=f35ff8dad69f75883b4254de476ff958`
        );
        const data = await response.json();
        console.log(data);

        // Process the data into a GeoJSON FeatureCollection suitable for Mapbox
        const temperatureFeatures = data.map((item) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [item.longitude, item.latitude],
          },
          properties: {
            temperature: item.temperature, // Example temperature value
          },
        }));

        map.current.addSource("temperature-data", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: temperatureFeatures,
          },
        });

        map.current.addLayer({
          id: "temperature-heatmap",
          type: "heatmap",
          source: "temperature-data",
          paint: {
            // Adjust heatmap styling as needed
            "heatmap-intensity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              1,
              9,
              3,
            ],
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["get", "temperature"],
              0,
              "blue",
              15,
              "yellow",
              30,
              "red",
            ],
            "heatmap-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              2,
              9,
              20,
            ],
            "heatmap-opacity": 0.8,
          },
        });
      } catch (error) {
        console.error("Error fetching temperature data:", error);
      }
    };

    fetchTemperatureData();

    // Example: Fetch and display wind speed data as vector arrows (adjust based on your API and desired visualization)
    const fetchWindData = async () => {
      try {
        // Replace with your actual API endpoint and parameters
        const response = await fetch(
          `https://api.openweathermap.org/data/3.0/wind?lat=${lat}&lon=${lng}&apiKey=f35ff8dad69f75883b4254de476ff958`
        );
        const data = await response.json();

        const windFeatures = data.map((item) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [item.longitude, item.latitude],
          },
          properties: {
            speed: item.speed,
            direction: item.direction, // Assuming direction is in degrees
          },
        }));

        map.current.addSource("wind-data", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: windFeatures,
          },
        });

        map.current.addLayer({
          id: "wind-arrows",
          type: "symbol",
          source: "wind-data",
          layout: {
            "icon-image": "arrow", // You might need to add a custom arrow icon to your Mapbox style
            "icon-rotate": ["get", "direction"],
            "icon-size": 0.5,
            "icon-allow-overlap": true,
            "icon-ignore-placement": true,
          },
          paint: {
            "icon-color": [
              "interpolate",
              ["linear"],
              ["get", "speed"],
              0,
              "lightgreen",
              10,
              "yellow",
              20,
              "red",
            ],
          },
        });

        // You might need to load custom images for arrows. See Mapbox documentation.
        map.current.loadImage(
          "/path/to/your/arrow.png", // Replace with the actual path to your arrow icon
          (error, image) => {
            if (error) throw error;
            if (!map.current.hasImage("arrow")) {
              map.current.addImage("arrow", image);
            }
          }
        );
      } catch (error) {
        console.error("Error fetching wind data:", error);
      }
    };

    fetchWindData();

    // Cleanup function to remove layers and sources when the component unmounts or dependencies change
    return () => {
      if (map.current.getLayer("temperature-heatmap")) {
        map.current.removeLayer("temperature-heatmap");
      }
      if (map.current.getSource("temperature-data")) {
        map.current.removeSource("temperature-data");
      }
      if (map.current.getLayer("wind-arrows")) {
        map.current.removeLayer("wind-arrows");
      }
      if (map.current.getSource("wind-data")) {
        map.current.removeSource("wind-data");
      }
    };
  }, [lat, lng]); // Re-fetch data when the map center changes

  return (
    <div>
      <div className="sidebar">
        Longitude: \( {lng} \) | Latitude: \( {lat} \) | Zoom: \( {zoom} \)
      </div>
      <div
        ref={mapContainer}
        className="map-container"
        style={{ height: "500px" }}
      />
    </div>
  );
};

export default WeatherMap; */

// components/WeatherMap.js
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoianVhbmRpZWdvdmVsc29sIiwiYSI6ImNtNXNnN2swZDBsd3IybXB2MDFvb2N5bmQifQ.iWeZFqsMeQhkarysi4X6IQ";

const WeatherMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-100);
  const [lat, setLat] = useState(40);
  const [zoom, setZoom] = useState(3);

  useEffect(() => {
    if (map.current) return; // prevent map from initializing more than once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    // Add click event listener for popups
    map.current.on("click", (e) => {
      const clickedLngLat = e.lngLat;
      fetchWeatherDataForPopup(clickedLngLat.lat, clickedLngLat.lng);
    });
  }, []);

  const fetchWeatherDataForPopup = async (latitude, longitude) => {
    try {
      // Replace with your actual API endpoint for detailed forecast
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&apiKey=f35ff8dad69f75883b4254de476ff958`
      );
      const data = await response.json();

      if (map.current) {
        new mapboxgl.Popup()
          .setLngLat([longitude, latitude])
          .setHTML(
            `<div>
              <h3>Weather at \( ${latitude.toFixed(4)}, ${longitude.toFixed(
              4
            )} \)</h3>
              <p><strong>Conditions:</strong> \( ${
                data.weather[0].description
              } \)</p>
              <p><strong>Temperature:</strong> \( ${data.main.temp} \)°C</p>
              <p><strong>Wind Speed:</strong> \( ${data.wind.speed} \) m/s</p>
              </div>`
          )
          .addTo(map.current);
      }
    } catch (error) {
      console.error("Error fetching detailed weather data:", error);
    }
  };

  return (
    <div>
      <div className="sidebar">
        Longitude: \( {lng} \) | Latitude: \( {lat} \) | Zoom: \( {zoom} \)
      </div>
      <div
        ref={mapContainer}
        className="map-container"
        style={{ height: "500px" }}
      />
    </div>
  );
};

export default WeatherMap;
