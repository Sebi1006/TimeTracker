import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { WorkListResults } from '../components/work/work-list-results';
import { WorkListToolbar } from '../components/work/work-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { works } from '../__mocks__/works';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  addWorkRequest,
  getUserWorks,
  addUpdateUserWorkRequest,
  useAuth,
  dateSort
} from '../utils/config';

const TimeTracking = () => {
  const [work, setWork] = useState([]);
  const [subModel, setSubModel] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const addWork = (data) => {
    if (subModel === 'free') {
      setWork(work => [...work, data].sort(dateSort));
    } else {
      addWorkRequest(data.date, data.workPackages)
        .then(() => {
          addUpdateUserWorkRequest(JSON.parse(localStorage.getItem('USER_INFORMATION')).userId,
            [...work, data]);
        })
        .then(() => setWork(work => [...work, data].sort(dateSort)));
    }
  };

  useEffect(() => {
    const loggedIn = useAuth();
    setIsLoggedIn(loggedIn);

    if (!loggedIn) {
      router.push('/login');
    }

    if (JSON.parse(localStorage.getItem('USER_INFORMATION')).subModel === 'free') {
      setWork(works.sort(dateSort));
      setSubModel('free');
    } else {
      getUserWorks(JSON.parse(localStorage.getItem('USER_INFORMATION')).userId)
        .then(response => setWork(response.works.sort(dateSort)));
      setSubModel('premium-enterprise');
    }
  }, [router]);

  if (isLoggedIn) {
    return (
      <>
        <Head>
          <title>
            Track Time | Time Tracker
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
            <WorkListToolbar addWork={addWork}/>
            <Box sx={{ mt: 3 }}>
              <WorkListResults work={work}/>
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

TimeTracking.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default TimeTracking;
