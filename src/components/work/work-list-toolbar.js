import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  MenuItem
} from '@mui/material';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { projects } from '../../__mocks__/projects';
import { tags } from '../../__mocks__/tags';

export const WorkListToolbar = (props) => {
  const [dialog, setDialog] = useState(false);

  const [workDate, setWorkDate] = useState(new Date());

  const currentDate = new Date();

  const [values, setValues] = useState({
    id: '',
    date: currentDate.getDate()
      + '/'
      + (currentDate.getMonth() + 1)
      + '/'
      + currentDate.getFullYear(),
    workPackages: [],
    project: '',
    workingHours: '',
    description: '',
    tag: ''
  });

  const handleDate = (date) => {
    setWorkDate(date);

    setValues({
      ...values,
      date: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    });
  };

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

    setWorkDate(new Date());

    setValues({
      ...values,
      date: currentDate.getDate()
        + '/'
        + (currentDate.getMonth() + 1)
        + '/'
        + currentDate.getFullYear(),
      workPackages: [],
      project: '',
      workingHours: '',
      description: '',
      tag: ''
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
          <Box sx={{ marginTop: 2, marginBottom: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={workDate}
                onChange={handleDate}
                renderInput={(params) => <TextField {...params} />}
                mask="__/__/____"
                inputFormat="dd/MM/yyyy"
                toolbarFormat="dd/MM/yyyy"
              />
            </LocalizationProvider>
          </Box>
          <Card style={{ backgroundColor: '#F8F8F8' }}>
            <CardContent>
              <TextField
                fullWidth
                label="Project"
                name="project"
                select
                value={values.project}
                onChange={handleChange}
                margin={'dense'}
              >
                {projects.map((current) => (
                  <MenuItem key={current.id} value={current.title}>
                    {current.title}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                label="Working Hours"
                name="workingHours"
                type="number"
                value={values.workingHours}
                onChange={handleChange}
                margin={'dense'}
              />
              <TextField
                fullWidth
                label="Work Description"
                name="description"
                value={values.description}
                onChange={handleChange}
                margin={'dense'}
              />
              <TextField
                fullWidth
                label="Tag"
                name="tag"
                select
                value={values.tag}
                onChange={handleChange}
                margin={'dense'}
              >
                {tags.map((current) => (
                  <MenuItem key={current.id} value={current.name}>
                    {current.name}
                  </MenuItem>
                ))}
              </TextField>
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>
            Cancel
          </Button>
          <Button
            onClick={function () {
              props.addWork({
                id: values.id,
                date: values.date,
                workPackages: [
                  {
                    project: values.project,
                    workingHours: Number(values.workingHours),
                    tag: values.tag,
                    description: values.description
                  }
                ]
              });
              closeDialog();
            }}
            autoFocus
            disabled={values.date === ''}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
