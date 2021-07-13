import axios from "axios";
const api = axios.create({
  baseURL: `http://localhost:3000/api`,
});

export default function authHeader(token) {
  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
}
export async function addGame(game, user) {
  console.log(user);
  const gameToAdd = {
    name: game.name,
    score: game.rating,
    releaseDate: game.released,
    id: game.id,
  };
  api
    .post("/games/" + user.user.id, gameToAdd, {
      headers: authHeader(user.user.token),
    })
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

export async function addBook(book, user) {
  const bookToAdd = {
    name: book.volumeInfo.title,
    publishedDate: book.volumeInfo.publishedDate,
    averageRating: book.volumeInfo.averageRating,
    id: book.volumeInfo.industryIdentifiers[1].identifier,
  };

  api
    .post("/books/" + user.user.id, bookToAdd, {
      headers: authHeader(user.user.token),
    })
    .then((res) => {
      if (res.status === 200) {
        console.log("book added");
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Error adding book");
    });
}

export async function addMovie(movie, user) {
  const movieToAdd = {
    Title: movie.Title,
    Year: movie.Year,
    Metascore: movie.Metascore,
    id: movie.imdbID,
  };

  api
    .post("/movies/" + user.user.id, movieToAdd)
    .then((res) => {
      if (res.status === 200) {
        console.log("movie added");
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Error adding movie");
    });
}
