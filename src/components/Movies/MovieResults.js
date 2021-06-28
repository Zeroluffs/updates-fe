import React from "react";
import MovieCard from "./MovieCard";

const MovieResults = (props) => {
  const movieColums = props
    ? props.movieResults.map((movie) => (
        <li
          style={{ display: "inline-block", marginRight: 20, marginBottom: 40 }}
          key={movie.imdbID}
        >
          <MovieCard movie={movie} />
        </li>
      ))
    : null;

  return (
    <div className="result-container">
      <ul
        justifyContent="center"
        display="flex"
        style={{
          display: "inline-block",
          //   marginRight: 172,
          //   marginLeft: 172,
        }}
      >
        {movieColums}
      </ul>
    </div>
  );
};

export default MovieResults;
