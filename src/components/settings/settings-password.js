import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Snackbar,
  TextField
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { updatePasswordFree } from '../../utils/config';

export const SettingsPassword = (props) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    text: '',
    severity: 'info',
    vertical: 'top',
    horizontal: 'center'
  });

  const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail(JSON.parse(localStorage.getItem('USER_INFORMATION')).email);
  }, []);

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
      password: '',
      confirm: ''
    },
    validationSchema: Yup.object({
      password: Yup
        .string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,:;_|~@$!%*?&#+-])[A-Za-z\d.,:;_|~@$!%*?&#+-]{8,}$/,
          'Must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character'
        )
        .max(255)
        .required('Password is required'),
      confirm: Yup
        .string().when('password', {
          is: val => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref('password')],
            'Passwords do not match'
          )
        })
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,:;_|~@$!%*?&#+-])[A-Za-z\d.,:;_|~@$!%*?&#+-]{8,}$/,
          'Must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character'
        )
        .max(255)
        .required('Confirm Password is required')
    }),
    onSubmit: () => {
      setSubmit(true);
      updatePasswordFree(email, formik.values.password, formik.values.confirm)
        .then(() => {
          handleOpen(
            'Password has been updated successfully. Please sign in again with your new credentials.',
            'success');
          setTimeout(() => {
            router.push('/login');
          }, 5000);
        })
        .catch(() => {
          handleOpen('An error occurred while changing password. Please try again later.', 'error');
          setSubmit(false);
        });
    }
  });

  return (
    <>
      <form {...props} onSubmit={formik.handleSubmit}>
        <Card>
          <CardHeader
            title="Password"
            subheader="Update password"
          />
          <Divider/>
          <CardContent>
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
            <TextField
              error={Boolean(formik.touched.confirm && formik.errors.confirm)}
              fullWidth
              helperText={formik.touched.confirm && formik.errors.confirm}
              label="Confirm Password"
              margin="normal"
              name="confirm"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.confirm}
              variant="outlined"
            />
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
              Update Password
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
