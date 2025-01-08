// src/components/SearchBar.jsx
import React, { useState, useEffect, useRef } from "react";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const debounceTimeout = useRef(null);

  const handleSearchInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };

  useEffect(() => {
    if (searchTerm) {
      clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(() => {
        fetchSearchResults(searchTerm);
        fetchAutocompleteSuggestions(searchTerm);
      }, 300);
    } else {
      setSearchResults([]);
      setSuggestions([]);
    }
  }, [searchTerm]);

  const fetchSearchResults = async (query) => {
    console.log(query);
    try {
      const response = await fetch(
        `http://localhost:5000/api/search?q=${query}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
  };

  const fetchAutocompleteSuggestions = async (query) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/autocomplete?q=${query}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching autocomplete suggestions:", error);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    // Optionally trigger a full search immediately here
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for books..."
        value={searchTerm}
        onChange={handleSearchInputChange}
      />

      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      {searchResults.length > 0 && (
        <div>
          <h3>Search Results</h3>
          <ul>
            {searchResults.map((result) => (
              <li key={result._id}>
                {result._source.title} by {result._source.author}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
