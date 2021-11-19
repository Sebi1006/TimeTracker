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

export const WorkListToolbar = (props) => {
  const [dialog, setDialog] = useState(false);

  const currentDate = new Date();

  const [values, setValues] = useState({
    id: '',
    workingHours: '',
    description: '',
    project: '',
    tag: '',
    date: '',
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
          Work Packages
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={openDialog}
          >
            Add Work Package
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
      </Box>
      <Dialog onClose={closeDialog} open={dialog}>
        <DialogTitle>
          Add Work Package
        </DialogTitle>
        <DialogContent>
          <Typography marginBottom={1}>
            Enter your work details in the following text fields:
          </Typography>
          <TextField
            fullWidth
            placeholder="Working hours"
            name="workingHours"
            value={values.workingHours}
            onChange={handleChange}
            margin={'dense'}
          />
          <TextField
            fullWidth
            placeholder="Work Description"
            name="description"
            value={values.description}
            onChange={handleChange}
            margin={'dense'}
          />
          <TextField
            fullWidth
            placeholder="Project"
            name="project"
            value={values.project}
            onChange={handleChange}
            margin={'dense'}
          />
          <TextField
            fullWidth
            placeholder="Tag"
            name="tag"
            value={values.tag}
            onChange={handleChange}
            margin={'dense'}
          />
          <TextField
            fullWidth
            placeholder="Date"
            name="date"
            value={values.date}
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
              props.addWork(values);
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
