import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();
  const [Name] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography
            sx={{
              fontFamily: "Aladin",
              fontWeight: "bold",
            }}
            variant="h4"
          >
            Car corner
          </Typography>
          <IconButton
            sx={{ marginLeft: "auto" }}
            className="avatar"
            onClick={handleClick}
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar alt={Name ? Name : user.username} src="" />
          </IconButton>

          {/* Popup Menu */}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{ "aria-labelledby": "basic-button" }}
          >
            <MenuItem>
              <Typography>{Name ? Name : user.username}</Typography>
            </MenuItem>
            <MenuItem onClick={() => history.push("/home")}>Home</MenuItem>
            <MenuItem onClick={() => history.push("/userbookings")}>
              My Bookings
            </MenuItem>
            <MenuItem
              onClick={() => {
                localStorage.clear();
                window.location.reload(false);
                window.location.href = "/";
              }}
            >
              Log Out
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
