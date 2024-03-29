import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth";
import axios from "axios";
import MaterialTable from "material-table";
import { Delete as DeleteIcon } from "@material-ui/icons";
import TableIcons from "./TableIcons";
import "../Styles/Tables.css";
import authHeader from "../utils/helper.functions";

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
  const [data, setData] = useState([]);
  useEffect(() => {
    api
      .get(`/games/${user.user.id}`)
      .then((res) => {
        setData(res.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleRowClick = async (event, rowData) => {
    const res = await gamesApi.get(`/${rowData.id}?key=${REACT_APP_API_KEY}`);
    const games = res.data;
    games === undefined ? alert("no game found") : console.log("");
    props.history.push({
      pathname: `/game/${games.slug}`,
      gameProps: {
        game: games,
      },
    });
  };
  const handleRowDelete = (oldData, resolve) => {
    api
      .delete(`/games/${user.user.id}/${oldData._id}`, {
        headers: authHeader(user.user.token),
      })
      .then((res) => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve();
        console.log(res);
      })
      .catch((error) => {
        // setErrorMessages(["Delete failed! Server error"]);
        // setIserror(true);
        resolve();
      });
  };
  return (
    <div className="itemTable">
      <MaterialTable
        title="Game List"
        columns={columns}
        onRowClick={handleRowClick}
        data={data}
        icons={TableIcons}
        actions={[
          {
            icon: () => <DeleteIcon />,
            tooltip: "Remove Game",
            onClick: (event, oldData) => {
              if (window.confirm("Are you sure you want to remove the game?")) {
                new Promise((resolve) => {
                  handleRowDelete(oldData, resolve);
                });
              }
            },
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
      ></MaterialTable>
    </div>
  );
};

export default GameList;
