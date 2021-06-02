import React from "react";
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
  const classes = useStyles();
  const game = props.game;
  console.log(props.game);
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
            <Button size="small" color="primary">
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
