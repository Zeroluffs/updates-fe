import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import Home from "./pages/Home";
import MenuBar from "./components/MenuBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/auth";
import AuthRoute from "./utils/AuthRoute";
import Search from "./components/Search";
import GameDetail from "./components/GameDetail";
import BookDetail from "./components/BookDetail";
import GameList from "./components/game-list.component";
import SearchBook from "./components/SearchBook";
import BookList from "./components/book-list.component";
import SearchMovie from "./components/Movies/SearchMovie";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/searchbook" component={SearchBook} />
          <Route exact path="/searchmovie" component={SearchMovie} />
          <Route path="/game/:name" component={GameDetail} />
          <Route path="/book/:name" component={BookDetail} />
          <Route exact path="/gamelist" component={GameList} />
          <Route exact path="/booklist" component={BookList} />
          <AuthRoute exact path="/login" component={Login}></AuthRoute>
          <AuthRoute exact path="/register" component={Register}></AuthRoute>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
