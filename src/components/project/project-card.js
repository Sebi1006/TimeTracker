import PropTypes from 'prop-types';
import { Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { Clock as ClockIcon } from '../../icons/clock';
import { User as UserIcon } from '../../icons/user';

export const ProjectCard = ({ project, ...rest }) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    {...rest}
  >
    <CardContent>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h5"
      >
        {project.title}
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        variant="body1"
      >
        {project.description}
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }}/>
    <Divider/>
    <Box sx={{ p: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <ClockIcon color="action"/>
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            Created on {project.createdAt}
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <UserIcon color="action"/>
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            {project.members.length} members
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Card>
);

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired
};
