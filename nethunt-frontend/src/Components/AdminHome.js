import { ArrowForwardRounded, CircleRounded, MailRounded, PhoneRounded } from "@mui/icons-material";
import { Avatar, Box, Checkbox, Container, CssBaseline, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { ThemeProvider } from "styled-components";
import { theme } from "./../Theme/LightTheme";
import HelpImg from "./../Images/Help.svg";
export default function AdminHome(props) {

    return (<ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
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
                            {[0, 1, 2, 3,4,5,6,7,8,9,10].map((value) => {
                                const labelId = `checkbox-list-secondary-label-${value}`;
                                return (
                                    <ListItem
                                        key={value}
                                        secondaryAction={
                                            <CircleRounded sx={{fill: value%2==0?"red":"green",width:"10px"}}/>
                                        }
                                        disablePadding
                                    >
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt={`Avatar n°${value + 1}`}
                                                    src={`/static/images/avatar/${value + 1}.jpg`}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText id={labelId} primary={`User ${value + 1}`} />
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