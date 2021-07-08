import React, { useContext, useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

import { AppBar, Toolbar } from "@material-ui/core";
import { AuthContext } from "../context/auth";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Drawer, Link, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuButton from "./menuButton";
const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#708090",
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#1b1b1b4",
    textAlign: "left",
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  drawerContainer: {
    padding: "20px 30px",
  },
}));
const headersData = [
  {
    label: "Login",
    href: "/login",
  },
  {
    label: "Register",
    href: "/register",
  },
];

const headersDataLogged = [
  {
    label: "Search Game",
    href: "/search",
  },
  {
    label: "Search Book",
    href: "/searchbook",
  },
  {
    label: "Search Movie",
    href: "/searchmovie",
  },
  {
    label: "Game List",
    href: "/gamelist",
  },
  {
    label: "Book List",
    href: "/booklist",
  },
  {
    label: "Movie List",
    href: "/movielist",
  },
];

const menuSearchItems = [
  {
    name: "Search",
    label: "Search Game",
    href: "/search",
  },
  {
    name: "Search",
    label: "Search Book",
    href: "/searchbook",
  },
  {
    label: "Search Movie",
    href: "/searchmovie",
  },
];

const menuListItems = [
  {
    name: "List",
    label: "Game List",
    href: "/gamelist",
  },
  {
    name: "List",
    label: "Book List",
    href: "/booklist",
  },
  {
    name: "List",
    label: "Movie List",
    href: "/movielist",
  },
];

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const { header, logo, menuButton, toolbar, drawerContainer } = useStyles();
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;
  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));
    const drawerMenu = user ? (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
          <div className={drawerContainer}>
            {getDrawerChoicesLogged()}
            <Link
              {...{
                component: RouterLink,
                to: "/",
                color: "inherit",
                style: { textDecoration: "none" },
                key: "logout",
                onClick: logout,
              }}
            >
              <MenuItem>Logout</MenuItem>
            </Link>
          </div>
        </Drawer>
        <div>{updatesAppLogo}</div>
      </Toolbar>
    ) : (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
          <div className={drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>
        <div>{updatesAppLogo}</div>
      </Toolbar>
    );
    return drawerMenu;
  };
  const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Link
          {...{
            component: RouterLink,
            to: href,
            color: "inherit",
            style: { textDecoration: "none" },
            key: label,
          }}
        >
          <MenuItem>{label}</MenuItem>
        </Link>
      );
    });
  };
  const getDrawerChoicesLogged = () => {
    return headersDataLogged.map(({ label, href }) => {
      return (
        <Link
          {...{
            component: RouterLink,
            to: href,
            color: "inherit",
            style: { textDecoration: "none" },
            key: label,
          }}
        >
          <MenuItem>{label}</MenuItem>
        </Link>
      );
    });
  };
  const displayDesktop = () => {
    const menuBar = user ? (
      <Toolbar className={toolbar}>
        {updatesAppLogo}{" "}
        <div>
          {/* {getMenuButtonsLogged()} */}
          <MenuButton menuSearchItems={menuSearchItems}></MenuButton>
          <MenuButton menuSearchItems={menuListItems}></MenuButton>
          <Button
            {...{
              key: "logout",
              color: "inherit",
              to: "/",
              component: RouterLink,
              className: menuButton,
              onClick: logout,
            }}
          >
            Logout
          </Button>
        </div>
      </Toolbar>
    ) : (
      <Toolbar className={toolbar}>
        {updatesAppLogo} <div>{getMenuButtons()}</div>
      </Toolbar>
    );
    return menuBar;
  };

  const updatesAppLogo = (
    <Typography variant="h6" component="h1" className={logo}>
      My Updates{" "}
    </Typography>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
            className: menuButton,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  return (
    <header>
      <AppBar className={header}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
}

export default MenuBar;
