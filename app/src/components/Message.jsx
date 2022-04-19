import React from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useProfileContext } from '../hooks/useProfile';
import { Parser } from 'react-tiny-bbcode';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DownloadIcon from '@mui/icons-material/Download';
import api from '../api';
import useAuthenticApi from '../hooks/useAuthenticApi';

export default function Message({ message, setAllMessages = null }) {
  const { profile } = useProfileContext();
  const authApi = useAuthenticApi();
  const navigate = useNavigate();
  const location = useLocation();

  const deleteMessage = (id) => () => {
    authApi
      .delete(`/message/delete.php?id=${id}`)
      .then(({ data }) => {
        alert(data.messages);
        if (location.pathname.includes('/message/')) navigate('/');
        if (setAllMessages)
          setAllMessages((prev) => prev.filter((msg) => msg.id !== message.id));
      })
      .catch((error) => {
        console.log(error);
        alert('Delete Message Error! Please Retry.');
      });
  };

  const downloadFile = () => {
    api({
      url: `/file/get.php?message_id=${message.id}`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      console.log(response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        response.headers?.['content-disposition'].split('=')[1]
      );
      document.body.appendChild(link);
      link.click();
    });
  };

  return (
    <Box sx={{ border: 'solid 1px grey', p: 2, borderRadius: '5px' }}>
      <Box sx={{ display: 'flex' }}>
        <Link
          to={`/message/${message.id}`}
          style={{
            color: 'unset',
            display: 'block !important',
            flexGrow: 1,
            textDecoration: 'none',
          }}
        >
          <Parser bbcode={message.message} />
        </Link>

        {profile.username === message.username && ( // todo: use more security approach
          <IconButton
            color="secondary"
            size="small"
            onClick={deleteMessage(message.id)}
            sx={{ height: '34px' }}
          >
            <DeleteOutlineIcon />
          </IconButton>
        )}
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Typography
          variant="subtitle"
          color="primary.main"
          sx={{ width: '100%' }}
        >
          by {message.username}
        </Typography>
        {message?.name && (
          <Button
            color="primary"
            startIcon={<DownloadIcon />}
            onClick={downloadFile}
          >
            {message.name}
          </Button>
        )}
      </Box>
    </Box>
  );
}
