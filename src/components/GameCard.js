import React, { useContext, useState, useEffect } from "react";
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
import { addGame } from "../utils/helper.functions";
import { useFoundGameState } from "../utils/foundGame.hook";
const api = axios.create({
  baseURL: `http://localhost:3000/api`,
});

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
// const useStyles = makeStyles({
//   root: {
//     // maxWidth: 345,
//     // margin: "auto",
//     // width: 320,
//     // height: 415,
//   },
//   media: {
//     // height: 330,
//     // width:"100%",
//     // height:"100%",
//   },
// });

const GameCard = (props) => {
  const user = useContext(AuthContext);
  const [found, setFound] = useState(false);

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
  const isFound = useFoundGameState(user.user.id, game.id);
  console.log(isFound + "PLEASE WORK");

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
            addGame(game, user);
            setFound(true);
          }}
          disabled={isFound}
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

    // <Grid alignItems="center" item xs={12}>
    //   <ThemeProvider theme={theme}>
    //     <Card className="root">
    //       <Link
    //         to={{
    //           pathname: `/game/${game.name}`,
    //           gameProps: {
    //             game: game,
    //           },
    //         }}
    //       >
    //         <CardActionArea>
    //           <CardMedia
    //             className="media"
    //             // image={game.background_image}
    //           >
    //             <img
    //               src={game.background_image}
    //               alt="screenshot"
    //               width="100%"
    //               height="100%"
    //             ></img>
    //           </CardMedia>
    //           {/* <CardMedia
    //             className="media"
    //             image={game.background_image}
    //             title="Contemplative Reptile"
    //           /> */}
    //           <CardContent>
    //             <Typography gutterBottom variant="h5" component="h2">
    //               {game.name}
    //             </Typography>
    //             <Typography variant="body2" color="textSecondary" component="p">
    //               {game.released}
    //             </Typography>
    //           </CardContent>
    //         </CardActionArea>
    //       </Link>

    //       <CardActions>
    //         <Button
    //           size="small"
    //           color="primary"
    //           onClick={(e) => {
    //             addGame(game, user);
    //             setFound(true);
    //           }}
    //           disabled={found}
    //         >
    //           Add to My List
    //         </Button>
    //         <Link
    //           to={{
    //             pathname: `/game/${game.name}`,
    //             gameProps: {
    //               game: game,
    //             },
    //           }}
    //         >
    //           <Button size="small" color="primary">
    //             More Details
    //           </Button>
    //         </Link>
    //       </CardActions>
    //     </Card>
    //   </ThemeProvider>
    // </Grid>
  );
};

export default GameCard;
