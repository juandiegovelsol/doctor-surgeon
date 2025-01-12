import React, { useState, useRef, useEffect, useCallback } from "react";
import Map, { Marker, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoianVhbmRpZWdvdmVsc29sIiwiYSI6ImNtNXNnN2swZDBsd3IybXB2MDFvb2N5bmQifQ.iWeZFqsMeQhkarysi4X6IQ";

const VehicleMap = () => {
  const mapRef = useRef(null);
  const [viewport, setViewport] = useState({
    latitude: 34.0522,
    longitude: -118.2437,
    zoom: 10,
  });
  const [vehicles, setVehicles] = useState([]);
  const [routes, setRoutes] = useState({});

  useEffect(() => {
    const fetchVehicleLocations = async () => {
      try {
        const response = await axios.get("/api/vehicles/locations");
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicle locations:", error);
      }
    };
    fetchVehicleLocations();
    const intervalId = setInterval(fetchVehicleLocations, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchRoute = useCallback(
    async (start, end, vehicleId) => {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${MAPBOX_TOKEN}`
        );
        if (response.data.routes && response.data.routes.length > 0) {
          setRoutes((prevRoutes) => ({
            ...prevRoutes,
            [vehicleId]: response.data.routes[0].geometry,
          }));
        }
      } catch (error) {
        console.error(`Error fetching route for vehicle ${vehicleId}:`, error);
      }
    },
    [MAPBOX_TOKEN]
  );

  useEffect(() => {
    vehicles.forEach((vehicle) => {
      if (vehicle.start_point && vehicle.end_point) {
        fetchRoute(
          [vehicle.start_point.longitude, vehicle.start_point.latitude],
          [vehicle.end_point.longitude, vehicle.end_point.latitude],
          vehicle.id
        );
      }
    });
  }, [vehicles, fetchRoute]);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Map
        ref={mapRef}
        {...viewport}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
        onMove={(evt) => setViewport(evt.viewState)}
      >
        {vehicles.map((vehicle) => (
          <Marker
            key={vehicle.id}
            longitude={vehicle.longitude}
            latitude={vehicle.latitude}
            anchor="bottom"
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "blue",
                cursor: "pointer",
              }}
              title={`Vehicle ID: ${vehicle.id}`}
            />
          </Marker>
        ))}

        {Object.keys(routes).map((vehicleId) => (
          <Source
            key={vehicleId}
            id={`route-${vehicleId}`}
            type="geojson"
            data={routes[vehicleId]}
          >
            <Layer
              id={`route-layer-${vehicleId}`}
              type="line"
              paint={{ "line-color": "red", "line-width": 3 }}
            />
          </Source>
        ))}
      </Map>
    </div>
  );
};

export default VehicleMap;
