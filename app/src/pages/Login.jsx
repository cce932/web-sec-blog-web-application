import React, { useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import api from '../api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import errorHandler from '../utils/errorHandler';
import { useContext } from 'react';
import { ProfileContext } from '../hooks/useProfile';

const Login = () => {
  const [data, setData] = useState({ username: 'df', password: 'denade' });
  const [error, setError] = useState('');
  const { setProfile } = useContext(ProfileContext);
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    api
      .post('/auth/login.php', data)
      .then(({ data }) => {
        alert(data.message);
        setProfile(data.data);
        localStorage.setItem('profile', JSON.stringify(data.data));
        navigate('/');
      })
      .catch((error) => {
        alert('Login Error! Please Retry.');
        setError(errorHandler(error));
      });
  };

  return (
    <Box>
      <Box component="form" onSubmit={submit}>
        <Stack spacing={3} sx={{ maxWidth: '60%', margin: 'auto' }}>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            value={data.username}
            onChange={(e) => {
              setData((data) => ({ ...data, username: e.target.value }));
            }}
          />
          <TextField
            id="password"
            type="password"
            label="Passowrd"
            variant="outlined"
            value={data.password}
            onChange={(e) => {
              setData((data) => ({ ...data, password: e.target.value }));
            }}
          />
          {error && (
            <Typography
              variant="subtitle1"
              color="error"
              sx={{ textAlign: 'center' }}
            >
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained">
            Submit
          </Button>
          <Typography sx={{ textAlign: 'center' }}>
            {'Go to '}
            <Link to="/register" style={{ color: 'white' }}>
              Register
            </Link>
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default Login;
