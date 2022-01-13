import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Snackbar,
  Typography
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { getAvatar, updateAvatarUrl, uploadAvatar } from '../../utils/config';

export const AccountProfile = (props) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    text: '',
    severity: 'info',
    vertical: 'top',
    horizontal: 'center'
  });

  const [avatar, setAvatar] = useState('');

  const inputFile = useRef(null);

  const { vertical, horizontal, open, text, severity } = snackbar;

  const handleOpen = (text, severity) => {
    setSnackbar({ ...snackbar, open: true, text: text, severity: severity });
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleClick = () => {
    if (JSON.parse(localStorage.getItem('USER_INFORMATION')).subModel === 'free') {
      handleOpen('This functionality is not available in free version.', 'info');
    } else {
      inputFile.current.click();
    }
  };

  const handleFileUpload = (event) => {
    const { files } = event.target;

    if (files && files.length) {
      const currentFile = files[0];
      let formData = new FormData();
      formData.append('file', currentFile);

      uploadAvatar(JSON.parse(localStorage.getItem('USER_INFORMATION')).userId, formData)
        .then(() => {
          let fileName = JSON.parse(localStorage.getItem('USER_INFORMATION')).userId
            + '.'
            + currentFile.name.split('.').pop();

          updateAvatarUrl(JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH')).accessToken,
            fileName);
        })
        .then(() => {
          handleOpen(
            'Profile picture has been uploaded successfully. Please reload the page to see the changes.',
            'success');
        })
        .catch(() => {
          handleOpen(
            'An error occurred while uploading the profile picture. Please try again later.',
            'error');
        });
    }
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('USER_INFORMATION')) !== null) {
      if (typeof JSON.parse(localStorage.getItem('USER_INFORMATION')).avatarUrl !== 'undefined') {
        getAvatar(JSON.parse(localStorage.getItem('USER_INFORMATION')).avatarUrl)
          .then(imageBlob => {
            if (imageBlob.type === 'application/octet-stream') {
              const imageObjectURL = URL.createObjectURL(imageBlob);
              setAvatar(imageObjectURL);
            }
          });
      }
    }
  }, []);

  return (
    <>
      <Card {...props}>
        <CardContent>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Avatar
              src={avatar}
              sx={{
                height: 64,
                mb: 2,
                width: 64
              }}
            />
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h5"
            >
              {props.user.firstName + ' ' + props.user.lastName}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Entrance Date: {props.user.entranceDate}
            </Typography>
          </Box>
        </CardContent>
        <Divider/>
        <CardActions>
          <input
            accept="image/*"
            ref={inputFile}
            onChange={handleFileUpload}
            type="file"
            hidden
          />
          <Button
            color="primary"
            fullWidth
            variant="text"
            onClick={handleClick}
          >
            Upload Picture
          </Button>
        </CardActions>
      </Card>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
        autoHideDuration={5000}
      >
        <Alert
          severity={severity}
          sx={{ width: '100%' }}>
          {text}
        </Alert>
      </Snackbar>
    </>
  );
};
