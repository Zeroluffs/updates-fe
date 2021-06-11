import React, { useContext } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:3000/api`,
});

export async function addGame(game, user) {
  console.log(user);
  const gameToAdd = {
    name: game.name,
    score: game.rating,
    releaseDate: game.released,
    id: game.id,
  };
  api
    .post("/games/" + user.user.id, gameToAdd)
    .then((res) => {
      if (res.status === 200) {
        console.log("game added");
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Error adding game");
    });
}
