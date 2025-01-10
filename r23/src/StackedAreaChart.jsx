// StackedAreaChart.js
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import "./style.css";

const StackedAreaChart = ({ data, categories, dateColumn, valueColumn }) => {
  const svgRef = useRef();

  useEffect(() => {
    // D3.js chart rendering logic will go here
    drawChart();
  }, [data, categories, dateColumn, valueColumn]); // Re-render chart if data or column names change

  const drawChart = () => {
    const svg = d3.select(svgRef.current);
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 30, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    svg.attr("width", width).attr("height", height);
    svg.selectAll("*").remove();

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales and stacking (same as before)
    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d[dateColumn]))
      .range([0, innerWidth]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d3.sum(categories, (k) => d[k]))])
      .range([innerHeight, 0]);

    const color = d3
      .scaleOrdinal()
      .domain(categories)
      .range(d3.schemeCategory10);

    const stack = d3
      .stack()
      .keys(categories)
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);

    const series = stack(data);

    const area = d3
      .area()
      .x((d) => x(d.data[dateColumn]))
      .y0((d) => y(d[0]))
      .y1((d) => y(d[1]));

    // **Tooltip Setup (same as before)**
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background-color", "white")
      .style("border", "1px solid black")
      .style("padding", "10px");

    // **Drawing Areas and Adding Tooltip & Highlight Events**

    g.selectAll(".area")
      .data(series)
      .enter()
      .append("path")
      .attr("class", "area")
      .attr("d", area)
      .attr("fill", (d) => color(d.key))
      .style("opacity", 0.8) // Initial opacity for all areas
      .on("mouseover", function (event, d) {
        tooltip.transition().duration(200).style("opacity", 0.9);

        const categoryName = d.key;
        const dateValue = x.invert(d3.pointer(event, this)[0]);
        const formattedDate = d3.timeFormat("%Y-%m-%d")(dateValue);
        const dataPoint = data.find(
          (item) => item[dateColumn].getTime() === dateValue.getTime()
        );
        const categoryValue = dataPoint ? dataPoint[categoryName] : 0;

        tooltip
          .html(
            `Category: ${categoryName}<br/>Date: ${formattedDate}<br/>Revenue: ${categoryValue}`
          )
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 30 + "px");

        // **Highlight hovered area and dim others**
        g.selectAll(".area")
          .transition() // Add transition for smooth effect
          .duration(200)
          .style("opacity", (areaOpacity) => {
            return areaOpacity.key === d.key ? 1 : 0.3; // Highlight hovered, dim others
          });
      })
      .on("mouseout", function (event, d) {
        tooltip.transition().duration(500).style("opacity", 0);

        // **Reset opacity on mouseout**
        g.selectAll(".area").transition().duration(200).style("opacity", 0.8); // Reset to initial opacity
      });

    // Axes (same as before)
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x));

    g.append("g").call(d3.axisLeft(y));
  };

  return (
    <div className="chart-container">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default StackedAreaChart;
