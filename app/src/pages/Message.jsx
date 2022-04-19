import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import MessageComponent from '../components/Message';
import { useEffect } from 'react';
import useAuthenticApi from '../hooks/useAuthenticApi';

const Message = () => {
  const { id } = useParams();
  const authApi = useAuthenticApi();
  const [message, setMessage] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.pathname);
  useEffect(() => {
    authApi
      .get(`/message/get.php?id=${id}`)
      .then(({ data }) => {
        setMessage(data);
      })
      .catch((error) => {
        console.log('error', error);
        if (location.pathname.includes('/message/')) navigate('/');
      });
  }, []);

  if (!Object.keys(message).length) return <Box sx={{ p: 4 }}>Loading...</Box>;

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
