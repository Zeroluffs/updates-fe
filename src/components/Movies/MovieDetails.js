import React, { useContext, useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import axios from "axios";

import "../../Styles/Movies/MovieDetails.css";

const api = axios.create({
  baseURL: `http://www.omdbapi.com/`,
});
const MovieDetails = (props) => {
  const { REACT_APP_API_KEY3 } = process.env;
  const { movie } = props.location.movieProps;
  const [movieDetails, setMovieDetails] = useState([]);

  useEffect(() => {
    api.get(`?apikey=${REACT_APP_API_KEY3}&i=${movie.imdbID}`).then((res) => {
      console.log(res.data);
      setMovieDetails(res.data);
    });
  }, []);

  return (
    <div className="moviesContainer">
      <div className="moviePoster">
        <img
          className="moviePosterImg"
          alt=""
          src={movie.Poster !== undefined ? movie.Poster : ""}
        ></img>
        <Button className="buttonAdd">Add To List</Button>
      </div>
      <div className="movieDetails">
        <Typography variant="h4">
          {movieDetails.Title} ({movieDetails.Year})
        </Typography>
        {/* <Typography variant="body2">
            {movieDetails.Released}
        </Typography> */}
        <ul className="movieListDetails">
          <li className="movieLi">
            <Typography variant="body2">{movieDetails.Released}</Typography>
          </li>
          <li className="movieLi">
            {" "}
            <Typography variant="body2">{movieDetails.Genre}</Typography>
          </li>
          <li>
            <Typography variant="body2">{movieDetails.Runtime}</Typography>
          </li>
        </ul>

        <Typography variant="h5">Overview</Typography>
        <Typography variant="body2">{movieDetails.Plot}</Typography>
        <Typography variant="body2">
          Directed by {movieDetails.Director} and written by{" "}
          {movieDetails.Writer}
        </Typography>
      </div>
    </div>
  );
};

export default MovieDetails;
