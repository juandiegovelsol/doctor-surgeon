import React, { useState } from "react";
import { VictoryPie, VictoryLabel } from "victory";

// Mock data for respondent details
const mockRespondentData = [
  {
    response: "Excellent",
    respondentId: "R001",
    demographic: "Male, 25-34, City A",
  },
  {
    response: "Excellent",
    respondentId: "R002",
    demographic: "Female, 35-44, City B",
  },
  {
    response: "Good",
    respondentId: "R003",
    demographic: "Male, 18-24, City C",
  },
  {
    response: "Good",
    respondentId: "R004",
    demographic: "Female, 25-34, City A",
  },
  {
    response: "Neutral",
    respondentId: "R005",
    demographic: "Male, 35-44, City B",
  },
  {
    response: "Poor",
    respondentId: "R006",
    demographic: "Female, 18-24, City C",
  },
  {
    response: "Very Poor",
    respondentId: "R007",
    demographic: "Male, 25-34, City A",
  },
  {
    response: "Excellent",
    respondentId: "R008",
    demographic: "Female, 35-44, City B",
  },
  {
    response: "Good",
    respondentId: "R009",
    demographic: "Male, 18-24, City C",
  },
  {
    response: "Good",
    respondentId: "R010",
    demographic: "Female, 25-34, City A",
  },
  {
    response: "Neutral",
    respondentId: "R011",
    demographic: "Male, 35-44, City B",
  },
  {
    response: "Poor",
    respondentId: "R012",
    demographic: "Female, 18-24, City C",
  },
  {
    response: "Excellent",
    respondentId: "R013",
    demographic: "Male, 25-34, City A",
  },
  {
    response: "Good",
    respondentId: "R014",
    demographic: "Female, 35-44, City B",
  },
  {
    response: "Neutral",
    respondentId: "R015",
    demographic: "Male, 18-24, City C",
  },
  {
    response: "Poor",
    respondentId: "R016",
    demographic: "Female, 25-34, City A",
  },
  {
    response: "Very Poor",
    respondentId: "R017",
    demographic: "Male, 35-44, City B",
  },
  // ... more data
];

const DetailedRespondentData = ({ selectedResponse }) => {
  if (!selectedResponse) {
    return <p>Click on a pie segment to view detailed respondent data.</p>;
  }

  const filteredRespondents = mockRespondentData.filter(
    (respondent) => respondent.response === selectedResponse
  );

  if (filteredRespondents.length === 0) {
    return <p>No detailed data found for '{selectedResponse}'.</p>;
  }

  return (
    <div>
      <h4>Detailed Respondents for '{selectedResponse}'</h4>
      <ul>
        {filteredRespondents.map((respondent, index) => (
          <li key={index}>
            Respondent ID: {respondent.respondentId}, Demographic:{" "}
            {respondent.demographic}
          </li>
        ))}
      </ul>
    </div>
  );
};

const PieChartComponent = ({ data, onSegmentClick }) => {
  return (
    <VictoryPie
      data={data}
      colorScale={[
        "#4CAF50",
        "#8BC34A",
        "#CDDC39",
        "#FFEB3B",
        "#FFC107",
        "#FF9800",
        "#FF5722",
      ]}
      labels={({ datum }) => `${datum.x} (${datum.y})`}
      labelComponent={<VictoryLabel angle={45} dy={-10} />}
      innerRadius={50}
      padAngle={({ datum }) => (datum.y < 20 ? 2 : 0)}
      style={{
        labels: { fontSize: 12, fill: "black" },
        data: {
          fillOpacity: 0.9,
          stroke: "white",
          strokeWidth: 1,
        },
      }}
      animate={{
        duration: 500,
        easing: "cubic",
      }}
      events={[
        {
          target: "data",
          eventHandlers: {
            onClick: (event, targetProps) => {
              // targetProps.datum contains the data for the clicked segment
              onSegmentClick(targetProps.datum.x); // Pass the response option to the parent component
            },
          },
        },
      ]}
    />
  );
};

const App = () => {
  const [selectedResponse, setSelectedResponse] = useState(null);

  const surveyQuestionData = [
    { response: "Excellent", count: 150 },
    { response: "Good", count: 220 },
    { response: "Neutral", count: 85 },
    { response: "Poor", count: 30 },
    { response: "Very Poor", count: 15 },
  ];

  const pieChartData = surveyQuestionData.map((item) => ({
    x: item.response,
    y: item.count,
  }));

  const handleSegmentClick = (response) => {
    setSelectedResponse(response);
  };

  return (
    <div>
      <h2>Survey Response Distribution</h2>
      <PieChartComponent
        data={pieChartData}
        onSegmentClick={handleSegmentClick}
      />
      <DetailedRespondentData selectedResponse={selectedResponse} />
    </div>
  );
};

export default App;
