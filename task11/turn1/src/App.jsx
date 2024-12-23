// src/App.jsx
import React from "react";
import Header from "./components/Header";
import AchievementsSection from "./components/AchievementsSection";
import Footer from "./components/Footer";
import "./styles/main.scss";

const achievementsData = [
  {
    title: "Reached 1 Million Users",
    description: "Successfully onboarded 1 million users on our platform.",
  },
  {
    title: "Award for Innovation",
    description:
      "Received a prestigious award for our innovative approach to solving industry challenges.",
  },
  {
    title: "Global Market Expansion",
    description:
      "Expanded our services to key global markets, significantly increasing our reach.",
  },
  {
    title: "Customer Satisfaction Excellence",
    description:
      "Achieved the highest customer satisfaction rating in our sector for the third consecutive year.",
  },
  {
    title: "Launched Revolutionary Product",
    description:
      "Successfully launched a groundbreaking product that is transforming the way people interact with technology.",
  },
  {
    title: "Secured Series B Funding",
    description:
      "Secured significant Series B funding to fuel our next phase of growth and innovation.",
  },
];

function App() {
  return (
    <div>
      <Header />
      <AchievementsSection achievements={achievementsData} />
      <Footer />
    </div>
  );
}

export default App;
