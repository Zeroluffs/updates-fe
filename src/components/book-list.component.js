import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth";
import axios from "axios";
import MaterialTable from "material-table";
import { Delete as DeleteIcon } from "@material-ui/icons";
import TableIcons from "./TableIcons";
import authHeader from "../utils/helper.functions";

const api = axios.create({
  baseURL: `http://localhost:3000/api`,
});
const booksApi = axios.create({
  baseURL: `https://www.googleapis.com/books/v1`,
});
const BookList = (props) => {
  const { REACT_APP_API_KEY2 } = process.env;

  var columns = [
    {
      title: "_id",
      field: "_id",
      hidden: true,
    },
    {
      title: "bookID",
      field: "id",
      hidden: true,
    },
    { title: "Title", field: "name" },
    {
      title: "Date of Publication",
      field: "publishedDate",
    },
  ];
  const user = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get(`/books/${user.user.id}`).then((res) => {
      setData(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleRowClick = async (event, rowData) => {
    let query = rowData.name.split(" ").join("-").toLowerCase();
    booksApi
      .get(
        `volumes?q=${query}hobbit+isbn:${rowData.id}&key=${REACT_APP_API_KEY2}`
      )
      .then((res) => {
        console.log(res.data.items[0]);
        const book = res.data.items[0];
        props.history.push({
          pathname: `/book/${rowData.name}`,
          bookProps: {
            book: book,
          },
        });
      });
  };
  const handleRowDelete = (oldData, resolve) => {
    api
      .delete(`/books/${user.user.id}/${oldData._id}`, {
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
        title="Book List"
        columns={columns}
        onRowClick={handleRowClick}
        data={data}
        icons={TableIcons}
        actions={[
          {
            icon: () => <DeleteIcon />,
            tooltip: "Remove Book",
            onClick: (event, oldData) => {
              if (window.confirm("Are you sure you want to remove the book?")) {
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

export default BookList;
