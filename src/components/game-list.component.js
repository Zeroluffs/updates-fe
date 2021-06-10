import React, {
  Component,
  useState,
  useEffect,
  useContext,
  Fragment,
  useCallback,
} from "react";
import { AuthContext } from "../context/auth";
import axios from "axios";
import { Button, TextField, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
import TableIcons from "./TableIcons";

const api = axios.create({
  baseURL: `http://localhost:3000/api`,
});
const gamesApi = axios.create({
  baseURL: `https://api.rawg.io/api/games`,
});
const GameList = (props) => {
  const { REACT_APP_API_KEY } = process.env;

  var columns = [
    {
      title: "_id",
      field: "_id",
      hidden: true,
    },
    {
      title: "gameID",
      field: "id",
      hidden: true,
    },
    { title: "Name", field: "name" },
    {
      title: "Release Date",
      field: "releaseDate",
    },
  ];
  const user = useContext(AuthContext);
  const [game, setGame] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/games" + "/" + user.user.id).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);
  const handleRowClick = async (event, rowData) => {
    console.log(rowData.id);
    const res = await gamesApi.get(
      "/" + rowData.id + "?" + "key=" + REACT_APP_API_KEY
    );
    const games = res.data;
    console.log(games);
    fetch(
      `https://api.rawg.io/api/games?search=${games.slug}&key=${REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then(({ results }) => {
        results === undefined ? alert("no games found") : console.log("sup");
        setGame(results[0]);
        console.log("results");
        console.log(game);
        const test = results[0];
        props.history.push({
          pathname: `/game/${test.slug}`,
          gameProps: {
            game: test,
          },
        });
      });
  };
  return (
    <div>
      <MaterialTable
        title="Game List"
        columns={columns}
        onRowClick={handleRowClick}
        data={data}
        icons={TableIcons}
      ></MaterialTable>
    </div>
  );
};

export default GameList;