import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';

const TimeTracking = () => (
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
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Track Time
        </Typography>
      </Container>
    </Box>
  </>
);

TimeTracking.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default TimeTracking;
