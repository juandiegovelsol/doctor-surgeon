import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";
import "./ElectionMap.css"; // Import CSS file

const ElectionMap = () => {
  const svgRef = useRef();
  const [electionData, setElectionData] = useState(null);
  const [geoData, setGeoData] = useState(null);
  const [tooltipContent, setTooltipContent] = useState(null); // State to hold tooltip content
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 }); // State for tooltip position
  const [isTooltipVisible, setIsTooltipVisible] = useState(false); // State to control tooltip visibility

  useEffect(() => {
    // Load data here and render the map
    const fetchData = async () => {
      // Load election results data
      const electionResults = await d3.json("/election-results.json"); // Place your election data in public or fetch from API
      setElectionData(electionResults);

      // Load TopoJSON data for US states
      const usTopoJson = await d3.json("/us-states.json"); // Place your TopoJSON file in public
      setGeoData(usTopoJson);
    };

    fetchData();
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    if (geoData && electionData) {
      drawMap();
    }
  }, [geoData, electionData]); // Run when geoData or electionData changes

  const drawMap = () => {
    const svg = d3.select(svgRef.current);
    const width = 960;
    const height = 600;

    svg.attr("width", width).attr("height", height);

    // Projection and path generator
    const projection = d3
      .geoAlbersUsa()
      .translate([width / 2, height / 2])
      .scale(1200);

    const path = d3.geoPath().projection(projection);

    // Color scale for parties
    const partyColors = {
      Democrat: "blue",
      Republican: "red",
      Independent: "purple",
      Green: "green",
      // ... add more parties and colors as needed
    };
    const colorScale = d3
      .scaleOrdinal()
      .domain(Object.keys(partyColors))
      .range(Object.values(partyColors));

    // Convert TopoJSON to GeoJSON features
    const states = feature(geoData, geoData.objects.states).features;

    // Join election data with GeoJSON features
    const statesWithData = states.map((state) => {
      const stateData = electionData.find(
        (d) => d.state === state.properties.name
      ); // Adjust property name as needed
      return {
        ...state,
        ...stateData, // Merge election data into the GeoJSON feature
      };
    });

    // Draw states
    svg
      .selectAll("path")
      .data(statesWithData)
      .join("path")
      .attr("d", path)
      .attr("fill", (d) => {
        return d.winner ? colorScale(d.winner) : "#ccc"; // Default grey if no winner data
      })
      .attr("stroke", "white")
      .attr("stroke-width", 0.5)
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut)
      .on("click", handleStateClick);
  };

  const handleMouseOver = (event, d) => {
    d3.select(event.target).attr("stroke", "black").attr("stroke-width", 2);

    // Prepare tooltip content
    const content = (
      <div>
        <h3>{d.properties.name}</h3>
        {d.winner && (
          <p>
            <strong>Winner:</strong> {d.winner}
          </p>
        )}
        {d.votes && ( // Assuming 'votes' is in your data now
          <div>
            <p>
              <strong>Votes:</strong>
            </p>
            <ul>
              {Object.entries(d.votes).map(([party, votes]) => (
                <li key={party}>
                  {party}: {votes}
                </li>
              ))}
            </ul>
          </div>
        )}
        {d.turnout && (
          <p>
            <strong>Turnout:</strong> {d.turnout}
          </p>
        )}
        {/* Add more statistics here as needed */}
      </div>
    );

    setTooltipContent(content);
    setIsTooltipVisible(true);

    // Position the tooltip near the mouse cursor
    setTooltipPosition({ x: event.clientX + 10, y: event.clientY - 10 }); // Adjust offset as needed
  };

  const handleMouseOut = (event, d) => {
    d3.select(event.target).attr("stroke", "white").attr("stroke-width", 0.5);
    setIsTooltipVisible(false); // Hide tooltip on mouseout
  };

  const handleStateClick = (event, d) => {
    console.log(`Clicked on ${d.properties.name}, Winner: ${d.winner}`);
    // Implement state-specific action, like zooming or displaying detailed info
  };

  return (
    <div className="map-container">
      {" "}
      {/* Add a container div for relative positioning if needed */}
      <svg ref={svgRef}></svg>
      <div
        className={`tooltip ${isTooltipVisible ? "visible" : ""}`}
        style={{ left: tooltipPosition.x, top: tooltipPosition.y }}
      >
        {tooltipContent}
      </div>
    </div>
  );
};

export default ElectionMap;
