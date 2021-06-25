import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
  },
}));
const MenuButton = (props) => {
  const { menuButton } = useStyles();
  const menuSearchItems = props.menuSearchItems;
  console.log(menuSearchItems);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const getMenuButtons = () => {
    return menuSearchItems.map(({ label, href }) => {
      return (
        <MenuItem
          {...{
            to: href,
            component: RouterLink,
            onClick: handleClose,
          }}
        >
          {label}
        </MenuItem>
      );
    });
  };
  return (
    <React.Fragment>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        color="inherit"
        onClick={handleClick}
        className={menuButton}
      >
        {menuSearchItems[0].name}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {getMenuButtons()}
      </Menu>
    </React.Fragment>
  );
};

export default MenuButton;
