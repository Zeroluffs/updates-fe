import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import { Typography, Button } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: 180,
    margin: "auto",
  },
  media: {
    height: 300,
    // width: "100%",
    // objectFit: "cover",
  },
});

const MovieCard = (props) => {
  const classes = useStyles();
  const movie = props.movie;
  console.log(movie.Title);
  return (
    <Card className={classes.root}>
      <Link
        to={{
          pathname: `/movie/${movie.Title}`,
          movieProps: {
            movie: movie,
          },
        }}
      >
        <CardActionArea>
          <CardMedia
            title={movie.Title}
            className={classes.media}
            image={movie.Poster !== undefined ? movie.Poster : ""}
          ></CardMedia>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default MovieCard;
