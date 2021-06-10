import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { ThemeProvider, Typography, Button } from "@material-ui/core";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import "../App.css";
import axios from "axios";
import { AuthContext } from "../context/auth";
const api = axios.create({
  baseURL: `http://localhost:3000/api`,
});
const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
    // margin: "auto",
    width: 320,
    height: 415,
  },
  media: {
    height: 330,
    // width:"100%",
    // height:"100%",
  },
});

const GameCard = (props) => {
  const user = useContext(AuthContext);

  const classes = useStyles();
  const game = props.game;
  // console.log(props.game);
  const theme = createMuiTheme({
    typography: {
      subtitle1: {
        fontSize: 12,
      },
      body1: {
        fontSize: 22,
      },
      button: {},
    },
  });

  const addGame = async (game) => {
    console.log(user);
    const gameToAdd = {
      name: game.name,
      score: game.rating,
      releaseDate: game.released,
      id: game.id,
    };
    api
      .post("/games/" + user.user.id, gameToAdd)
      .then((res) => {
        if (res.status === 200) {
          console.log("game added");
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error adding game");
      });
  };
  return (
    
    <Grid alignItems="center" item xs={12}>
      <ThemeProvider theme={theme}>
        <Card className="root">
          <Link
            to={{
              pathname: `/game/${game.name}`,
              gameProps: {
                game: game,
              },
            }}
          >
            <CardActionArea>
              <CardMedia
                className="media"
                // image={game.background_image}
              >
                <img
                  src={game.background_image}
                  alt="screenshot"
                  width="100%"
                  height="100%"
                ></img>
              </CardMedia>
              {/* <CardMedia
                className="media"
                image={game.background_image}
                title="Contemplative Reptile"
              /> */}
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {game.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {game.released}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Link>

          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={(e) => {
                addGame(game);
              }}
            >
              Add to My List
            </Button>
            <Link
              to={{
                pathname: `/game/${game.name}`,
                gameProps: {
                  game: game,
                },
              }}
            >
              <Button size="small" color="primary">
                More Details
              </Button>
            </Link>
          </CardActions>
        </Card>
      </ThemeProvider>
    </Grid>
  );
};

export default GameCard;