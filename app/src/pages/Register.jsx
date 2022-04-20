import React, { useState } from 'react';
import {
  Box,
  Button,
  Stack,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from '@mui/material';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import errorHandler from '../utils/errorHandler';

const Register = () => {
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [avatarLink, setAvatarLink] = useState('');
  const [avatarImage, setAvatarImage] = useState(null);
  const [uploadAvatarMethod, setUploadAvatarMethod] = useState('imageFile');
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    console.log(uploadAvatarMethod === 'imageFile', avatarImage);

    let formData = new FormData();
    formData.append('user_name', username);
    formData.append('user_password_new', password);
    formData.append('user_password_repeat', passwordRepeat);
    formData.append(
      'avatar',
      uploadAvatarMethod === 'imageFile' ? avatarImage : avatarLink
    );
    formData.append('upload_avatar_method', uploadAvatarMethod);

    api
      .post('/auth/register.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(({ data }) => {
        console.log(data);
        alert('Success! You can sign in now.');
        navigate(`/login`);
      })
      .catch((error) => {
        alert('Register Error! Please Retry.');
        setError(errorHandler(error));
      });
  };

  const selectAvatarImage = (e) => {
    const fileTypes = [
      'image/apng',
      'image/bmp',
      'image/gif',
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/svg+xml',
      'image/tiff',
      'image/webp',
      'image/x-icon',
    ];

    const file = e.target.files[0];
    if (fileTypes.includes(file.type)) setAvatarImage(file);
    else alert('The file must be IMAGE type.');
  };

  return (
    <Box>
      <Box component="form" onSubmit={submit}>
        <Stack spacing={4} sx={{ maxWidth: '60%', margin: 'auto' }}>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            id="password"
            type="password"
            label="Passowrd"
            variant="outlined"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <TextField
            id="passwordRepeat"
            type="password"
            label="Passowrd Repeat"
            variant="outlined"
            value={passwordRepeat}
            onChange={(e) => {
              setPasswordRepeat(e.target.value);
            }}
          />
          <Box>
            <FormLabel id="upload-avatar">
              Upload an Avatar (less than 200KB)
            </FormLabel>
            <RadioGroup
              aria-labelledby="upload-avatar"
              name="radio-buttons-group"
              defaultValue="imageFile"
              value={uploadAvatarMethod}
              onChange={(e, value) => {
                setUploadAvatarMethod(value);
              }}
            >
              <FormControlLabel
                value="imageFile"
                control={<Radio />}
                label="By a File"
              />
              <Box sx={{ pl: 4, width: '100%' }}>
                <Button
                  variant="outlined"
                  component="label"
                  sx={{ width: '100%' }}
                >
                  Select File
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={selectAvatarImage}
                  />
                </Button>
                {avatarImage && (
                  <Typography>{`Selected Image: ${avatarImage?.name}`}</Typography>
                )}
              </Box>
              <FormControlLabel
                value="imageLink"
                control={<Radio />}
                label="By a Link"
              />
              <Box sx={{ pl: 4, width: '100%' }}>
                <TextField
                  sx={{ width: '100%' }}
                  id="avatar"
                  type="avatar"
                  label="Image Link"
                  variant="outlined"
                  value={avatarLink}
                  onChange={(e) => {
                    setAvatarLink(e.target.value);
                  }}
                />
              </Box>
            </RadioGroup>
          </Box>
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
            <Link to="/login" style={{ color: 'white' }}>
              Login
            </Link>
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default Register;
