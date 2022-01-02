import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { WorkListResults } from '../components/work/work-list-results';
import { WorkListToolbar } from '../components/work/work-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { works } from '../__mocks__/works';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/config';

const TimeTracking = () => {
  const [work, setWork] = useState(works);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const addWork = (data) => {
    setWork(work => [...work, data]);
  };

  useEffect(() => {
    const loggedIn = useAuth();
    setIsLoggedIn(loggedIn);

    if (!loggedIn) {
      router.push('/login');
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
