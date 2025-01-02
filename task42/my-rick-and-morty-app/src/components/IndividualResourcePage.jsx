// src/components/IndividualResourcePage.jsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./NavBar";
import { fetchCharacters } from "../store/characterSlice";
import { fetchLocations } from "../store/locationSlice";
import { fetchEpisodes } from "../store/episodeSlice";

const resourceFetchActions = {
  characters: fetchCharacters,
  locations: fetchLocations,
  episodes: fetchEpisodes,
};

const IndividualResourcePage = () => {
  const dispatch = useDispatch();
  const { resourceName } = useParams();
  const { resources } = useSelector((state) => state.api);
  const characters = useSelector((state) => state.characters);
  const locations = useSelector((state) => state.locations);
  const episodes = useSelector((state) => state.episodes);

  const resourceState = {
    characters,
    locations,
    episodes,
  };

  useEffect(() => {
    const resourceURL = resources[resourceName];
    const fetchData = resourceFetchActions[resourceName];
    const resourceData = resourceState[resourceName].data;
    const resourceLoading = resourceState[resourceName].loading;
    const resourceError = resourceState[resourceName].error;

    if (
      resourceURL &&
      fetchData &&
      !resourceData &&
      !resourceLoading &&
      !resourceError
    ) {
      dispatch(fetchData(resourceURL));
    }
  }, [dispatch, resourceName, resources, resourceState]);

  const renderContent = () => {
    const resourceData = resourceState[resourceName]?.data;
    const resourceLoading = resourceState[resourceName]?.loading;
    const resourceError = resourceState[resourceName]?.error;

    if (resourceLoading) return <p>Loading {resourceName}...</p>;
    if (resourceError) return <p>Error loading {resourceName}.</p>;
    if (resourceData && resourceData.results) {
      return (
        <ul>
          {resourceData.results.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      );
    }
    return null;
  };

  const displayName = resourceName
    ? resourceName.charAt(0).toUpperCase() + resourceName.slice(1)
    : "";

  return (
    <div>
      <NavBar />
      <h1>{displayName}</h1>
      {renderContent()}
    </div>
  );
};

export default IndividualResourcePage;
