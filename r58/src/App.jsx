// App.js
import React from "react";
import MovieList from "./MovieList";
import MovieDetails from "./MovieDetails";

function App() {
  return (
    <div>
      <h1>Movie Recommendation App</h1>
      <MovieList />
      <MovieDetails movieId={123} /> {/* Example Movie ID */}
    </div>
  );
}

export default App;
