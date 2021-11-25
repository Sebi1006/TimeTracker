import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { UserListResults } from '../components/user/user-list-results';
import { UserListToolbar } from '../components/user/user-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { users } from '../__mocks__/users';
import { useState } from 'react';

const Users = () => {
  const [user, setUser] = useState(users);

  const addUser = (data) => {
    setUser(user => [...user, data]);
  };

  return (
    <>
      <Head>
        <title>
          Users | Time Tracker
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <UserListToolbar addUser={addUser}/>
          <Box sx={{ mt: 3 }}>
            <UserListResults users={user}/>
          </Box>
        </Container>
      </Box>
    </>
  );
};

Users.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Users;
