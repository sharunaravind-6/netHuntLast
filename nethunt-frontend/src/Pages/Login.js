import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./../Theme/LightTheme";
import jwt_decode from "jwt-decode";
import { userContext } from '../Store/user';
import { AppBar, Backdrop, CircularProgress, Paper, Toolbar } from '@mui/material';
import { serverHost } from '../utils/server';
import { useNavigate } from 'react-router-dom';


export default function SignUp() {
  const { setTokenReuse, logout, token } = React.useContext(userContext)
  const [openBackdrop, setOpenBackdrop] = React.useState(false)
  const navigate = useNavigate()
  const [error, setError] = useState('');
  const [loading, setLoading] = React.useState(true)
  const formElement = document.querySelector('form');
  React.useEffect(() => {
    if (loading) {
      if (token != null) {
        if (jwt_decode(token.access).role === "Admin") {
          navigate("/a/dashboard")
        } else if (jwt_decode(token.access).role === "Candidate") {
          navigate("/s/dashboard")
        } else if (jwt_decode(token.access).role === "Coordinator") {
          navigate("/c/dashboard")
        }
      }
    }
    setLoading(false)
  }, [loading])


  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
    let response = await fetch(serverHost + "/user/auth/token", {
      method: "POST",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body)
    })
    if (response.status === 200) {
      let data = await response.json()
      setTokenReuse(data)
      if (jwt_decode(data.access).role === "Admin") {
        navigate("/a/dashboard")
      } else if (jwt_decode(data.access).role === "Candidate") {
        navigate("/s/dashboard")
      } else if (jwt_decode(data.access).role === "Coordinator") {
        navigate("/c/dashboard")
      }
      return { token: data, data: jwt_decode(data.access) }
    } else {
      setError("Invalid Credentials")
      formElement.reset();
    }


  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Box sx={{ display: "flex", width: "100%", alignItems: "center",cursor: "pointer" }}>
              <Typography variant="h5" component="p" sx={{ marginLeft: 5 }} flexGrow={1}>
                N E T H U N T
              </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container component="main" maxWidth="xs">
        <Paper sx={{ padding: 3, marginTop: 15 }}>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            {error &&
              <Typography variant="h6" style={{color:"red"}}>
                {error}
              </Typography>
            }
            <Box component="form" noValidate onSubmit={async (event) => {
              setOpenBackdrop(true);
              await handleSubmit(event);
              setOpenBackdrop(false)
            }} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  {/* <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="Remember me"
                  /> */}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              {/* <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Forgot Password ?
                  </Link>
                </Grid>
              </Grid> */}
            </Box>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}