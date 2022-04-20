import React, { useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import api from '../api';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useProfileContext } from '../hooks/useProfile';
import { useEffect } from 'react';
import useAuthenticApi from '../hooks/useAuthenticApi';

const Layout = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [avatarImage, setAvatarImage] = useState(null);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  const authApi = useAuthenticApi();
  const { profile, setProfile } = useProfileContext();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const logout = () => {
    api
      .get('/auth/login.php?logout')
      .then((res) => {
        alert('You have been logout.');
        localStorage.removeItem('profile');
        setProfile({});
        navigate('/login');
      })
      .catch((error) => {
        alert('Logout Error! Please Retry.');
      });
  };

  useEffect(() => {
    console.log('layout', profile.imageLink);
    if (!profile.imageLink) {
      authApi
        .get('/auth/get_avatar_image.php', {
          responseType: 'arraybuffer',
        })
        .then((res) => {
          setAvatarImage(res.data);
        });
    }

    authApi
      .get('/control_center/get_title.php')
      .then(({ data }) => {
        setTitle(data.value);
      })
      .catch((error) => {
        alert('Loading Title Error! Please Retry.');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goControlCenter = () => {
    navigate('/control-center');
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <AppBar position="static" sx={{ mb: 2 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              color="primary"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              <Link to="/" style={{ textDecoration: 'none', color: 'unset' }}>
                {title}
              </Link>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem onClick={logout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
                <MenuItem onClick={goControlCenter}>
                  <Typography textAlign="center">Control Center</Typography>
                </MenuItem>
              </Menu>
            </Box>

            <Typography
              variant="h6"
              noWrap
              component="div"
              color="primary"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              <Link to="/" style={{ textDecoration: 'none', color: 'unset' }}>
                {title}
              </Link>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={goControlCenter}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Control Center
              </Button>
              <Button
                onClick={logout}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Logout
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                {profile?.img_link ? (
                  <Avatar alt="Remy Sharp" src={profile.img_link} />
                ) : (
                  <Box sx={{ width: '30px' }}>
                    <img src={avatarImage} alt="avatar" />
                  </Box>
                )}
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </Box>
  );
};
export default Layout;
