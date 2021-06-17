/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:3000/api`,
});
export function useFoundGameState(userID, gameID) {
  const [foundgame, setFoundgame] = useState(false);

  useEffect(() => {
    function handleStatusChange() {
      setFoundgame(true);
    }
    api.get(`/games/${userID}`).then((res) => {
      var __FOUND = res.data.find(function (post, index) {
        if (post.id === gameID.toString()) {
          handleStatusChange();
          return true;
        }
        return false;
      });
    });
  }, []);

  return foundgame;
}
