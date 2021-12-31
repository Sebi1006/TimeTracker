import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';

export const AccountProfileDetails = (props) => {
  const [values, setValues] = useState({
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    entranceDate: '',
    avatarUrl: ''
  });

  useEffect(() => {
      setValues({
        userId: props.user.userId,
        firstName: props.user.firstName,
        lastName: props.user.lastName,
        email: props.user.email,
        phone: props.user.phone || '',
        entranceDate: props.user.entranceDate,
        avatarUrl: props.user.avatarUrl || ''
      });
    },
    [
      props.user.avatarUrl,
      props.user.email,
      props.user.entranceDate,
      props.user.firstName,
      props.user.lastName,
      props.user.phone,
      props.user.userId
    ]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          title="Profile"
          subheader="The information below can be edited"
        />
        <Divider/>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={values.phone}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider/>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            disabled={values.firstName === '' || values.lastName === '' || values.email === ''}
          >
            Save Details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
