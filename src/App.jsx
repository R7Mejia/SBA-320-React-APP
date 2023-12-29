
import React, { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import SearchIcon from "./assets/search_icon.svg"; 
import Copyright from "./components/Copyright";

import "./App.css";

const API_URL = "http://www.omdbapi.com?apikey=98e3fb1f";

const App = () => {
  const [searchPeli, setSearchPeli] = useState("");
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    searchMovies("");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setPeliculas(data.Search);
  };

  return (
    <>
      
    <div className="app">
      <h1>BuscaPelis</h1>

      <div className="search">
        <input
          value={searchPeli}
          onChange={(e) => setSearchPeli(e.target.value)}
          placeholder="busca la peli aqui"
        />
        
          <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchPeli)} />  
        <button className="btn" onClick={() => searchMovies(searchPeli)}></button>
      </div>

      {peliculas?.length > 0 ? (
        <div className="container">
          {peliculas.map((movie) => (
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
