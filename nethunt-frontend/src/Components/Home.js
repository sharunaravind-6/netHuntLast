import { ArrowForwardRounded, PlayCircleFilledRounded, } from "@mui/icons-material";
import { Avatar, CircularProgress, Container, CssBaseline, Grid, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { ThemeProvider } from "styled-components";
import { theme } from "./../Theme/LightTheme";
import Dashboard1Img from "./../Images/Dashboard_1.svg";
import Dashboard2Img from "./../Images/Dashboard_2.svg";
import Dashboard3Img from "./../Images/Dashboard_3.svg";
import Dashboard4Img from "./../Images/Dashboard_4.svg";
import Dashboard5Img from "./../Images/Dashboard_5.svg";
import Dashboard6Img from "./../Images/Dashboard_6.svg";
import useAxios from "../utils/useAxios";
import CircularProgressWithLabel from "./CircluarProgressWithLabel";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../Store/user";
import Timer from "./Parts/Timer";
import axios from "axios";
import { serverHost } from "../utils/server";
import { useNavigate } from "react-router-dom";
export default function Home(props) {
    const dashboardImg = [
        Dashboard1Img,
        Dashboard2Img,
        Dashboard3Img,
        Dashboard4Img,
        Dashboard5Img,
        Dashboard6Img,
    ]
    const { userDetails } = useContext(userContext)
    const [endBy, setEndBy] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(
        () => {
            if (loading) {
                const response = axios.get(serverHost + "/game/endBy").then(
                    (res) => {
                        console.log(res.data)
                        if (res.data?.configured) {
                            setEndBy(res.data?.endDateTime)
                        }
                    }
                )
            }
            setLoading(false)
        }, []
    )
    const navigate = useNavigate()
    return (<ThemeProvider theme={theme}>
        <CssBaseline />
        <Paper sx={{ padding: 4 }}>
            <Paper elevation={16} sx={{ padding: 2 }}>
                <Grid container>
                    <Grid item xs={12} md={3}>
                        <Container sx={{ display: "relative" }} elevation={0}>
                            <img src={dashboardImg[Math.floor(Math.random() * dashboardImg.length)]} width="100%" />
                        </Container>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Stack sx={{ display: "relative" }}>
                            <Typography variant="h4" component="p" align="center">
                                Welcome {userDetails?.user?.first_name + " " + userDetails?.user?.last_name},
                            </Typography>
                            <Typography variant="subtitle1" component="p" align="center">
                                Let's the HUNT begin
                            </Typography>
                            <Typography variant="h4" component="p" align="center" mt={3}>
                                ENDS IN
                            </Typography>
                            {endBy !== null ? <Timer timing={endBy} /> : <CircularProgress />}
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>
            <Grid container sx={{ marginTop: 3 }}  >
                <Grid item xs={12} sm={6} p={2}>
                    <Paper sx={{ padding: 2 }} elevation={4}>
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
                                <ListItemText>Practice</ListItemText>
                                <IconButton onClick={()=>{
                                    
                                }}>
                                    <PlayCircleFilledRounded />
                                </IconButton>
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <CircularProgressWithLabel value={45} />
                                </ListItemIcon>
                                <ListItemText>Main</ListItemText>
                                <IconButton onClick={()=>{

                                }}>
                                    <PlayCircleFilledRounded />
                                </IconButton>
                            </ListItemButton>
                        </List>
                    </Paper>


                </Grid>
                <Grid item xs={12} sm={6} p={2}>
                    <Paper sx={{ padding: 2 }} elevation={4}>
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
                                <ListItemText primary={"Tommy"} secondary={"CIT"} />
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
                                <ListItemText primary={"Bobby"} secondary={"CIT"} />
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
                                <ListItemText primary={"Bobby"} secondary={"CIT"} />
                                <Typography>
                                    1000
                                </Typography>
                            </ListItemButton>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    </ThemeProvider>)
}