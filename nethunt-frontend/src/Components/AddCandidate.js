import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {  ThemeProvider } from '@mui/material/styles';
import { theme } from "../Theme/LightTheme";
import { SchoolOutlined } from '@mui/icons-material';
import {  FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { AdminContext } from '../Store/adminStore';

export default function AddCandidate() {
  const [college, setCollege] = React.useState('');
  const {colleges,fetchCollege} = React.useContext(AdminContext)
  const [loading,setLoading] = React.useState(true)

  React.useEffect(
    ()=>{
      if(loading)
        fetchCollege()
      setLoading(false)
    },
  [loading])
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      cname: data.get('cname'),
      ccity: data.get('ccity'),
    });
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
                type="cpassword"
                label="Confirm Password"
                id="cpassword"
                autoComplete="password"
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">College</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={college}
                  label="Age"
                  onChange={(event)=>{setCollege(event.target.value);}}
                >
                  {
                    colleges.map((item)=>{
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