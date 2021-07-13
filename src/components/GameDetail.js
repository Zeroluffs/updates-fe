import React, { useContext, useState, useEffect } from "react";
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
// import { useFoundGameState } from "../utils/foundGame.hook";
import { useFoundItemState } from "../utils/foundItem.hook";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "../Styles/Games/GameDetails.css";
import axios from "axios";
import Box from "@material-ui/core/Box";

const gamesApi = axios.create({
  baseURL: `https://api.rawg.io/api/games`,
});
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
  button: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const themeGames = createMuiTheme({
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
      marginBottom: "10px",
    },
    h4: {
      fontSize: 23,
      fontWeight: 500,
      paddingTop: "2%",
      marginBottom: "2%",
      fontStyle: "italic",
    },
    h5: {
      fontWeight: 600,
    },
  },
  button: {},
});

const GameDetail = (props) => {
  const { REACT_APP_API_KEY } = process.env;

  // eslint-disable-next-line no-unused-vars
  const [found, setFound] = useState(false);
  const [gameDetails, setGameDetails] = useState({});
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
  useEffect(() => {
    gamesApi.get(`/${game.id}?key=${REACT_APP_API_KEY}`).then((res) => {
      setGameDetails(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isFound = useFoundItemState(user.user.id, game.id, "games");
  return (
    <div className="gamesContainer">
      <ThemeProvider theme={themeGames}>
        <div className="gamePoster">
          <img
            alt="background"
            className="main"
            src={gameDetails.background_image}
          ></img>
          <Button
            variant="contained"
            color="primary"
            className="buttonAdd"
            disabled={found || isFound}
            onClick={(e) => {
              addGame(game, user);
              setFound(true);
            }}
          >
            Add To List
          </Button>
        </div>
        <div className="gameDetails">
          <Typography variant="h4">{gameDetails.name}</Typography>
          <ul className="gameListDetail">
            <li className="listItem">
              <Typography variant="body1">{gameDetails.released}</Typography>
            </li>
            <li className="listItem">
              <Typography variant="body1">
                {gameDetails.genres?.map((g) => `${g.name}`).join(", ")}
              </Typography>
            </li>
          </ul>

          <Typography variant="h5">Rating:</Typography>
          <Typography variant="body1"> {gameDetails.rating}</Typography>

          <Typography variant="h5">Platform(s):</Typography>
          <Typography variant="body1">
            {gameDetails.platforms?.map((p) => `${p.platform.name}`).join(", ")}
          </Typography>
          <Typography variant="body1">
            Game Developed by{" "}
            <Box fontWeight="600" display="inline">
              {gameDetails.developers ? gameDetails.developers[0].name : null}
            </Box>
          </Typography>
        </div>
        <div className="gameDescription">
          <Typography variant="h5">Description</Typography>
          <Typography variant="body1">
            {gameDetails.description?.replace(/(<([^>]+)>)/gi, "")}
          </Typography>
        </div>
      </ThemeProvider>
    </div>
    // <ThemeProvider theme={theme}>
    //   <div>
    //     <Typography variant="h2">{game.name}</Typography>
    //     <div>
    //       <div>
    //         <img
    //           alt="background"
    //           className="main"
    //           src={game.background_image}
    //         ></img>
    //       </div>
    //       <div>
    //         <Typography variant="h5">Release Date:</Typography>
    //         <Typography variant="body1"> {game.released}</Typography>
    //         <Typography variant="h5">Rating:</Typography>
    //         <Typography variant="body1"> {game.rating}</Typography>
    //         <Typography variant="h5">Genre(s):</Typography>
    //         <Typography variant="body1">
    //           {game.genres.map((g) => `${g.name} | `)}
    //         </Typography>

    //         <Typography variant="h5">Platform(s):</Typography>
    //         <Typography variant="body1">
    //           {game.platforms.map((p) => `${p.platform.name} | `)}
    //         </Typography>
    //         <div className={classes.button}>
    //           <Button size="small" variant="outlined" color="secondary">
    //             Keep Searching
    //           </Button>
    //           <Button
    //             onClick={(e) => {
    //               addGame(game, user);
    //               setFound(true);
    //             }}
    //             variant="outlined"
    //             disabled={isFound || found}
    //           >
    //             Add Game
    //           </Button>
    //         </div>
    //       </div>
    //     </div>
    //     <div className={classes.root}>
    //       <GridList className={classes.gridList} cols={cols}>
    //         {game.short_screenshots.map((ss) => (
    //           <GridListTile key={ss.image}>
    //             <img
    //               src={ss.image}
    //               alt="screenshot"
    //               maxWidth="100%"
    //               className="imageingallery"
    //               height="auto"
    //             ></img>
    //             <GridListTileBar
    //               classes={{
    //                 root: classes.titleBar,
    //                 title: classes.title,
    //               }}
    //             ></GridListTileBar>
    //           </GridListTile>
    //         ))}
    //       </GridList>
    //     </div>
    //   </div>
    // </ThemeProvider>
  );
};

export default withWidth()(GameDetail);
