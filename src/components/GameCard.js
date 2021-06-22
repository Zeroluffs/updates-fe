import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Link } from "react-router-dom";
import { Typography, Button } from "@material-ui/core";
import "../App.css";

import { AuthContext } from "../context/auth";
import { addGame } from "../utils/helper.functions";
// import { useFoundGameState } from "../utils/foundGame.hook";
import { useFoundItemState } from "../utils/foundItem.hook";

const useStyles = makeStyles({
  root: {
    width: 350,
    margin: "auto",
  },
  media: {
    height: 190,
    width: "100%",
    objectFit: "cover",
  },
});

const GameCard = (props) => {
  const user = useContext(AuthContext);
  // eslint-disable-next-line no-unused-vars
  const [found, setFound] = useState(false);

  const classes = useStyles();
  const game = props.game;

  useEffect(() => {
    // api.get("/games" + "/" + user.user.id).then((res) => {
    //   var __FOUND = res.data.find(function (post, index) {
    //     if (post.id === game.id.toString()) {
    //       setFound(true);
    //       return true;
    //     }
    //     return false;
    //   });
    // });
  }, []);
  const isFound = useFoundItemState(user.user.id, game.id, "games");

  return (
    <Card className={classes.root}>
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
            className={classes.media}
            image={game.background_image}
            title="screenshot"
          />
          <CardContent>
            <Typography gutterBottom noWrap variant="h5" component="h2">
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
            addGame(game, user);
            setFound(true);
          }}
          disabled={isFound || found}
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
  );
};

export default GameCard;
