import React from "react";
import BookCard from "./BookCard";
const BookResults = (props) => {
  const bookColumns = props
    ? props.bookResults.map((book) => (
        <li
          style={{ display: "inline-block", marginRight: 20, marginBottom: 40 }}
          key={book.id}
        >
          <BookCard book={book} />
        </li>
      ))
    : null;
  return (
    <div className="result-container">
      <ul
        justifyContent="center"
        display="flex"
        style={{
          display: "inline-block",
        //   marginRight: 172,
        //   marginLeft: 172,
        }}
      >
        {bookColumns}
      </ul>
    </div>
  );
};

export default BookResults;
