import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Link,
  Typography,
  Snackbar,
  TextField,
  Alert
} from '@mui/material';
import { signUpFree } from '../utils/config';
import { useState } from 'react';

const RegisterFree = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    text: '',
    severity: 'info',
    vertical: 'top',
    horizontal: 'center'
  });

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
      password: ''
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
      password: Yup
        .string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,:;_|~@$!%*?&#+-])[A-Za-z\d.,:;_|~@$!%*?&#+-]{8,}$/,
          'Must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character'
        )
        .max(255)
        .required('Password is required')
    }),
    onSubmit: () => {
      setSubmit(true);
      signUpFree(formik.values.firstName,
        formik.values.lastName,
        formik.values.email,
        formik.values.password)
        .then(() => {
          handleOpen(
            'User account has been created successfully. You can now sign in with your credentials.',
            'success');
          setTimeout(() => {
            router.push('/login');
          }, 5000);
        })
        .catch(() => {
          handleOpen('An error occurred while signing up. Please try again later.', 'error');
          setSubmit(false);
        });
    }
  });

  return (
    <>
      <Head>
        <title>
          Register Free | Time Tracker
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <Card>
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <Box textAlign="center" sx={{ my: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h4"
                    sx={{ marginBottom: 1 }}
                  >
                    Register
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign up to create a new account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                  fullWidth
                  helperText={formik.touched.firstName && formik.errors.firstName}
                  label="First Name"
                  margin="normal"
                  name="firstName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(formik.touched.lastName && formik.errors.lastName)}
                  fullWidth
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  label="Last Name"
                  margin="normal"
                  name="lastName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={submit}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign Up Now
                  </Button>
                </Box>
                <Divider sx={{ marginBottom: 2, marginTop: 1 }}/>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  Have an account?
                  {' '}
                  <NextLink
                    href="/login"
                    passHref
                  >
                    <Link
                      variant="subtitle2"
                      underline="hover"
                      sx={{
                        cursor: 'pointer'
                      }}
                    >
                      Sign In
                    </Link>
                  </NextLink>
                </Typography>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Box>
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

export default RegisterFree;
