import React, { useState } from "react";
import ResultBooks from "./ResultBooks";
import SearchBar from "material-ui-search-bar";
import axios from "axios";

const api = axios.create({
  baseURL: `https://www.googleapis.com/books/v1`,
});
const SearchBook = () => {
  const { REACT_APP_API_KEY2 } = process.env;
  const [searchTerm, setSearchTerm] = useState("");
  const [bookResults, setBookResults] = useState([]);
  // const handleChange = (e) => {
  //   setSearchTerm(e.target.value);
  // };

  const onSubmit = (e) => {
    // e.preventDefault();
    let query = searchTerm.split(" ").join("-").toLowerCase();
    setBookResults([]);
    api.get(`volumes?q=${query}&key=${REACT_APP_API_KEY2}`).then((res) => {
      console.log(res.data.items);
      setBookResults(res.data.items);
    });

    // console.log(bookResults);
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
      <ResultBooks bookResults={bookResults}></ResultBooks>
    </div>
  );
};

export default SearchBook;
