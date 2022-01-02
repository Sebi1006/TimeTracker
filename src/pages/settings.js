import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { SettingsAPIToken } from '../components/settings/settings-apitoken';
import { SettingsPassword } from '../components/settings/settings-password';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/config';
import { useEffect, useState } from 'react';

const Settings = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

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
            Settings | Time Tracker
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
              Settings
            </Typography>
            <SettingsAPIToken/>
            <Box sx={{ pt: 3 }}>
              <SettingsPassword/>
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

Settings.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Settings;
