import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Checkbox
} from '@mui/material';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

export const ProjectListToolbar = (props) => {
  const [dialog, setDialog] = useState(false);

  const [user, setUser] = useState([]);

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
    members: []
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
      id: uuid()
    });
  };

  const updateMembers = () => {
    let users = [];
    user.map((current) => users.push(current.userId));
    setValues({
      ...values,
      members: users
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
      title: '',
      description: '',
      members: []
    });

    setUser([]);
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
            label="Project Title"
            name="title"
            value={values.title}
            onChange={handleChange}
            margin={'dense'}
          />
          <TextField
            fullWidth
            label="Project Description"
            name="description"
            value={values.description}
            onChange={handleChange}
            margin={'dense'}
          />
          <TextField
            fullWidth
            label="Add members"
            select
            value={user}
            onClick={updateMembers}
            margin={'dense'}
            SelectProps={{
              multiple: true,
              renderValue: selected => selected.map(x => user.find((element) => {
                  return element.userId === x.userId;
                })
                && user.find((element) => {return element.userId === x.userId;}).firstName.charAt(0)
                + '. '
                + user.find((element) => {return element.userId === x.userId;}).lastName).join(', ')
            }}
          >
            {props.users.map((current) => (
              <MenuItem key={current.userId} value={current.userId}>
                <Checkbox
                  checked={user.includes(current)}
                  onChange={() => {
                    if (user.includes(current)) {
                      setUser(user.filter(item => item !== current));
                    } else {
                      setUser(user => [...user, current]);
                    }
                  }}
                />
                {current.firstName + ' ' + current.lastName}
              </MenuItem>
            ))}
          </TextField>
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
