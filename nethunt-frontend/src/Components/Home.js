import { ArrowForwardRounded } from "@mui/icons-material";
import { Container, CssBaseline, Grid, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import { ThemeProvider } from "styled-components";
import { theme } from "./../Theme/LightTheme";
import DashboardImg from "./../Images/Dashboard.svg";
export default function Home(props) {

    return (<ThemeProvider theme={theme}>
        <CssBaseline />
        <Paper elevation={16} sx={{ padding: 2 }}>
            <Grid container>
                <Grid item xs={4} sm={2} md={1}>
                    <Container sx={{ display: "relative" }} elevation={0}>
                        <img src={DashboardImg} width="100%" />
                    </Container>
                </Grid>
                <Grid item xs={8} sm={10} md={11}>
                    <Container sx={{ display: "relative" }}>
                        <Typography variant="h5" component="p">
                            Welcome YOUR NAME,
                        </Typography>
                        <Typography variant="subtitle1" component="p">
                            Let's the HUNT begin
                        </Typography>
                        <Typography variant="h4" component="p" align="center" mt={3}>
                            ENDS IN
                        </Typography>
                    </Container>
                </Grid>
            </Grid>
        </Paper>
        <Grid container sx={{ marginTop: 3 }}  >
            <Grid item xs={12} sm={6} p={2}>
                <Paper sx={{ padding: 2 }}>
                    <Toolbar>
                        <Typography flexGrow={1}>Quiz</Typography>
                        <IconButton>
                            <ArrowForwardRounded />
                        </IconButton>
                    </Toolbar>
                </Paper>


            </Grid>
            <Grid item xs={12} sm={6} p={2}>
                <Paper sx={{ padding: 2 }}>
                    <Toolbar>
                        <Typography flexGrow={1}>Leaderboard</Typography>
                        <IconButton>
                            <ArrowForwardRounded />
                        </IconButton>
                    </Toolbar>
                </Paper>
            </Grid>
        </Grid>
    </ThemeProvider>)
}