import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import { Typography, Button } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import { addBook } from "../utils/helper.functions";
import { AuthContext } from "../context/auth";

const useStyles = makeStyles({
  root: {
    width: 170,
    margin: "auto",
  },
  media: {
    height: 260,
    // width: "100%",
    // objectFit: "cover",
  },
});
const BookCard = (props) => {
  const user = useContext(AuthContext);
  const classes = useStyles();
  const book = props.book;
  console.log(book);

  return (
    // <img
    //   alt={book.volumeInfo.title}
    //   src={
    //     book.volumeInfo.imageLinks !== undefined
    //       ? book.volumeInfo.imageLinks.thumbnail
    //       : ""
    //   }
    // ></img>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          title={book.volumeInfo.title}
          className={classes.media}
          image={
            book.volumeInfo.imageLinks !== undefined
              ? book.volumeInfo.imageLinks.thumbnail
              : ""
          }
        ></CardMedia>
        <CardContent title={book.volumeInfo.title}>
          <Typography noWrap variant="body2" component="p">
            {book.volumeInfo.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={(e) => {
            addBook(book, user);
          }}
        >
          Add to My List
        </Button>

        <Button size="small" color="primary">
          More Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default BookCard;
