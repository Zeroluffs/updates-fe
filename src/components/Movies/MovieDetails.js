import React, { useContext, useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import axios from "axios";
import { AuthContext } from "../../context/auth";
import "../../Styles/Movies/MovieDetails.css";
import { addMovie } from "../../utils/helper.functions";
import { useFoundItemState } from "../../utils/foundItem.hook";
import Box from "@material-ui/core/Box";

const api = axios.create({
  baseURL: `http://www.omdbapi.com/`,
});
const MovieDetails = (props) => {
  const themeMovies = createMuiTheme({
    typography: {
      fontFamily: [
        "Lato",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      body1: {
        fontSize: 18,
      },
      h4: {
        fontweight: 800,
        fontStyle: "italic",
      },
      h5: {
        fontWeight: 600,
      },
    },
  });

  const { REACT_APP_API_KEY3 } = process.env;
  const { movie } = props.location.movieProps;
  const [movieDetails, setMovieDetails] = useState([]);
  const user = useContext(AuthContext);
  const [found, setFound] = useState(false);
  const isFound = useFoundItemState(user.user.id, movie.imdbID, "movies");

  useEffect(() => {
    api.get(`?apikey=${REACT_APP_API_KEY3}&i=${movie.imdbID}`).then((res) => {
      console.log(res.data);
      setMovieDetails(res.data);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="moviesContainer">
      <ThemeProvider theme={themeMovies}>
        <div className="moviePoster">
          <img
            className="moviePosterImg"
            alt=""
            src={movie.Poster !== undefined ? movie.Poster : ""}
          ></img>
          <Button
            variant="contained"
            color="primary"
            className="buttonAdd"
            disabled={found || isFound}
            onClick={(e) => {
              addMovie(movieDetails, user);
              setFound(true);
            }}
          >
            Add To List
          </Button>
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
              <Typography variant="body1">{movieDetails.Released}</Typography>
            </li>
            <li className="movieLi">
              {" "}
              <Typography variant="body1">{movieDetails.Genre}</Typography>
            </li>
            <li>
              <Typography variant="body1">{movieDetails.Runtime}</Typography>
            </li>
          </ul>

          <Typography variant="h5">Overview</Typography>
          <Typography variant="body1">{movieDetails.Plot}</Typography>
          <div className="directorAndWriter">
            <Typography variant="body1">
              Directed by{" "}
              <Box fontWeight="600" display="inline">
                {" "}
                {movieDetails.Director}
              </Box>{" "}
              and written by{" "}
              <Box fontWeight="600" display="inline">
                {" "}
                {movieDetails.Writer}
              </Box>
            </Typography>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default MovieDetails;
