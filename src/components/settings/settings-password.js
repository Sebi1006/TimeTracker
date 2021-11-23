import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';

export const SettingsPassword = (props) => {
  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form {...props}>
      <Card>
        <CardHeader
          title="Password"
          subheader="Update password"
        />
        <Divider/>
        <CardContent>
          <TextField
            fullWidth
            label="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            margin={'normal'}
            type="password"
          />
          <TextField
            fullWidth
            label="Confirm Password"
            name="confirm"
            value={values.confirm}
            onChange={handleChange}
            margin={'normal'}
            type="password"
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
            variant="contained"
          >
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );
};
