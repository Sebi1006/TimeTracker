import Head from 'next/head';
import { Box, Container, Typography, Grid, Pagination } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { projects } from '../__mocks__/projects';
import { tags } from '../__mocks__/tags';
import { works } from '../__mocks__/works';
import { useState } from 'react';
import { TagListToolbar } from '../components/tag/tag-list-toolbar';
import { TagChip } from '../components/tag/tag-chip';
import { WorkListToolbar } from '../components/work/work-list-toolbar';
import { WorkCard } from '../components/work/work-card';

const TimeTracking = () => {
  const MAX_WORK_ENTRIES_PER_PAGE = 9;
  const [page, setPage] = useState(1);
  const [work, setWork] = useState(works);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const addWork = (data) => {
      setWork(project => [...work, data]);
    };

  return(
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
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            spacing={3}
          >
            {work
              .slice((page - 1) * MAX_WORK_ENTRIES_PER_PAGE,
                (page - 1) * MAX_WORK_ENTRIES_PER_PAGE + MAX_WORK_ENTRIES_PER_PAGE)
              .map((work) => (
                <Grid
                  item
                  key={work.id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <WorkCard work={work}/>
                </Grid>
              ))}
          </Grid>
        </Box>
         {
           !(work.length <= MAX_WORK_ENTRIES_PER_PAGE) &&
           <Box
             sx={{
                display: 'flex',
                justifyContent: 'center',
                pt: 3
                }}
              >
              <Pagination
                color="primary"
                size="small"
                count={Math.ceil(work.length / MAX_WORK_ENTRIES_PER_PAGE)}
                page={page}
                onChange={handleChange}
                />
              </Box>
             }
        </Container>
      </Box>
    </>
  )
};

TimeTracking.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default TimeTracking;
