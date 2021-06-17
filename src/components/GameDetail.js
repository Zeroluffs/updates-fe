import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import GridListTile from "@material-ui/core/GridListTile";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import Button from "@material-ui/core/Button";
import "../App.css";
import { addGame } from "../utils/helper.functions";
import { AuthContext } from "../context/auth";
import { useFoundGameState } from "../utils/foundGame.hook";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    width: "100%",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

const GameDetail = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [found, setFound] = useState(false);
  function getCols(screenWidth) {
    if (isWidthUp("lg", screenWidth)) {
      return 3;
    }

    if (isWidthUp("md", screenWidth)) {
      return 2.5;
    }

    return 1;
  }
  const classes = useStyles();
  const cols = getCols(props.width); // width is associated when using withWidth()

  const { game } = props.location.gameProps;
  const user = useContext(AuthContext);

  const isFound = useFoundGameState(user.user.id, game.id);

  return (
    <div>
      <Typography variant="h2">{game.name}</Typography>
      <div class="containertest">
        <div className="testing">
          <img
            alt="background"
            className="main"
            src={game.background_image}
          ></img>
        </div>
        <div className="gamed">
          <Typography variant="body1">Released: {game.released}</Typography>
          <Typography variant="body1">Rating: {game.rating}</Typography>
          <Typography variant="h5">Genre(s):</Typography>
          <Typography variant="body1">
            {game.genres.map((g) => `${g.name} | `)}
          </Typography>

          <Typography variant="h5">Platform(s):</Typography>
          <Typography variant="body1">
            {game.platforms.map((p) => `${p.platform.name} | `)}
          </Typography>
          <Button size="small" variant="outlined" color="secondary">
            Secondary
          </Button>
          <Button
            onClick={(e) => {
              addGame(game, user);
              setFound(true);
            }}
            variant="outlined"
            className="Button"
            disabled={isFound}
          >
            Add Game
          </Button>
        </div>
      </div>
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={cols}>
          {game.short_screenshots.map((ss) => (
            <GridListTile key={ss.image}>
              <img
                src={ss.image}
                alt="screenshot"
                maxWidth="100%"
                className="imageingallery"
                height="auto"
              ></img>
              <GridListTileBar
                title={game.name}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
              ></GridListTileBar>
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
};

export default withWidth()(GameDetail);
