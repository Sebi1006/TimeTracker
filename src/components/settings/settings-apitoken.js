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
          title="API Token"
          subheader="Generate an API token"
        />
        <Divider/>
        <CardContent>
          <TextField
            fullWidth
            label="API Token"
            name="token"
            value={values.token}
            onChange={handleChange}
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
