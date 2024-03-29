import React, { useContext, useState } from "react";
import { Typography } from "@material-ui/core";
import { addBook } from "../utils/helper.functions";

import Button from "@material-ui/core/Button";
import "../App.css";
import { AuthContext } from "../context/auth";
// import { useFoundGameState } from "../utils/foundGame.hook";
import { useFoundItemState } from "../utils/foundItem.hook";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "../Styles/BookDetails.css";
import Divider from "@material-ui/core/Divider";

const BookDetail = (props) => {
  const booktheme = createMuiTheme({
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
        fontSize: 18,
      },
      body2: {
        fontweight: 600,
      },
    },
  });
  const [found, setFound] = useState(false);
  const { book } = props.location.bookProps;
  const user = useContext(AuthContext);
  const isFound = useFoundItemState(user.user.id, book.id, "books");

  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <Typography variant="body1" style={{ wordWrap: "break-word" }}>
        {isReadMore ? text.slice(0, 450) : text}
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? "...read more" : " show less"}
        </span>
      </Typography>
    );
  };

  return (
    <div>
      <ThemeProvider theme={booktheme}>
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
                <Button
                  className="addBookBtn"
                  onClick={(e) => {
                    addBook(book, user);
                    setFound(true);
                  }}
                  variant="contained"
                  color="primary"
                  disabled={found || isFound}
                >
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
              <ReadMore>{book.volumeInfo.description}</ReadMore>
            </div>

            <Divider></Divider>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default BookDetail;
