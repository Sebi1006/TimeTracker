import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';

export const SettingsAPIToken = (props) => {
  const [values, setValues] = useState({
    token: ''
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
          subheader="API Token"
          title="Generate API Token"
        />
        <Divider/>
        <CardContent>
          <TextField
            fullWidth
            label="API Token"
            margin="normal"
            name="token"
            onChange={handleChange}
            value={values.token}
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
            variant="contained"
          >
            Generate Token
          </Button>
        </Box>
      </Card>
    </form>
  );
};
