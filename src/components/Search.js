import React, { useState } from "react";
import Results from "./Results";
import SearchBar from "material-ui-search-bar";
import GameCard from "./GameCard";
import { Container, Row, Col } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
const api = axios.create({
  baseURL: `https://api.rawg.io/api/games`,
});
const Search = () => {
  const { REACT_APP_API_KEY } = process.env;
  const [searchTerm, setSearchTerm] = useState("");
  const [gameResults, setGameResults] = useState([]);
  console.log(api.baseURL);
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

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
    // let ID = 13536;
    // api
    //   .get("/" + ID + "?" + "key=" + REACT_APP_API_KEY)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       console.log(res.data);
    //     } else {
    //       const error = new Error(res.error);
    //       throw error;
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     alert("Error adding game");
    //   });
    setSearchTerm("");
  };

  return (
    <div className="game-search">
      {/* <h1>Game Search</h1>
        <form onSubmit={onSubmit}>
          <input type="text" value={searchTerm} onChange={handleChange} />
          <br></br>
          <input type="submit" />
        </form> */}
      <SearchBar
        onChange={(newValue) => setSearchTerm(newValue)}
        onRequestSearch={onSubmit}
        style={{
          margin: "0 auto",
          maxWidth: 800,
        }}
      ></SearchBar>
      <Grid
        container
        direction="row"
        alignContent="center"
        alignItems="center"
        wrap="wrap"
        spacing={12}
      >
        <Results gameResults={gameResults} />
      </Grid>
      {/* <Row>
          <Results gameResults={gameResults} />
        </Row> */}
    </div>
  );
};

export default Search;
