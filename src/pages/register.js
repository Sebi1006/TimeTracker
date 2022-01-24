import Head from 'next/head';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import NextLink from 'next/link';

const Register = () => {
  return (
    <>
      <Head>
        <title>
          Register | Time Tracker
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
            align="center"
          >
            Select Your Subscription Plan
          </Typography>
          <Grid
            container
            spacing={3}
            sx={{ marginTop: 3 }}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{ marginBottom: 2 }}
                    >
                      Free
                    </Typography>
                    <Typography
                      variant="h4"
                    >
                      0€
                    </Typography>
                    <Typography
                      variant="h6"
                      color="gray"
                    >
                      per month
                    </Typography>
                  </Box>
                  <Divider sx={{ marginBottom: 2, marginTop: 2 }}/>
                  <Grid container direction="row" alignItems="center" sx={{ marginLeft: 2 }}>
                    <Grid item sx={{ marginRight: 1 }}>
                      <CheckIcon/>
                    </Grid>
                    <Grid item>
                      <Typography>
                        For 1 user only
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container direction="row" alignItems="center" sx={{ marginLeft: 2 }}>
                    <Grid item sx={{ marginRight: 1 }}>
                      <CheckIcon/>
                    </Grid>
                    <Grid item>
                      <Typography>
                        Basic time-tracking function
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container direction="row" alignItems="center" sx={{ marginLeft: 2 }}>
                    <Grid item sx={{ marginRight: 1 }}>
                      <CheckIcon/>
                    </Grid>
                    <Grid item>
                      <Typography>
                        Sample projects & tags
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container direction="row" alignItems="center" sx={{ marginLeft: 2 }}>
                    <Grid item sx={{ marginRight: 1 }}>
                      <CheckIcon/>
                    </Grid>
                    <Grid item>
                      <Typography>
                        Sample company logo
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container direction="row" alignItems="center" sx={{ marginLeft: 2 }}>
                    <Grid item sx={{ marginRight: 1 }}>
                      <CheckIcon/>
                    </Grid>
                    <Grid item>
                      <Typography>
                        Sample user list
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider sx={{ marginBottom: 3, marginTop: 2 }}/>
                  <NextLink href={'/register-free'} passHref>
                    <Button
                      color="primary"
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Select Free Plan
                    </Button>
                  </NextLink>
                </CardContent>
              </Card>
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{ marginBottom: 2 }}
                    >
                      Premium
                    </Typography>
                    <Typography
                      variant="h4"
                    >
                      50€
                    </Typography>
                    <Typography
                      variant="h6"
                      color="gray"
                    >
                      per month
                    </Typography>
                  </Box>
                  <Divider sx={{ marginBottom: 2, marginTop: 2 }}/>
                  <Grid container direction="row" alignItems="center" sx={{ marginLeft: 2 }}>
                    <Grid item sx={{ marginRight: 1 }}>
                      <CheckIcon/>
                    </Grid>
                    <Grid item>
                      <Typography>
                        Up to 100 users
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container direction="row" alignItems="center" sx={{ marginLeft: 2 }}>
                    <Grid item sx={{ marginRight: 1 }}>
                      <CheckIcon/>
                    </Grid>
                    <Grid item>
                      <Typography>
                        Full time-tracking function
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container direction="row" alignItems="center" sx={{ marginLeft: 2 }}>
                    <Grid item sx={{ marginRight: 1 }}>
                      <CheckIcon/>
                    </Grid>
                    <Grid item>
                      <Typography>
                        Individual projects & tags
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container direction="row" alignItems="center" sx={{ marginLeft: 2 }}>
                    <Grid item sx={{ marginRight: 1 }}>
                      <CheckIcon/>
                    </Grid>
                    <Grid item>
                      <Typography>
                        Profile pictures
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container direction="row" alignItems="center" sx={{ marginLeft: 2 }}>
                    <Grid item sx={{ marginRight: 1 }}>
                      <CheckIcon/>
                    </Grid>
                    <Grid item>
                      <Typography>
                        Work time analysis
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider sx={{ marginBottom: 3, marginTop: 2 }}/>
                  <NextLink href={'/register-premium'} passHref>
                    <Button
                      color="primary"
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Select Premium Plan
                    </Button>
                  </NextLink>
                </CardContent>
              </Card>
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{ marginBottom: 2 }}
                    >
                      Enterprise
                    </Typography>
                    <Typography
                      variant="h4"
                    >
                      Individual price
                    </Typography>
                    <Typography
                      variant="h6"
                      color="gray"
                    >
                      per month
                    </Typography>
                  </Box>
                  <Divider sx={{ marginBottom: 2, marginTop: 2 }}/>
                  <Grid container direction="row" alignItems="center" sx={{ marginLeft: 2 }}>
                    <Grid item sx={{ marginRight: 1 }}>
                      <CheckIcon/>
                    </Grid>
                    <Grid item>
                      <Typography>
                        Number of users depending on organization size
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container direction="row" alignItems="center" sx={{ marginLeft: 2 }}>
                    <Grid item sx={{ marginRight: 1 }}>
                      <CheckIcon/>
                    </Grid>
                    <Grid item>
                      <Typography>
                        Full time-tracking function
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container direction="row" alignItems="center" sx={{ marginLeft: 2 }}>
                    <Grid item sx={{ marginRight: 1 }}>
                      <CheckIcon/>
                    </Grid>
                    <Grid item>
                      <Typography>
                        Individual projects & tags
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container direction="row" alignItems="center" sx={{ marginLeft: 2 }}>
                    <Grid item sx={{ marginRight: 1 }}>
                      <CheckIcon/>
                    </Grid>
                    <Grid item>
                      <Typography>
                        Profile pictures
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container direction="row" alignItems="center" sx={{ marginLeft: 2 }}>
                    <Grid item sx={{ marginRight: 1 }}>
                      <CheckIcon/>
                    </Grid>
                    <Grid item>
                      <Typography>
                        Work time & project analysis
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider sx={{ marginBottom: 3, marginTop: 2 }}/>
                  <NextLink href={'/register-enterprise'} passHref>
                    <Button
                      color="primary"
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Select Enterprise Plan
                    </Button>
                  </NextLink>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Register;
