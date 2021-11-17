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
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

export const ProjectListToolbar = (props) => {
  const [dialog, setDialog] = useState(false);

  const currentDate = new Date();

  const [values, setValues] = useState({
    id: '',
    title: '',
    description: '',
    createdAt: currentDate.getDate()
      + '/'
      + (currentDate.getMonth() + 1)
      + '/'
      + currentDate.getFullYear(),
    numberOfMembers: 0
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
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
      title: '',
      description: ''
    });
  };

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
          Projects
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={openDialog}
          >
            Add Project
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
      </Box>
      <Dialog onClose={closeDialog} open={dialog}>
        <DialogTitle>
          Add Project
        </DialogTitle>
        <DialogContent>
          <Typography marginBottom={1}>
            Enter your project details in the following text fields:
          </Typography>
          <TextField
            fullWidth
            placeholder="Project Title"
            name="title"
            value={values.title}
            onChange={handleChange}
            margin={'dense'}
          />
          <TextField
            fullWidth
            placeholder="Project Description"
            name="description"
            value={values.description}
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
              props.addProject(values);
              closeDialog();
            }}
            autoFocus
            disabled={values.title === '' || values.description === ''}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
