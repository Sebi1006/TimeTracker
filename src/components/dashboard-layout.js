import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/config';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280
  }
}));

export const DashboardLayout = (props) => {
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(true);
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
        <DashboardLayoutRoot>
          <Box
            sx={{
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
              width: '100%'
            }}
          >
            {children}
          </Box>
        </DashboardLayoutRoot>
        <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)}/>
        <DashboardSidebar
          onClose={() => setSidebarOpen(false)}
          open={isSidebarOpen}
        />
      </>
    );
  } else {
    return (
      <>
      </>
    );
  }
};
