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
import { signInFree } from '../utils/config';
import { useState } from 'react';

const Login = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    text: 'An error occurred while signing in. Please try again later.',
    severity: 'error',
    vertical: 'top',
    horizontal: 'center'
  });

  const [submit, setSubmit] = useState(false);

  const { vertical, horizontal, open, text, severity } = snackbar;

  const handleOpen = () => {
    setSnackbar({ ...snackbar, open: true });
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Must be a valid email address')
        .max(255)
        .required(
          'Email address is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required')
    }),
    onSubmit: () => {
      setSubmit(true);
      signInFree(formik.values.email, formik.values.password)
        .then(() => {
          router.push('/');
        })
        .catch(() => {
          handleOpen();
          setSubmit(false);
        });
    }
  });

  return (
    <>
      <Head>
        <title>
          Login | Time Tracker
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
                    Login
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
                  </Typography>
                </Box>
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
                    Sign In Now
                  </Button>
                </Box>
                <Divider sx={{ marginBottom: 2, marginTop: 1 }}/>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  Don&apos;t have an account?
                  {' '}
                  <NextLink
                    href="/register"
                    passHref
                  >
                    <Link
                      variant="subtitle2"
                      underline="hover"
                      sx={{
                        cursor: 'pointer'
                      }}
                    >
                      Sign Up
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

export default Login;
