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
  Grid,
  Link,
  TextField,
  Typography
} from '@mui/material';

const RegisterEnterprise = () => {
  const router = useRouter();
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
      router.push('/');
    }
  });

  return (
    <>
      <Head>
        <title>
          Register Enterprise | Time Tracker
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
                  error={Boolean(formik.touched.organizationName && formik.errors.organizationName)}
                  fullWidth
                  helperText={formik.touched.organizationName && formik.errors.organizationName}
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
                  onChange={formik.handleChange}
                  value={formik.values.numberOfUsers}
                  variant="outlined"
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
                    disabled={formik.isSubmitting}
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
    </>
  );
};

export default RegisterEnterprise;
