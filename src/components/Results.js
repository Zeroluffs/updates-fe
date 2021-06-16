import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import GameCard from "./GameCard";

const styles = {
  gameColumn: {
    marginBottom: 20,
  },
};
const Results = (props) => {
  const gameColumns = props
    ? props.gameResults.map((game) => (
        <li
          style={{ display: "inline-block", marginRight: 20, marginBottom: 40 }}
          key={game.id}
        >
          <GameCard game={game} />
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
          marginRight: 172,
          marginLeft: 172,
        }}
      >
        {gameColumns}
      </ul>
    </div>
  );
};

export default Results;
