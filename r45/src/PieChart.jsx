// PieChart.jsx
import React, { useState } from "react";

const PieChart = ({ data, width = 200, height = 200 }) => {
  const hasPositive = data.some((item) => item.value >= 0);
  const hasNegative = data.some((item) => item.value < 0);

  if (hasPositive && hasNegative) {
    return <p>Invalid chart data</p>;
  }

  const total = data.reduce((sum, item) => sum + Math.abs(item.value), 0);
  if (total === 0) {
    return <p>Invalid chart data</p>;
  }

  let cumulativeAngle = 0;
  const degToRad = (deg) => (deg * Math.PI) / 180;

  const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = {
      x: x + radius * Math.cos(degToRad(startAngle)),
      y: y + radius * Math.sin(degToRad(startAngle)),
    };
    const end = {
      x: x + radius * Math.cos(degToRad(endAngle)),
      y: y + radius * Math.sin(degToRad(endAngle)),
    };
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const pathData = [
      `M ${x} ${y}`,
      `L ${start.x} ${start.y}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
      "Z",
    ].join(" ");

    return pathData;
  };

  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) / 2;

  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
      {data.map((slice, index) => {
        const value = Math.abs(slice.value);
        const angle = (value / total) * 360;
        const midAngle = cumulativeAngle + angle / 2;
        const labelRadius = radius * 0.7;
        const labelX = cx + labelRadius * Math.cos(degToRad(midAngle));
        const labelY = cy + labelRadius * Math.sin(degToRad(midAngle));

        let pieSlice;
        if (value === total) {
          // Render a circle if it's a single slice or 100%
          pieSlice = (
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              fill={slice.color}
              stroke="#fff"
              strokeWidth="1"
              style={{
                transform: hoverIndex === index ? "scale(1.05)" : "scale(1)",
                transformOrigin: `${cx}px ${cy}px`,
                transition: "transform 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            />
          );
        } else {
          // Render arc for normal slices
          const path = describeArc(
            cx,
            cy,
            radius,
            cumulativeAngle,
            cumulativeAngle + angle
          );
          pieSlice = (
            <path
              d={path}
              fill={slice.color}
              stroke="#fff"
              strokeWidth="1"
              style={{
                transform: hoverIndex === index ? "scale(1.05)" : "scale(1)",
                transformOrigin: `${cx}px ${cy}px`,
                transition: "transform 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            />
          );
        }

        cumulativeAngle += angle;

        return (
          <g key={index}>
            {pieSlice}
            <text
              x={labelX}
              y={labelY}
              fill="#fff"
              fontSize="12"
              textAnchor="middle"
              dominantBaseline="middle"
              pointerEvents="none"
            >
              {((value / total) * 100).toFixed(1)}%
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default PieChart;
