import { ArrowForwardRounded, MailRounded, PhoneRounded } from "@mui/icons-material";
import { Avatar, Box, Container, CssBaseline, Divider, Grid, IconButton, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { ThemeProvider } from "styled-components";
import { theme } from "./../../Theme/LightTheme";
import HelpImg1 from "./../../Images/Help_1.svg";
import HelpImg2 from "./../../Images/Help_2.svg";
import HelpImg3 from "./../../Images/Help_3.svg";
import HelpImg4 from "./../../Images/Help_4.svg";
import HelpImg5 from "./../../Images/Help_5.svg";
import HelpImg6 from "./../../Images/Help_6.svg";
import HelpImg7 from "./../../Images/Help_7.svg";
import { useState } from "react";
import useAxios from "./../../utils/useAxios";
export default function CoordinatorsAdmin(props) {
    const helpImg = [
        HelpImg1,
        HelpImg2,
        HelpImg3,
        HelpImg4,
        HelpImg5,
        HelpImg6,
        HelpImg7,
    ]
    const [loading,setLoading] = useState(false)
    const api = useAxios()
    useEffect(() => {
        
    
      return () => {
        
      }
    }, [])
    
    return (<ThemeProvider theme={theme}>
        <CssBaseline />
        <Paper elevation={16} sx={{ padding: 2, marginTop: 3 }}>
            <Grid container padding={2}>
                <Grid item xs={12} sm={5}  >
                    <Container sx={{ display: "relative" }} elevation={0}>
                        <img src={helpImg[Math.floor(Math.random() * helpImg.length)]} width="100%" />
                    </Container>
                </Grid>
                <Grid item xs={12} sm={7}>
                    <Container sx={{ display: "relative" }}>
                        <Typography variant="h4" component="p">
                            Our Coordinators
                        </Typography>
                        <Stack>
                                <Grid container mt={3}>
                                    <Grid item xs={12} padding={2}>
                                        <Typography variant="h5">
                                            Coordinators
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} sx={{marginTop:{xs:2,sm:0},padding:{xs:0,sm:2}}}>
                                        <Paper elevation={4} sx={{ padding: 2 }}>
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
                                    <Grid item xs={12} sm={6} sx={{marginTop:{xs:2,sm:0},padding:{xs:0,sm:2}}}>
                                        <Paper elevation={4 } sx={{ padding: 2 }}>
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
                        </Stack>
                    </Container>
                </Grid>
            </Grid>
        </Paper>
    </ThemeProvider>)
}