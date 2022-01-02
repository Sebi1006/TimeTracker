import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Snackbar,
  TextField
} from '@mui/material';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateAttributesFree } from '../../utils/config';

export const AccountProfileDetails = (props) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    text: '',
    severity: 'info',
    vertical: 'top',
    horizontal: 'center'
  });

  const [token, setToken] = useState('');

  const [submit, setSubmit] = useState(false);

  const { vertical, horizontal, open, text, severity } = snackbar;

  const handleOpen = (text, severity) => {
    setSnackbar({ ...snackbar, open: true, text: text, severity: severity });
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email address')
        .max(255)
        .required('Email address is required'),
      firstName: Yup
        .string()
        .max(255)
        .required('First name is required'),
      lastName: Yup
        .string()
        .max(255)
        .required('Last name is required'),
      phone: Yup
        .string()
        .max(255)
    }),
    onSubmit: () => {
      setSubmit(true);
      updateAttributesFree(
        token,
        formik.values.firstName,
        formik.values.lastName,
        formik.values.email,
        formik.values.phone)
        .then(() => {
          handleOpen(
            'User data has been updated successfully. Please sign in again for the changes to take effect.',
            'success');
          setTimeout(() => {
            router.push('/login');
          }, 5000);
        })
        .catch(() => {
          handleOpen('An error occurred while changing user data. Please try again later.',
            'error');
          setSubmit(false);
        });
    }
  });

  useEffect(() => {
      setToken(JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH')).accessToken);

      formik.setValues({
        firstName: props.user.firstName,
        lastName: props.user.lastName,
        email: props.user.email,
        phone: props.user.phone || ''
      });
    },
    [
      props.user.email,
      props.user.firstName,
      props.user.lastName,
      props.user.phone
    ]);

  return (
    <>
      <form
        autoComplete="off"
        noValidate
        onSubmit={formik.handleSubmit}
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
                  error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                  fullWidth
                  helperText={formik.touched.firstName && formik.errors.firstName}
                  label="First Name"
                  name="firstName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  error={Boolean(formik.touched.lastName && formik.errors.lastName)}
                  fullWidth
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  label="Last Name"
                  name="lastName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  error={Boolean(formik.touched.phone && formik.errors.phone)}
                  fullWidth
                  helperText={formik.touched.phone && formik.errors.phone}
                  label="Phone Number"
                  name="phone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  variant="outlined"
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
              disabled={submit}
              type="submit"
              variant="contained"
            >
              Save Details
            </Button>
          </Box>
        </Card>
      </form>
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
