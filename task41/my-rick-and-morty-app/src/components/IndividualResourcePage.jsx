// src/components/IndividualResourcePage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";

const IndividualResourcePage = () => {
  const { resourceName } = useParams();
  const { resources } = useSelector((state) => state.api);
  const resourceUrl = resources[resourceName];

  return (
    <div>
      <NavBar />
      <h1>{resourceName}</h1>
      {resourceUrl ? <p>URL: {resourceUrl}</p> : <p>Resource not found.</p>}
    </div>
  );
};

export default IndividualResourcePage;
