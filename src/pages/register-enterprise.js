import Head from 'next/head';
import NextLink from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Link,
  Snackbar,
  TextField,
  Typography
} from '@mui/material';
import { signUpEnterprise } from '../utils/config';
import { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';

const RegisterEnterprise = () => {
  const handleChange = (event) => {
    if (event.target.value < 100) {
      setPrice('');
    } else if (event.target.value >= 100 && event.target.value <= 500) {
      setPrice('150€');
    } else if (event.target.value > 500 && event.target.value <= 1000) {
      setPrice('200€');
    } else if (event.target.value > 1000 && event.target.value <= 5000) {
      setPrice('250€');
    } else if (event.target.value > 5000 && event.target.value <= 10000) {
      setPrice('300€');
    } else if (event.target.value > 10000 && event.target.value <= 20000) {
      setPrice('350€');
    } else if (event.target.value > 20000 && event.target.value <= 50000) {
      setPrice('400€');
    } else if (event.target.value > 50000 && event.target.value <= 100000) {
      setPrice('500€');
    } else if (event.target.value > 100000 && event.target.value <= 200000) {
      setPrice('600€');
    } else if (event.target.value > 200000 && event.target.value <= 300000) {
      setPrice('700€');
    } else if (event.target.value > 300000 && event.target.value <= 400000) {
      setPrice('800€');
    } else if (event.target.value > 400000 && event.target.value <= 500000) {
      setPrice('900€');
    } else if (event.target.value > 500000 && event.target.value <= 600000) {
      setPrice('1000€');
    } else if (event.target.value > 600000 && event.target.value <= 700000) {
      setPrice('1200€');
    } else if (event.target.value > 700000 && event.target.value <= 800000) {
      setPrice('1500€');
    } else if (event.target.value > 800000 && event.target.value <= 900000) {
      setPrice('1750€');
    } else if (event.target.value > 900000 && event.target.value <= 1000000) {
      setPrice('2000€');
    } else {
      setPrice('');
    }
  };

  const [snackbar, setSnackbar] = useState({
    open: false,
    text: '',
    severity: 'info',
    vertical: 'top',
    horizontal: 'center'
  });

  const [submit, setSubmit] = useState(false);

  const [url, setUrl] = useState('');

  const [price, setPrice] = useState('');

  const { vertical, horizontal, open, text, severity } = snackbar;

  const handleOpen = (text, severity) => {
    setSnackbar({ ...snackbar, open: true, text: text, severity: severity });
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const formik = useFormik({
    initialValues: {
      organizationName: '',
      numberOfUsers: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      cardName: '',
      cardNumber: '',
      cardExpiryDate: '',
      cardCvv: ''
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email address')
        .max(255)
        .required('Email address is required'),
      organizationName: Yup
        .string()
        .max(255)
        .required('Organization name is required'),
      numberOfUsers: Yup
        .number()
        .integer('Must be an integer')
        .min(100, 'Must be at least 100 users')
        .max(1000000, 'Must be at most 1 million users')
        .required('Number of users is required'),
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
        .required('Password is required'),
      cardName: Yup
        .string()
        .max(255)
        .required('Name on card is required'),
      cardNumber: Yup
        .string()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(8, 'Must be at least 8 characters')
        .max(19, 'Must be at most 19 characters')
        .required('Card number is required'),
      cardExpiryDate: Yup
        .string()
        .min(5, 'Must be exactly 5 characters')
        .max(5, 'Must be exactly 5 characters')
        .required('Expiration date is required'),
      cardCvv: Yup
        .string()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(3, 'Must be at least 3 characters')
        .max(4, 'Must be at most 4 characters')
        .required('Security code is required')
    }),
    onSubmit: () => {
      setSubmit(true);
      signUpEnterprise(formik.values.organizationName,
        formik.values.numberOfUsers,
        formik.values.firstName,
        formik.values.lastName,
        formik.values.email,
        formik.values.password,
        formik.values.cardName,
        formik.values.cardNumber,
        formik.values.cardExpiryDate,
        formik.values.cardCvv)
        .then(response => {
          handleOpen('Your instance has been created successfully.', 'success');
          setUrl(response.data);
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
          Register Enterprise | Time Tracker
        </title>
      </Head>
      {
        !submit ?
          <div>
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
                        error={Boolean(formik.touched.organizationName
                          && formik.errors.organizationName)}
                        fullWidth
                        helperText={formik.touched.organizationName
                        && formik.errors.organizationName}
                        label="Organization Name"
                        margin="normal"
                        name="organizationName"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.organizationName}
                        variant="outlined"
                      />
                      <TextField
                        error={Boolean(formik.touched.numberOfUsers && formik.errors.numberOfUsers)}
                        fullWidth
                        helperText={formik.touched.numberOfUsers && formik.errors.numberOfUsers}
                        label="Number of Users"
                        margin="normal"
                        name="numberOfUsers"
                        onBlur={formik.handleBlur}
                        onChange={(event) => {
                          formik.handleChange(event);
                          handleChange(event);
                        }}
                        value={formik.values.numberOfUsers}
                        variant="outlined"
                        InputProps={{
                          endAdornment: <InputAdornment position="end">{price}</InputAdornment>
                        }}
                      />
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
                      <Divider sx={{ marginBottom: 2, marginTop: 2 }}/>
                      <Typography
                        color="textPrimary"
                        variant="h6"
                      >
                        Credit Card Information
                      </Typography>
                      <Box>
                        <TextField
                          error={Boolean(formik.touched.cardName && formik.errors.cardName)}
                          helperText={formik.touched.cardName && formik.errors.cardName}
                          label="Name on Card"
                          margin="normal"
                          name="cardName"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.cardName}
                          variant="outlined"
                        />
                      </Box>
                      <Box>
                        <TextField
                          error={Boolean(formik.touched.cardNumber && formik.errors.cardNumber)}
                          helperText={formik.touched.cardNumber && formik.errors.cardNumber}
                          label="Card Number"
                          margin="normal"
                          name="cardNumber"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.cardNumber}
                          variant="outlined"
                        />
                      </Box>
                      <Grid
                        container
                      >
                        <Grid
                          item
                          lg={4}
                          md={4}
                          xs={12}
                        >
                          <TextField
                            error={Boolean(formik.touched.cardExpiryDate
                              && formik.errors.cardExpiryDate)}
                            helperText={formik.touched.cardExpiryDate
                            && formik.errors.cardExpiryDate}
                            label="Expiration Date"
                            placeholder="MM/YY"
                            margin="normal"
                            name="cardExpiryDate"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.cardExpiryDate}
                            variant="outlined"
                            sx={{ width: 150 }}
                          />
                        </Grid>
                        <Grid
                          item
                          lg={4}
                          md={4}
                          xs={12}
                        >
                          <TextField
                            error={Boolean(formik.touched.cardCvv && formik.errors.cardCvv)}
                            helperText={formik.touched.cardCvv && formik.errors.cardCvv}
                            label="Security Code"
                            margin="normal"
                            name="cardCvv"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.cardCvv}
                            variant="outlined"
                            sx={{ width: 150 }}
                          />
                        </Grid>
                      </Grid>
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
          </div>
          :
          <>
            <Box
              component="main"
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexGrow: 1,
                minHeight: '100%',
                marginBottom: 1
              }}
            >
              <Container>
                <Typography
                  color="textPrimary"
                  variant="h2"
                  align="center"
                  gutterBottom
                >
                  {url === '' ? 'Your instance is being created!' : 'Your instance is ready!'}
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="h5"
                  align="center"
                  gutterBottom
                >
                  {url === ''
                    ? 'Please be patient and do not reload this page, as the process can take a while...'
                    : 'Use the following link to sign in and to get started: ' + url}
                </Typography>
              </Container>
            </Box>
            <Box
              component="main"
              sx={{
                alignItems: 'center',
                flexGrow: 1,
                minHeight: '100%'
              }}
              textAlign="center"
            >
              {
                url === '' ?
                  <Container>
                    <CircularProgress size={80} thickness={4.0}/>
                  </Container>
                  :
                  <Container>
                    <CheckIcon sx={{ fontSize: 80 }}/>
                  </Container>
              }
            </Box>
          </>
      }
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

export default RegisterEnterprise;
