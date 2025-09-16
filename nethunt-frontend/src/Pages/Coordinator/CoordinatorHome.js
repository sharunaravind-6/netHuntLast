import { ArrowForwardRounded, CircleRounded, MailRounded, PhoneRounded } from "@mui/icons-material";
import { Avatar, Box, Checkbox, CircularProgress, Container, CssBaseline, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper, Stack, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { serverHost } from "../../utils/server";
import { theme } from "./../../Theme/LightTheme";
import AdminSVG from "./../../Images/Admin.svg"
import { CoordinatorContext } from "../../Store/coordinatorStore";
import useAxios from "../../utils/useAxios";
import Timer from "../../Components/Parts/Timer";
export default function CoordinatorHome(props) {
    const api = useAxios()
    const { fetchUsers, usrs } = useContext(CoordinatorContext)
    const [loading, setLoading] = useState(true)
    const [endBy, setEndBy] = useState(null)
    useEffect(
        () => {
            fetchUsers()
        },
        []
    )
    useEffect(
        () => {
            if (loading) {
                const response = axios.get(serverHost + "/game/endBy").then(
                    (res) => {
                        // console.log(res.data)
                        if (res.data?.configured) {
                            setEndBy(res.data?.endDateTime)
                        }
                    }
                )
            }
            setLoading(false)
        }, []
    )
    return (<ThemeProvider theme={theme}>
        <CssBaseline />
        {endBy !== null ? <Timer timing={endBy} /> : <CircularProgress />}
        <Container maxWidth="false">
            <Grid container padding={3}>
                <Grid item md={9} sm={12}>
                    <Paper sx={{ padding: 3 }} elevation={10}>
                        <Stack sx={{ display: "flex", flexDirection: { "md": "row", "sm": "column" } ,justifyContent:"center",alignItems:"center"}}>
                            <Box sx={{ width: { xs: "250px", sm: "450px" }, position: "relative" }}>
                                <img src={AdminSVG} width="100%" />
                            </Box>
                            <Box>
                                <Typography variant="h4" component="p" sx={{ textAlign: "center" }}>
                                    Welcome Coordinator,
                                </Typography>
                                <Divider />
                                <Typography  component="p" sx={{ textAlign: "justify" ,padding:2,fontSize:"18px"}}>
                                As a coordinator, you play a crucial role in ensuring the success of this quiz. Use this page to create and manage quizzes, track participant progress, and generate reports that will help you improve the overall experience for everyone involved.
                                </Typography>
                            </Box>
                        </Stack>
                        <Divider />
                    </Paper>
                </Grid>
                <Grid item md={3} sm={12} padding={2}>
                    <Paper elevation={16} sx={{ padding: 2 }}>
                        <Typography>
                            <b>Users</b>
                        </Typography>
                        <Divider />
                        <List dense sx={{ width: '100%' }}>
                            {usrs.map((value) => {
                                const labelId = `checkbox-list-secondary-label-${value}`;
                                return (
                                    <ListItem
                                        key={value.id}
                                        secondaryAction={
                                            <CircleRounded sx={{ fill: value.status === "offline" ? "red" : "green", width: "10px" }} />
                                        }
                                        disablePadding
                                    >
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    {value.user.first_name[0] + value.user.last_name[0]}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText id={labelId} primary={`${value.user.first_name + " " + value.user.last_name}`} />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    </ThemeProvider>)
}