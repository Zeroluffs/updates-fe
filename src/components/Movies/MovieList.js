import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth";
import axios from "axios";
import MaterialTable from "material-table";
import { Delete as DeleteIcon } from "@material-ui/icons";
import TableIcons from "../TableIcons";
import "../../Styles/Tables.css";
const api = axios.create({
  baseURL: `http://localhost:3000/api`,
});
const moviesApi = axios.create({
  baseURL: `http://www.omdbapi.com/`,
});

const MovieList = (props) => {
  const { REACT_APP_API_KEY3 } = process.env;

  var columns = [
    {
      title: "_id",
      field: "_id",
      hidden: true,
    },
    {
      title: "movieID",
      field: "id",
      hidden: true,
    },
    { title: "Title", field: "Title" },
    {
      title: "Release Date",
      field: "Year",
    },
  ];
  const user = useContext(AuthContext);
  const [movie, setMovie] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get(`/movies/${user.user.id}`).then((res) => {
      setData(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRowClick = async (event, rowData) => {
    console.log(rowData.id);
    const res = await moviesApi.get(
      `?apikey=${REACT_APP_API_KEY3}&i=${rowData.id}`
    );
    console.log(res.data);
    const movie = res.data;
    movie === undefined ? alert("no movie found") : console.log("error");
    props.history.push({
      pathname: `/movie/${movie.Title}`,
      movieProps: {
        movie: movie,
      },
    });
  };
  const handleRowDelete = (oldData, resolve) => {
    api
      .delete(`/movies/${user.user.id}/${oldData._id}`)
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
        title="Movie List"
        columns={columns}
        onRowClick={handleRowClick}
        data={data}
        icons={TableIcons}
        actions={[
          {
            icon: () => <DeleteIcon />,
            tooltip: "Remove Movie",
            onClick: (event, oldData) => {
              if (
                window.confirm("Are you sure you want to remove the movie?")
              ) {
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

export default MovieList;
