import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../Theme/LightTheme";
import { SchoolOutlined } from '@mui/icons-material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { AdminContext } from '../Store/adminStore';
import useAxios from '../utils/useAxios';

export default function AddCandidate() {
  const [college, setCollege] = React.useState('');
  const { colleges, fetchCollege } = React.useContext(AdminContext)
  const [loading, setLoading] = React.useState(true)
  const api = useAxios()
  React.useEffect(
    () => {
      if (colleges===null)
        fetchCollege()
      setLoading(false)
    },
    [loading])
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body ={
      email: data.get('email'),
      password: data.get('password'),
      first_name: data.get('first_name'),
      last_name: data.get('last_name'),
      phone: data.get('phone'),
      college:colleges.filter(item=>item.collegeName === college)[0].id
    };
    const response = await api.post("/user/add_candidate",{
      ...body
    })
    console.log(response.data)
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
              Add Candidate
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="first_name"
                label="First Name"
                id="first_name"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="last_name"
                label="Last Name"
                id="last_name"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                type="password"
                label="Password"
                id="password"
                autoComplete="password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="cpassword"
                type="password"
                label="Confirm Password"
                id="cpassword"
                autoComplete="password"
              />
               <TextField
                margin="normal"
                required
                fullWidth
                name="phone"
                type="number"
                label="Phone"
                id="phone"
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">College</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={college}
                  label="Age"
                  onChange={(event) => { setCollege(event.target.value); }}
                >
                  {
                    colleges.map((item) => {
                      return (
                        <MenuItem value={item.collegeName} key={item.id}>{item.collegeName}</MenuItem>
                      )
                    })
                  }
                </Select>
              </FormControl>
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
    </ThemeProvider>
  );
}