import React, { useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { useProfileContext } from '../hooks/useProfile';
import { useEffect } from 'react';
import useAuthenticApi from '../hooks/useAuthenticApi';

const ControlCenter = () => {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const { profile } = useProfileContext();
  const navigate = useNavigate();
  const authApi = useAuthenticApi();

  useEffect(() => {
    if (profile?.id) {
      authApi
        .get(`/auth/get_user_role.php?username=${profile.username}`)
        .then(({ data }) => {
          if (data?.role !== 'admin') {
            alert('Sorry, only authorized user can reach this page.');
            navigate('/');
          }
        })
        .catch(() => {
          alert('Loading Error! Please Retry.');
        })
        .finally(() => {
          setLoading(false);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  const submit = (e) => {
    e.preventDefault();
    api
      .put('/control_center/update_title.php', { title })
      .then(({ data }) => {
        alert(data.messages);
        window.location.reload(false); // refresh
      })
      .catch(() => {
        alert('Update Error! Please Retry.');
      });
  };

  if (loading)
    return (
      <Typography variant="h5" color="primary" sx={{ textAlign: 'center' }}>
        Loading...
      </Typography>
    );

  return (
    <Box>
      <Box component="form" onSubmit={submit}>
        <Stack spacing={3} sx={{ maxWidth: '60%', margin: 'auto' }}>
          <Typography variant="h5" color="primary.light">
            Change a New Website Title
          </Typography>
          <TextField
            id="title"
            label="New Title"
            variant="outlined"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ControlCenter;
