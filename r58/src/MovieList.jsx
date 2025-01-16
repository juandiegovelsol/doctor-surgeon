// MovieList.js
import React from "react";
import usePreferenceStore from "./preferenceStore";

const MovieList = () => {
  const genreFilter = usePreferenceStore((state) => state.genreFilter);
  const languageFilter = usePreferenceStore((state) => state.languageFilter);

  const setGenreFilter = usePreferenceStore((state) => state.setGenreFilter);
  const setLanguageFilter = usePreferenceStore(
    (state) => state.setLanguageFilter
  );
  const resetFilters = usePreferenceStore((state) => state.resetFilters); // Get the new resetFilters action

  const fetchMovies = async () => {
    console.log(
      "Fetching movies with genre filter:",
      genreFilter,
      "and language filter:",
      languageFilter
    );
    // ... your API call logic ...
  };

  React.useEffect(() => {
    fetchMovies();
  }, [genreFilter, languageFilter]);

  return (
    <div>
      <h2>Movie List</h2>
      <p>Current Genre Filter: {genreFilter.join(", ") || "None"}</p>
      <p>Current Language Filter: {languageFilter.join(", ") || "None"}</p>
      {/* ... Movie list rendering ... */}
      {/* Example Buttons to update filters and reset */}
      <button onClick={() => setGenreFilter(["Action", "Comedy"])}>
        Set Genre: Action, Comedy
      </button>
      <button onClick={() => setLanguageFilter(["en", "es"])}>
        Set Language: English, Spanish
      </button>
      <button onClick={resetFilters}>Reset All Filters</button>{" "}
      {/* Button to reset filters */}
    </div>
  );
};

export default MovieList;
