import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { checkUser, logout } from "../../Features/userSlice";
import { startLoading, stopLoading } from "../../Features/loadingSlice";

const pages = ["Matches", "List", "Messages", "Users"];

const Navbar = () => {
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isLoading } = useSelector((state) => state.isLoading);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(startLoading());
      const userStorage = await localStorage.getItem("Token");
      const initial = userStorage ? await JSON.parse(userStorage) : null;
      if (initial != null) {
        dispatch(
          checkUser({
            ...initial,
          })
        );
        return dispatch(stopLoading());
      }
      dispatch(checkUser(null));
      return dispatch(stopLoading());
    };
    fetchUser();
  }, [dispatch]);

  useEffect(() => {
    if (user != null) {
      return setIsAuthenticated(true);
    }
    return setIsAuthenticated(false);
  }, [user]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (el) => {
    setAnchorElUser(null);
  };

  const onLogout = async () => {
    setAnchorElUser(null);
    await localStorage.clear();
    dispatch(logout());
  };

  return (
    <AppBar position='static' className='appbar'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ mr: 2, display: { xs: "none", md: "flex" }, color: "white" }}>
            <Link
              component={RouterLink}
              to='/'
              variant='inherit'
              sx={{ color: "white" }}
              underline='none'>
              Chat App
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            {isAuthenticated ? (
              <>
                <IconButton
                  size='large'
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleOpenNavMenu}
                  color='inherit'>
                  <MenuIcon />
                </IconButton>
                <Menu
                  id='menu-appbar'
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
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}>
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign='center'>{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : null}
          </Box>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            CHAT APP
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {isLoading ? (
              <>{null}</>
            ) : isAuthenticated ? (
              <>
                {pages.map((page) => (
                  <Button
                    key={page}
                    component={RouterLink}
                    to={`/${page}`}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}>
                    {page}
                  </Button>
                ))}
              </>
            ) : (
              <>{null}</>
            )}
          </Box>
          {isLoading ? (
            <>{null}</>
          ) : isAuthenticated ? (
            <Box sx={{ flexGrow: 0 }}>
              {user?.username}
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id='menu-appbar'
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
                onClose={handleCloseUserMenu}>
                <MenuItem key='Profile' onClick={handleCloseUserMenu}>
                  <Typography textAlign='center'>Profile</Typography>
                </MenuItem>
                <MenuItem key='Logout' onClick={onLogout}>
                  <Typography textAlign='center'>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <span styles={{ marginRight: "20px" }}>
                <Button
                  component={RouterLink}
                  to='/signup'
                  variant='contained'
                  color='warning'
                  styles={{ marginRight: "20px" }}>
                  Sign Up
                </Button>
              </span>
              <Button component={RouterLink} to='/login' variant='contained' color='warning'>
                Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
