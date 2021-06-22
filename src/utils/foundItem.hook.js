/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:3000/api`,
});


export function useFoundItemState(userID, itemID, item) {
  const [founditem, setFounditem] = useState(false);

  useEffect(() => {
    function handleStatusChange() {
      setFounditem(true);
    }
    api.get(`/${item}/${userID}`).then((res) => {
      var __FOUND = res.data.find(function (post, index) {
        if (post.id === itemID.toString()) {
          handleStatusChange();
          return true;
        }
        return false;
      });
    });
  }, []);

  return founditem;
}
