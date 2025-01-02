// src/components/NavBar.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchApiResources } from "../store/apiSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const { resources, loading, error } = useSelector((state) => state.api);

  useEffect(() => {
    if (Object.keys(resources).length === 0 && !loading && !error) {
      dispatch(fetchApiResources());
    }
  }, [dispatch, resources, loading, error]);

  if (loading) {
    return <nav>Loading resources...</nav>;
  }

  if (error) {
    return <nav>Error loading resources.</nav>;
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {Object.keys(resources).map((resourceKey) => (
          <li key={resourceKey}>
            <Link to={`/${resourceKey}`}>{resourceKey}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
