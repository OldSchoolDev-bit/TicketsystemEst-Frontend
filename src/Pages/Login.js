import * as React from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography } from '@mui/material/';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import TypeWriter from 'typewriter-effect';
import Axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import useRefreshToken from '../hooks/useRefreshToken';
import './../Login.scss';

var sentences = ['Willkommen bei EST!', 'Welcome to EST!', 'Bienvenue à EST !', '¡Bienvenidos a EST!']
var i;

function Copyright(props) {
  return (
    <Typography variant="body2" color="grey" align="center" {...props}>
      {'© '}
      <Link color="inherit" href="https://www.elektronikschule.de/index.php/impressum">
        Elektronikschule Tettnang
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function SignInSide() {
  const refresh = useRefreshToken();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    var userName = data.get('username');
    var userPassword = data.get('password');


    Axios.post('/authentification/login', {
      username: userName,
      password: userPassword,
    }, {
      withCredentials: true
    }).then((res) => {
      const userID = res?.data.userId

      console.log(res.data.userId)
      const accessToken = res?.data.accessToken;
      console.log("Der Token heißt: " + accessToken);
      setAuth({ userName, accessToken, userID })
      localStorage.setItem("persist", true)
      navigate("/dashboard");
    }).catch(err => console.log(err.response));
  };
  return (

    <ThemeProvider theme={theme}>
      <HelmetProvider>
        <Helmet>
          <title>EST Onboarding | Login</title>
        </Helmet>
      </HelmetProvider>
      <Grid container component="main" sx={{ height: '100vh' }}>

        <CssBaseline />

        <Grid

          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://www.elektronikschule.de/images/personal/Kollegium_220912_DSC_0213_Web.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}

        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',

            }}

          >
            <div className='Typewriter'>
              <TypeWriter
                onInit={(typewriter) => {
                  for (i = 0; i < sentences.length; i++) {
                    typewriter.typeString(sentences[i])
                    typewriter.pause(2000)
                    typewriter.deleteAll()
                    typewriter.pause(500)
                    typewriter.start();

                  }
                  typewriter.typeString(sentences[0])
                  typewriter.start();
                }}
              />
            </div>
            <Avatar sx={{ m: 1, bgcolor: '#b2c842' }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5" >
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: '#b2c842' }}

              >
                Sign In
              </Button>
              <Button onClick={() => refresh()} fullWidth variant='contained' sx={{ mt: 3, mb: 2, backgroundColor: '#b2c842' }}>
                Refresh
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>

                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>

  )
}