import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

export const UserListToolbar = (props) => {
  const [dialog, setDialog] = useState(false);

  const [date, setDate] = useState(new Date());

  const currentDate = new Date();

  const [values, setValues] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    entranceDate: currentDate.getDate()
      + '/'
      + (currentDate.getMonth() + 1)
      + '/'
      + currentDate.getFullYear(),
    avatarUrl: ''
  });

  const handleDate = (date) => {
    setDate(date);

    setValues({
      ...values,
      entranceDate: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    });
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
      id: uuid()
    });
  };

  const openDialog = () => {
    setDialog(true);
  };

  const closeDialog = () => {
    setDialog(false);

    setDate(new Date());

    setValues({
      ...values,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      entranceDate: currentDate.getDate()
        + '/'
        + (currentDate.getMonth() + 1)
        + '/'
        + currentDate.getFullYear(),
      avatarUrl: ''
    });
  };

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
          Users
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={openDialog}
          >
            Add User
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
      </Box>
      <Dialog onClose={closeDialog} open={dialog}>
        <DialogTitle>
          Add User
        </DialogTitle>
        <DialogContent>
          <Typography marginBottom={1}>
            Enter the user details in the following text fields:
          </Typography>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            margin={'dense'}
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            margin={'dense'}
          />
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            value={values.email}
            onChange={handleChange}
            margin={'dense'}
          />
          <TextField
            fullWidth
            label="Phone Number (optional)"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            margin={'dense'}
          />
          <Box sx={{ marginTop: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Entrance Date"
                value={date}
                onChange={handleDate}
                renderInput={(params) => <TextField {...params} />}
                mask="__/__/____"
                inputFormat="dd/MM/yyyy"
                toolbarFormat="dd/MM/yyyy"
              />
            </LocalizationProvider>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>
            Cancel
          </Button>
          <Button
            onClick={function () {
              props.addUser(values);
              closeDialog();
            }}
            autoFocus
            disabled={values.firstName === '' || values.lastName === '' || values.email === ''}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
