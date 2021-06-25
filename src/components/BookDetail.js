import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import Button from "@material-ui/core/Button";
import "../App.css";
import { AuthContext } from "../context/auth";
// import { useFoundGameState } from "../utils/foundGame.hook";
import { useFoundItemState } from "../utils/foundItem.hook";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "../Styles/BookDetails.css";
import Divider from "@material-ui/core/Divider";

const BookDetail = (props) => {
  const theme = createMuiTheme({
    typography: {
      // fontFamily: [
      //   "-apple-system",
      //   "BlinkMacSystemFont",
      //   '"Segoe UI"',
      //   "Roboto",
      //   '"Helvetica Neue"',
      //   "Arial",
      //   "sans-serif",
      //   '"Apple Color Emoji"',
      //   '"Segoe UI Emoji"',
      //   '"Segoe UI Symbol"',
      // ].join(","),
      h4: {
        fontweight: 600,
        fontStyle: "italic",
      },
      body1: {
        fontweight: 600,
      },
      body2: {
        fontweight: 600,
      },
    },
  });
  const [found, setFound] = useState(false);

  const { book } = props.location.bookProps;
  const user = useContext(AuthContext);
  console.log(book.volumeInfo);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <div className="detailsContainer">
          <Typography align="center">
            <div className="bookCoverDiv">
              <img
                alt="cover"
                className="bookCover"
                src={
                  book.volumeInfo.imageLinks !== undefined
                    ? book.volumeInfo.imageLinks.thumbnail
                    : ""
                }
              ></img>
              <Typography align="center">
                <Button variant="contained" color="primary">
                  Add To List
                </Button>
              </Typography>
            </div>
          </Typography>

          <div className="bookDetailsDiv">
            <div className="detailContent">
              <Typography variant="h4">{book.volumeInfo.title}</Typography>
            </div>
            <Divider className="detailDividers"></Divider>
            <div className="detailContent">
              <Typography>
                This edition was released in {book.volumeInfo.publishedDate} by{" "}
                {book.volumeInfo.publisher}
              </Typography>
            </div>
            <Divider className="detailDividers"></Divider>
            <div className="detailContent">
              <Typography style={{ wordWrap: "break-word" }}>
                {" "}
                {book.volumeInfo.description}
              </Typography>
            </div>

            <Divider></Divider>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default BookDetail;
