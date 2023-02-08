import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { theme } from "./../Theme/LightTheme";
import { SchoolOutlined, SchoolRounded } from '@mui/icons-material';
import { userContext } from '../Store/user';
import { serverHost } from '../utils/server';
import { Backdrop, CircularProgress } from '@mui/material';
import useAxios from '../utils/useAxios';
export default function AddCollege() {
  const { token } = React.useContext(userContext)
  const [loading, setLoading] = React.useState(false)
  const api = useAxios()
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataX = {
      collegeName: data.get('collegeName'),
      collegeCity: data.get('collegeCity'),
    };
    setLoading(true)

    const response = await api.post("/user/add_college", {
      ...dataX
    })
    const feedback = await response.json();
    setLoading(false)
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main">
        <CssBaseline />
        <Grid
          item
          sm={2}
          md={3}
        />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ bgcolor: 'secondary.main' }}>
              <SchoolOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add College
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="collegeName"
                label="College Name"
                name="collegeName"
                autoComplete="collegeName"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="collegeCity"
                label="City"
                id="collegeCity"
                autoComplete="collegeCity"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
    </ThemeProvider>
  );
}