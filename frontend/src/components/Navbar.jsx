import React, { useEffect, useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Badge,
} from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../assets/logo.png";
import { userLogoutActionFn } from "../redux/authReducer/authActions";
import { getInviteActionFn } from "../redux/inviteReducer/inviteActions";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { isAuth } = useSelector((state) => state.authReducer);
  const { data } = useSelector((state) => state.inviteReducer);
  //const isAuth = false;

  const handleLogout = (setting) => {
    if (setting === "Logout") {
      dispatch(userLogoutActionFn());
      //  alert(`${setting}`);
    }
  };

  // console.log("invitations: ", invitations);
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link to="/">
              <img height={"40px"} width={"40px"} src={Logo} />
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(event) => setAnchorElNav(event.currentTarget)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={(event) => setAnchorElNav(null)}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={(event) => setAnchorElNav(null)}>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Typography textAlign="center">Tasks</Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <Box
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link to="/">
              <img height={"40px"} width={"40px"} src={Logo} />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Button
                onClick={(event) => setAnchorElNav(null)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Tasks
              </Button>
            </Link>
          </Box>

          {isAuth ? (
            <>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={(event) => setAnchorElUser(event.currentTarget)}
                    sx={{ p: 0 }}
                  >
                    <Avatar alt="Remy Sharp" src="" />
                  </IconButton>
                </Tooltip>

                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={(event) => setAnchorElUser(null)}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={(event) => setAnchorElUser(null)}
                      sx={{ color: setting === "Logout" ? "red" : "" }}
                    >
                      <Typography
                        onClick={() => handleLogout(setting)}
                        textAlign="center"
                      >
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
          ) : (
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography>Login/Signup</Typography>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
