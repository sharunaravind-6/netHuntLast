import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./../Theme/LightTheme";
import { AppBar, Container, Grid, Toolbar } from '@mui/material';
import Sample404_1 from "./../Images/404_Sample1.svg";
import Sample404_2 from "./../Images/404_Sample2.svg";
import Sample404_3 from "./../Images/404_Sample3.svg";
import Sample404_4 from "./../Images/404_Sample4.svg";
import Sample404_5 from "./../Images/404_Sample5.svg";
export default function Page404() {
    const Sample404Images = [Sample404_1, Sample404_2, Sample404_3, Sample404_4, Sample404_5]
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
                        <Typography variant="h5" component="p" sx={{ marginLeft: 5 }} flexGrow={1}>
                            N E T H U N T
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Container sx={{ position: "absolute", top: "50%", transform: "translateY(-50%)", }} maxWidth="false">
                <Grid container>
                    <Grid item sm={1} md={2} lg={4}/>
                    <Grid item sm={10} md={8} lg={4}>
                        <Box sx={{ position: "relative" }}>
                            <img src={Sample404Images[Math.floor(Math.random() * Sample404Images.length)]} width="100%" />
                        </Box>
                    </Grid>
                    <Grid item sm={1} md={2} lg={4}/>
                </Grid>

            </Container>
        </ThemeProvider>
    )
}