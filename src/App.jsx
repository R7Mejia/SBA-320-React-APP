
import React, { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import SearchIcon from "./assets/search_icon.svg"; //deleted intentionally
import Copyright from "./components/Copyright";

import "./App.css";

const API_URL = "http://www.omdbapi.com?apikey=98e3fb1f";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Set the flag to true when the component mounts
    setIsMounted(true);
    // Clean up function to set the flag to false when the component unmounts
    return () => setIsMounted(false);
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    // Check if the component is still mounted before updating the state
    if (isMounted) {
      setMovies(data.Search);
    }
  };

  return (
    <>
      
    <div className="app">
      <h1>BuscaPelis</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="busca la peli aqui"
        />
        
          <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />  
        <button className="btn" onClick={() => searchMovies(searchTerm)}>Search</button>
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
              <h2>No movies found 🎞️</h2>
        </div>
      )}
      </div>
      <span className="Copyright">
        <Copyright />
      </span>
      </>
  );
};

export default App;
