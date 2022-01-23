import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { WorkProjectCard } from './work-project-card';

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
    numberOfCards: 1
  });

  const handleDate = (date) => {
    setWorkDate(date);

    setValues({
      ...values,
      date: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    });
  };

  const addWorkPackage = (data) => {
    setValues({
      ...values,
      workPackages: [...values.workPackages, data],
      id: uuid()
    });
  };

  const addCard = () => {
    setValues({
      ...values,
      numberOfCards: values.numberOfCards + 1
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
      id: '',
      date: currentDate.getDate()
        + '/'
        + (currentDate.getMonth() + 1)
        + '/'
        + currentDate.getFullYear(),
      workPackages: [],
      numberOfCards: 1
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
                maxDate={new Date()}
              />
            </LocalizationProvider>
          </Box>
          {Array(values.numberOfCards).fill(<WorkProjectCard addWorkPackage={addWorkPackage}/>)}
          <Box sx={{ marginTop: 2, marginLeft: 1 }}>
            <Fab
              color="primary"
              size="small"
              onClick={addCard}
            >
              <AddIcon/>
            </Fab>
          </Box>
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
                workPackages: values.workPackages
              });
              closeDialog();
            }}
            autoFocus
            disabled={values.workPackages.length === 0}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
