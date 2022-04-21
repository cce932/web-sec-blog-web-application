import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import MessageComponent from '../components/Message';
import { useEffect } from 'react';
import useAuthenticApi from '../hooks/useAuthenticApi';
import { useProfileContext } from '../hooks/useProfile';

const Message = () => {
  const { profile } = useProfileContext();
  const { id } = useParams();
  const authApi = useAuthenticApi();
  const [message, setMessage] = useState({});
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // check if profile exists
    if (profile?.id) {
      authApi
        .get(`/message/get.php?id=${id}`)
        .then(({ data }) => {
          setMessage(data);
        })
        .catch((error) => {
          console.log('error', error);
          if (location.pathname.includes('/message/')) navigate('/');
        }).finally(() => {
          setLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  if (isLoading) return (
      <Typography variant="h5" color="primary" sx={{ textAlign: 'center' }}>
        Loading...
      </Typography>
    );

  return (
    <Box sx={{ p: 4 }}>
      <Button
        onClick={() => {
          navigate('/');
        }}
        sx={{ mb: 4 }}
        startIcon={<ArrowBackIosIcon />}
      >
        Back
      </Button>
      <MessageComponent message={message} />
    </Box>
  );
};

export default Message;
