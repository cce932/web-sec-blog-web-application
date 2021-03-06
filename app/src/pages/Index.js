import React, { useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Editor, Parser } from 'react-tiny-bbcode';
import api from '../api';
import theme from '../theme';
import SendIcon from '@mui/icons-material/Send';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useProfileContext } from '../hooks/useProfile';
import Message from '../components/Message';
import useAuthenticApi from '../hooks/useAuthenticApi';

const buttons = [
  {
    caption: '<b>B</b>',
    tag: 'b',
  },
  {
    caption: '<i>I</i>',
    tag: 'i',
  },
  {
    caption: '<u>U</u>',
    tag: 'u',
  },
  {
    caption: '{}',
    tag: 'code',
  },
  {
    caption:
      '<span style="color: red">C</span><span style="color: green">O</span><span style="color: blue">L</span>',
    tag: 'color',
    onClick: () => {
      return prompt('Enter color name or code in format ##rrggbb:');
    },
  },
  {
    caption: 'Img',
    tag: 'img',
    onClick: () => {
      return prompt('align left, right or stretch (leave empty for default):');
    },
  },
];

const Index = () => {
  const [allMessages, setAllMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [messageFile, setMessageFile] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { profile } = useProfileContext();
  const authApi = useAuthenticApi();
  const location = useLocation();

  useEffect(() => {
    if (profile?.id) {
      api
        .get('/message/get.php')
        .then(({ data }) => {
          setAllMessages(data.reverse());
        })
        .catch((err) => {
          alert('Get Messages Error! Please Retry.');
        })
        .finally(() => {
          setLoading(false);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, profile]);

  const addMessage = () => {
    if (!messageInput.length) {
      alert('Send Message Error! You should type in more than 1 word.');
      return;
    }

    if (messageInput.length > 250) {
      alert(
        `Message is tooo long! The numbers of word must be less than 250. Now it's ${messageInput.length} words.`
      );
      return;
    }

    let formData = new FormData();
    formData.append('message', messageInput);
    formData.append('username', profile.username);
    formData.append('file', messageFile);

    authApi
      .post('/message/create.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(({ data }) => {
        setAllMessages((prev) => [
          {
            id: data.id,
            message: messageInput,
            username: profile.username,
            name: messageFile?.name,
          },
          ...prev,
        ]);
        alert(data.msg_messages);
      })
      .catch((error) => {
        console.log('message create error', error);

        alert(
          'Send Message Error! Please Retry. Possible reason is that the attached file is too large.'
        );
      });
  };

  if (isLoading)
    return (
      <Typography variant="h5" color="primary" sx={{ textAlign: 'center' }}>
        Loading...
      </Typography>
    );

  return (
    <Box sx={{ py: 5 }}>
      <Stack spacing={4} sx={{ maxWidth: '60%', margin: 'auto' }}>
        <Typography variant="h5" color="primary.light">
          Leave a message ~
        </Typography>
        <Typography color="white" sx={{ mt: '5px !important' }}>
          (The numbers of words must be less than 250)
        </Typography>
        <Box>
          <Editor
            buttons={buttons}
            onChange={(value) => {
              setMessageInput(value.replace(/"/g, '\\"'));
            }}
            button={{
              style: {
                padding: 6,
                borderRadius: 4,
                color: 'white',
                border: `solid 1px ${theme.palette.primary.main}`,
                backgroundColor: '#222',
                marginRight: 15,
                cursor: 'pointer',
              },
            }}
            textarea={{
              style: {
                minWidth: '100%',
                minHeight: 100,
                borderRadius: 5,
                marginTop: 15,
                fontFamily: 'Roboto',
                fontSize: '16px',
                outline: 'none',
              },
            }}
          />
          <Box
            sx={{
              backgroundColor: 'grey.800',
              borderRadius: '5px',
              p: '2px',
              mb: 2,
            }}
          >
            <Parser bbcode={messageInput} />
          </Box>

          <Button
            variant="outlined"
            component="label"
            sx={{ width: '100%', mb: 1 }}
          >
            Select File
            <input
              type="file"
              hidden
              onChange={(e) => {
                setMessageFile(e.target.files[0]);
              }}
            />
          </Button>
          {messageFile && (
            <Typography>{`Selected File: ${messageFile?.name}`}</Typography>
          )}

          <Button
            onClick={addMessage}
            variant="contained"
            sx={{ mt: 2, float: 'right' }}
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </Box>

        <Typography variant="h5" color="primary.light" sx={{ pt: 5 }}>
          Messages Board???
        </Typography>

        {allMessages.map((message) => (
          <Message
            key={message.id}
            message={message}
            setAllMessages={setAllMessages}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default Index;
