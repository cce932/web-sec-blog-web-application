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
    if (profile?.id && !profile.imageLink) {
      authApi
        .get('/auth/get_avatar_image.php', {
          responseType: 'blob',
        })
        .then((res) => {
          setAvatarImage(window.URL.createObjectURL(res.data));
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  useEffect(() => {
    authApi
      .get('/control_center/get_title.php')
      .then(({ data }) => {
        setTitle(data.value);
      })
      .catch((error) => {
        alert('Loading Title Error! Please Retry.');
      });
  }, [])

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
                {profile?.id ? 
                  <MenuItem onClick={logout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem> :
                  <>
                    <MenuItem onClick={() => {navigate('/login')}}>
                      <Typography textAlign="center">Login</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => {navigate('/register')}}>
                      <Typography textAlign="center">Register</Typography>
                    </MenuItem>
                  </>
                }
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
              {profile?.id ?
                <Button
                  onClick={logout}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Logout
                </Button> :
                 <>
                  <Button
                    onClick={() => {navigate('/login')}}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => {navigate('/register')}}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Register
                  </Button>
               </> 
              }
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {profile?.id ?(profile?.img_link ? (
                <Avatar alt="Remy Sharp" src={profile.img_link} />
              ) : (
                <Box>
                  <img src={avatarImage} alt="avatar" style={{objectFit: 'cover', width: '40px', height: '40px' }} />
                </Box>
              )) : <Avatar alt="Remy Sharp" src="" />}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </Box>
  );
};
export default Layout;
