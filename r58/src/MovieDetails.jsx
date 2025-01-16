// MovieDetails.js
import React from "react";
import usePreferenceStore from "./preferenceStore";

const MovieDetails = ({ movieId }) => {
  const genreFilter = usePreferenceStore((state) => state.genreFilter);
  const languageFilter = usePreferenceStore((state) => state.languageFilter);

  // ... (fetch movie details based on movieId) ...

  return (
    <div>
      <h2>Movie Details for Movie ID: {movieId}</h2>
      <p>Current Global Genre Filter: {genreFilter.join(", ") || "None"}</p>
      <p>
        Current Global Language Filter: {languageFilter.join(", ") || "None"}
      </p>
      {/* ... Movie details content ... */}
    </div>
  );
};

export default MovieDetails;
