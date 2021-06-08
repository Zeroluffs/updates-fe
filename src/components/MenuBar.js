import React, { useContext, useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;

  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);
  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name={user.username} active as={Link} to="/" />
      <Menu.Menu position="right">
        <Menu.Item
          name="search"
          active={activeItem === "search"}
          onClick={handleItemClick}
          as={Link}
          to="/search"
        ></Menu.Item>
        <Menu.Item
          name="list"
          active={activeItem === "list"}
          onClick={handleItemClick}
          as={Link}
          to="/gamelist"
        ></Menu.Item>
        <Menu.Item name="logout" onClick={logout} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      ></Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        ></Menu.Item>
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        ></Menu.Item>
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
}

export default MenuBar;
