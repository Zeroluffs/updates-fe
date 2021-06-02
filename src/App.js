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

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={Search} />
          <Route path="/game/:name" component={GameDetail} />
          <AuthRoute exact path="/login" component={Login}></AuthRoute>
          <AuthRoute exact path="/register" component={Register}></AuthRoute>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
