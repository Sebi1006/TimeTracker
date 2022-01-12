import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { UserListResults } from '../components/user/user-list-results';
import { UserListToolbar } from '../components/user/user-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { users } from '../__mocks__/users';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { addUserRequest, getUsers, useAuth } from '../utils/config';

const Users = () => {
  const [user, setUser] = useState([]);
  const [subModel, setSubModel] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const addUser = (data) => {
    setUser(user => [...user, data]);

    if (subModel !== 'free') {
      addUserRequest(data.firstName,
        data.lastName,
        data.email,
        data.phone,
        data.tempPassword,
        subModel,
        data.entranceDate);
    }
  };

  useEffect(() => {
    const loggedIn = useAuth();
    setIsLoggedIn(loggedIn);

    if (!loggedIn) {
      router.push('/login');
    }

    if (JSON.parse(localStorage.getItem('USER_INFORMATION')).subModel === 'free') {
      setUser(users);
      setSubModel('free');
    } else {
      getUsers().then(response => {
        if (response.length !== 0) {
          let userList = [];

          for (let i = 0; i < response.length; i++) {
            let userId = '';
            let firstName = '';
            let lastName = '';
            let email = '';
            let phone = '';
            let entranceDate = '';
            let avatarUrl = '';

            for (let j = 0; j < response[i].attributes.length; j++) {
              if (response[i].attributes[j].name === 'sub') {
                userId = response[i].attributes[j].value;
              } else if (response[i].attributes[j].name === 'custom:first_name') {
                firstName = response[i].attributes[j].value;
              } else if (response[i].attributes[j].name === 'custom:last_name') {
                lastName = response[i].attributes[j].value;
              } else if (response[i].attributes[j].name === 'email') {
                email = response[i].attributes[j].value;
              } else if (response[i].attributes[j].name === 'custom:phone') {
                phone = response[i].attributes[j].value;
              } else if (response[i].attributes[j].name === 'custom:entrance_date') {
                entranceDate = response[i].attributes[j].value;
              } else if (response[i].attributes[j].name === 'custom:avatar_url') {
                avatarUrl = response[i].attributes[j].value;
              }
            }

            userList.push({
              userId: userId,
              firstName: firstName,
              lastName: lastName,
              email: email,
              phone: phone,
              entranceDate: entranceDate,
              avatarUrl: avatarUrl
            });
          }

          setUser(userList);
        }
      });

      if (JSON.parse(localStorage.getItem('USER_INFORMATION')).subModel === 'premium') {
        setSubModel('premium');
      }

      if (JSON.parse(localStorage.getItem('USER_INFORMATION')).subModel === 'enterprise') {
        setSubModel('enterprise');
      }
    }
  }, [router]);

  if (isLoggedIn) {
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
            <UserListToolbar addUser={addUser} subModel={subModel}/>
            <Box sx={{ mt: 3 }}>
              <UserListResults users={user}/>
            </Box>
          </Container>
        </Box>
      </>
    );
  } else {
    return (
      <>
      </>
    );
  }
};

Users.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Users;
