// DataList.jsx
import React from "react";
import PropTypes from "prop-types";

const DataList = ({ data }) => {
  const hasPositive = data.some((item) => item.value >= 0);
  const hasNegative = data.some((item) => item.value < 0);

  if (hasPositive && hasNegative) {
    return <p>Invalid chart data</p>;
  }
  const total = data.reduce((sum, item) => sum + Math.abs(item.value), 0);
  if (total === 0) {
    return <p>Invalid chart data</p>;
  }

  return (
    <div style={styles.container}>
      <h2>Data Details</h2>
      <ul style={styles.list}>
        {data.map((item, index) => {
          const percentage = ((Math.abs(item.value) / total) * 100).toFixed(1);
          return (
            <li key={index} style={styles.listItem}>
              <span
                style={{
                  ...styles.colorBox,
                  backgroundColor: item.color,
                }}
              ></span>
              <span style={styles.name}>{item.name}</span>
              <span style={styles.value}>{item.value}</span>
              <span style={styles.percentage}>{percentage}%</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

DataList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const styles = {
  container: {
    marginLeft: "20px",
    flex: 1,
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
  },
  colorBox: {
    width: "16px",
    height: "16px",
    marginRight: "8px",
    borderRadius: "2px",
  },
  name: {
    flex: 2,
  },
  value: {
    flex: 1,
    textAlign: "right",
  },
  percentage: {
    flex: 1,
    textAlign: "right",
    color: "#666",
  },
};

export default DataList;
