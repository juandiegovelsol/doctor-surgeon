import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const BarChart = ({ data, filters }) => {
  const chartRef = useRef(null);
  const tooltipRef = useRef(null); // Ref for the tooltip div
  const [filteredData, setFilteredData] = useState(data);
  const [tooltipContent, setTooltipContent] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Apply filters to the data
    const applyFilters = (dataToFilter, currentFilters) => {
      return dataToFilter.filter((item) => {
        for (const key in currentFilters) {
          if (item[key] !== currentFilters[key]) {
            return false;
          }
        }
        return true;
      });
    };

    setFilteredData(applyFilters(data, filters));
  }, [data, filters]);

  useEffect(() => {
    if (!filteredData || filteredData.length === 0) {
      // Clear the chart and hide tooltip if no data
      d3.select(chartRef.current).selectAll("*").remove();
      /* setTooltipVisible(false); */
      return;
    }

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(chartRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    svg.selectAll("*").remove();

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(filteredData.map((d) => d.name))
      .rangeRound([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(filteredData, (d) => d.value)])
      .rangeRound([height, 0]);

    g.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    g.append("g").call(d3.axisLeft(y));

    // Create bars and attach event listeners for tooltips
    g.selectAll(".bar")
      .data(filteredData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.value))
      .attr("fill", "steelblue")
      .on("mouseover", (event, d) => {
        const { clientX, clientY } = event;
        setTooltipContent({ name: d.name, value: d.value }); // Customize tooltip content
        setTooltipPosition({ x: clientX, y: clientY });
        setTooltipVisible(true);
      })
      .on("mouseout", () => {
        setTooltipVisible(false);
      });

    // Add labels (optional)
    g.selectAll(".text")
      .data(filteredData)
      .enter()
      .append("text")
      .attr("class", "text")
      .attr("x", (d) => x(d.name) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.value) - 5)
      .attr("dy", ".75em")
      .style("text-anchor", "middle")
      .text((d) => d.value);
  }, [filteredData]);

  return (
    <div id="bar-chart-container">
      <svg ref={chartRef}></svg>
      {tooltipVisible && tooltipContent && (
        <div
          ref={tooltipRef}
          style={{
            position: "absolute",
            left: `${tooltipPosition.x + 10}px`, // Adjust for desired positioning
            top: `${tooltipPosition.y + 10}px`,
            background: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "8px",
            borderRadius: "4px",
            zIndex: 10, // Ensure it's above other elements
            pointerEvents: "none", // Allow interaction with elements underneath
          }}
        >
          <p>Name: {tooltipContent.name}</p>
          <p>Value: {tooltipContent.value}</p>
          {/* Add more details to display in the tooltip */}
        </div>
      )}
    </div>
  );
};

export default BarChart;
