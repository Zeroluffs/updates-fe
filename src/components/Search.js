import React, { useState } from "react";
import Results from "./Results";
import SearchBar from "material-ui-search-bar";
import "../App.css";
const Search = () => {
  const { REACT_APP_API_KEY } = process.env;
  const [searchTerm, setSearchTerm] = useState("");
  const [gameResults, setGameResults] = useState([]);
  // const handleChange = (e) => {
  //   setSearchTerm(e.target.value);
  // };

  const onSubmit = (e) => {
    // e.preventDefault();
    let slug = searchTerm.split(" ").join("-").toLowerCase();
    setGameResults([]);
    fetch(
      `https://api.rawg.io/api/games?search=${slug}&key=${REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then(({ results }) => {
        results === undefined
          ? alert("no games found")
          : setGameResults(results);
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

      <Results gameResults={gameResults} />
    </div>
  );
};

export default Search;
