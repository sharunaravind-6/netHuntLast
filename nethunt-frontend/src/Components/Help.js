import { ArrowForwardRounded, MailRounded, PhoneRounded } from "@mui/icons-material";
import { Avatar, Box, Container, CssBaseline, Divider, Grid, IconButton, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { ThemeProvider } from "styled-components";
import { theme } from "./../Theme/LightTheme";
import HelpImg from "./../Images/Help.svg";
export default function Help(props) {

    return (<ThemeProvider theme={theme}>
        <CssBaseline />
        <Paper elevation={16} sx={{ padding: 2, marginTop: 3 }}>
            <Grid container padding={2}>
                <Grid item xs={12} sm={5}  >
                    <Container sx={{ display: "relative" }} elevation={0}>
                        <img src={HelpImg} width="100%" />
                    </Container>
                </Grid>
                <Grid item xs={12} sm={7}>
                    <Container sx={{ display: "relative" }}>
                        <Typography variant="h4" component="p">
                            Contact us,
                        </Typography>
                        <Typography variant="subtitle1" component="p">
                            Our Team is here to help you
                        </Typography>
                        <Stack>
                            <Typography variant="h6" align="center" mt={3}>
                                <Container sx={{ display: "flex", alignItems: "center", gap: 2, fontSize: { xs: "17px", sm: "20px" } }}><MailRounded />
                                    nethuntlogin2k22@gmail.com
                                </Container>
                            </Typography>
                            <Typography variant="h6" align="center" mt={3}>
                                <Container sx={{ display: "flex", alignItems: "center", gap: 2 }}><PhoneRounded />
                                    +91 9677427924
                                </Container>
                            </Typography>
                        </Stack>
                    </Container>
                </Grid>
            </Grid>
        </Paper>
        <Paper>
            <Grid container mt={3} padding={3}>
                <Grid item xs={12} padding={2}>
                    <Typography variant="h5">
                        Coordinators
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} padding={2}>
                    <Paper elevation={10} sx={{ padding: 2 }}>
                        <Stack sx={{ display: "flex", alignItems: "center", }}>
                            <Avatar sx={{ width: { xs: "100px", sm: "200px" }, height: { xs: "100px", sm: "200px" } }} />
                            <Typography>
                                COORDINATOR NAME
                            </Typography>
                            <Divider />
                            <Box mt={2}>
                                <Stack>
                                    <Typography variant="h6" align="center" mt={3}>
                                        <Container sx={{ display: "flex", alignItems: "center", gap: 2, fontSize: { xs: "15px", sm: "20px" } }}><MailRounded />
                                            nethuntlogin2k22@gmail.com
                                        </Container>
                                    </Typography>
                                    <Typography variant="h6" align="center" mt={3}>
                                        <Container sx={{ display: "flex", alignItems: "center", gap: 2 }}><PhoneRounded />
                                            +91 9677427924
                                        </Container>
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} padding={2}>
                    <Paper elevation={10} sx={{ padding: 2 }}>
                        <Stack sx={{ display: "flex", alignItems: "center", }}>
                            <Avatar sx={{ width: { xs: "100px", sm: "200px" }, height: { xs: "100px", sm: "200px" } }} />
                            <Typography>
                                COORDINATOR NAME
                            </Typography>
                            <Divider />
                            <Box mt={2}>
                                <Stack>
                                    <Typography variant="h6" align="center" mt={3}>
                                        <Container sx={{ display: "flex", alignItems: "center", gap: 2, fontSize: { xs: "15px", sm: "20px" } }}><MailRounded />
                                            nethuntlogin2k22@gmail.com
                                        </Container>
                                    </Typography>
                                    <Typography variant="h6" align="center" mt={3}>
                                        <Container sx={{ display: "flex", alignItems: "center", gap: 2 }}><PhoneRounded />
                                            +91 9677427924
                                        </Container>
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    </ThemeProvider>)
}