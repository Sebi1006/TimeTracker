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
import { useState } from 'react';

export const AccountProfile = (props) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    text: 'This functionality is not available in free version.',
    severity: 'info',
    vertical: 'top',
    horizontal: 'center'
  });

  const { vertical, horizontal, open, text, severity } = snackbar;

  const handleOpen = () => {
    setSnackbar({ ...snackbar, open: true });
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleClick = () => {
    if (JSON.parse(localStorage.getItem('USER_INFORMATION')).subModel === 'free') {
      handleOpen();
    }
  };

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
              src={props.user.avatarUrl || ''}
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
