import PropTypes from 'prop-types';
import { Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { Clock as ClockIcon } from '../../icons/clock';
import { User as UserIcon } from '../../icons/user';

export const WorkCard = ({ work, ...rest }) => (
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
        {work.workingHours}
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        variant="body1"
      >
        {work.description}
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        variant="body1"
      >
        {work.project}
      </Typography>
      <Typography
         align="center"
         color="textPrimary"
         variant="body1"
      >
         {work.tag}
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
            Created on {work.date}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Card>
);

WorkCard.propTypes = {
  work: PropTypes.object.isRequired
};
