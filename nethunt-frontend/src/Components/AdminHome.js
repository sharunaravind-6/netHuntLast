import { ArrowForwardRounded, CircleRounded, MailRounded, PhoneRounded } from "@mui/icons-material";
import { Avatar, Box, Checkbox, CircularProgress, Container, CssBaseline, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper, Stack, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { AdminContext } from "../Store/adminStore";
import { serverHost } from "../utils/server";
import useAxios from "../utils/useAxios";
import { theme } from "./../Theme/LightTheme";
import Timer from "./Parts/Timer";
export default function AdminHome(props) {
    const api = useAxios()
    const {fetchUsers,usrs} = useContext(AdminContext)
    const [loading,setLoading] = useState(true) 
    const [endBy,setEndBy] = useState(null)
    useEffect(
        ()=>{
            fetchUsers()
        },
        []
    )
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
    return (<ThemeProvider theme={theme}>
        <CssBaseline />
        {endBy !== null ? <Timer timing={endBy} /> : <CircularProgress />}
        <Container maxWidth="false">
            <Grid container padding={3}>
                <Grid item md={9}>
                    <Paper sx={{ padding: 3 }} elevation={10}>
                        <Typography variant="h5" component="p">
                            Recent Activities
                        </Typography>
                        <Divider />
                    </Paper>
                </Grid>
                <Grid item md={3} padding={2}>
                    <Paper elevation={16} sx={{ padding: 2 }}>
                        <Typography>
                            <b>Users</b>
                        </Typography>
                        <Divider/>
                        <List dense sx={{ width: '100%' }}>
                            {usrs.map((value) => {
                                const labelId = `checkbox-list-secondary-label-${value}`;
                                return (
                                    <ListItem
                                        key={value.id}
                                        secondaryAction={
                                            <CircleRounded sx={{fill: value.status === "offline" ?"red":"green",width:"10px"}}/>
                                        }
                                        disablePadding
                                    >
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar>
                                                {value.user.first_name[0]  + value.user.last_name[0]}
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