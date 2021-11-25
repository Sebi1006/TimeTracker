import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';

export const AccountProfile = (props) => (
  <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={props.user.avatarUrl}
          sx={{
            height: 64,
            mb: 2,
            width: 64
          }}
        />
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h5"
        >
          {props.user.firstName + ' ' + props.user.lastName}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          Entrance Date: {props.user.entranceDate}
        </Typography>
      </Box>
    </CardContent>
    <Divider/>
    <CardActions>
      <Button
        color="primary"
        fullWidth
        variant="text"
      >
        Upload Picture
      </Button>
    </CardActions>
  </Card>
);
