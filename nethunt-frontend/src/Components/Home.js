import { ArrowForwardRounded, PlayCircleFilledRounded, QuizRounded } from "@mui/icons-material";
import { Avatar, Container, CssBaseline, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { ThemeProvider } from "styled-components";
import { theme } from "./../Theme/LightTheme";
import DashboardImg from "./../Images/Dashboard.svg";
import CircularProgressWithLabel from "./CircluarProgressWithLabel";
export default function Home(props) {

    return (<ThemeProvider theme={theme}>
        <CssBaseline />
        <Paper elevation={16} sx={{ padding: 2 }}>
            <Grid container>
                <Grid item xs={12} md={3}>
                    <Container sx={{ display: "relative" }} elevation={0}>
                        <img src={DashboardImg} width="100%" />
                    </Container>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Stack sx={{ display: "relative" }}>
                        <Typography variant="h5" component="p">
                            Welcome YOUR NAME,
                        </Typography>
                        <Typography variant="subtitle1" component="p">
                            Let's the HUNT begin
                        </Typography>
                        <Typography variant="h4" component="p" align="center" mt={3}>
                            ENDS IN
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>
        </Paper>
        <Grid container sx={{ marginTop: 3 }}  >
            <Grid item xs={12} sm={6} p={2}>
                <Paper sx={{ padding: 2 }}>
                    <Toolbar>
                        <Typography flexGrow={1}>Quiz</Typography>
                        {/* <IconButton>
                            <ArrowForwardRounded />
                        </IconButton> */}
                    </Toolbar>
                    <List>
                        <ListItemButton>
                            <ListItemIcon>
                                <CircularProgressWithLabel value={30} />
                            </ListItemIcon>
                            <ListItemText>Sample</ListItemText>
                            <IconButton>
                                <PlayCircleFilledRounded />
                            </IconButton>
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <CircularProgressWithLabel value={45} />
                            </ListItemIcon>
                            <ListItemText>Final</ListItemText>
                            <IconButton>
                                <PlayCircleFilledRounded />
                            </IconButton>
                        </ListItemButton>
                    </List>
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
                    <List>
                        <ListItemButton>
                            <ListItemIcon>
                                <Avatar>
                                    1st
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText  primary={"Tommy"}  secondary={"CIT"}/>
                            <Typography>
                                1235
                            </Typography>
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <Avatar>
                                    2nd
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText primary={"Bobby"}  secondary={"CIT"}/>
                            <Typography>
                                1019
                            </Typography>
                        </ListItemButton>
                        <ListItemButton selected={true}>
                            <ListItemIcon>
                                <Avatar>
                                    5th
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText primary={"Bobby"}  secondary={"CIT"}/>
                            <Typography>
                                1000
                            </Typography>
                        </ListItemButton>
                    </List>
                </Paper>
            </Grid>
        </Grid>
    </ThemeProvider>)
}