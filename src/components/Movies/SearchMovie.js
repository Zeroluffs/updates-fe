import React, { useState } from "react";
import SearchBar from "material-ui-search-bar";
import axios from "axios";
import MovieResults from "./MovieResults";

const api = axios.create({
  baseURL: `http://www.omdbapi.com/`,
});
const SearchMovie = () => {
  const { REACT_APP_API_KEY3 } = process.env;
  const [searchTerm, setSearchTerm] = useState("");
  const [movieResults, setMovieResults] = useState([]);

  const onSubmit = (e) => {
    // e.preventDefault();
    let searchValue = searchTerm.split(" ").join("-").toLowerCase();
    setMovieResults([]);
    api.get(`?apikey=${REACT_APP_API_KEY3}&s=${searchValue}`).then((res) => {
      setMovieResults(res.data.Search);
    });

    setSearchTerm("");
  };

  return (
    <div className="game-search">
      <SearchBar
        onChange={(newValue) => setSearchTerm(newValue)}
        onRequestSearch={onSubmit}
        style={{
          margin: "0 auto",
          maxWidth: 800,
        }}
      ></SearchBar>
      <MovieResults movieResults={movieResults}></MovieResults>
    </div>
  );
};

export default SearchMovie;
