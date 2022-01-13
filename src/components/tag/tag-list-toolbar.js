import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

export const TagListToolbar = (props) => {
  const [dialog, setDialog] = useState(false);

  const [values, setValues] = useState({
    id: '',
    name: ''
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      name: event.target.value,
      id: uuid()
    });
  };

  const openDialog = () => {
    setDialog(true);
  };

  const closeDialog = () => {
    setDialog(false);
    setValues({
      ...values,
      id: '',
      name: ''
    });
  };

  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    setAdmin(JSON.parse(localStorage.getItem('USER_INFORMATION')).roles.includes('ROLE_ADMIN'));
  }, []);

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
          Tags
        </Typography>
        {
          admin &&
          <Box sx={{ m: 1 }}>
            <Button
              color="primary"
              variant="contained"
              onClick={openDialog}
            >
              Add Tag
            </Button>
          </Box>
        }
      </Box>
      <Box sx={{ mt: 3 }}>
      </Box>
      <Dialog onClose={closeDialog} open={dialog}>
        <DialogTitle>
          Add Tag
        </DialogTitle>
        <DialogContent>
          <Typography marginBottom={1}>
            Enter the tag name you want to create:
          </Typography>
          <TextField
            fullWidth
            label="Tag Name"
            name="tag"
            value={values.name}
            onChange={handleChange}
            margin={'dense'}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>
            Cancel
          </Button>
          <Button
            onClick={function () {
              props.addTag(values);
              closeDialog();
            }}
            autoFocus
            disabled={values.name === ''}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
