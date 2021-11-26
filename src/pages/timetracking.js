import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { WorkListResults } from '../components/work/work-list-results';
import { WorkListToolbar } from '../components/work/work-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { works } from '../__mocks__/works';
import { useState } from 'react';

const TimeTracking = () => {
  const [work, setWork] = useState(works);

  const addWork = (data) => {
    setWork(work => [...work, data]);
  };

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
};

TimeTracking.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default TimeTracking;
