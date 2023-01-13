import { ArrowBackIosRounded, ArrowForwardRounded, ArrowLeftRounded, DashboardRounded, Face2Rounded, Face3Rounded, FaceRounded, ForkLeftRounded, HelpCenterRounded, InboxRounded, LogoutOutlined, MenuRounded, ScoreboardRounded, SettingsOutlined, StartRounded } from "@mui/icons-material";
import { Box, Badge, Container, AppBar, Toolbar, Typography, IconButton, Avatar, styled, Menu, MenuItem, Divider, ListItemIcon, ListItemText, Drawer, List, ListItemButton, ListItem, CssBaseline, ThemeProvider, Paper, Grid, CardHeader, Card, CardContent } from "@mui/material";
import { useState } from "react";
import DashboardImg from "./../Images/Dashboard.svg";

import { theme } from "./../Theme/LightTheme";
export default function DashboardX(props) {
    const [anchorEl, setAnchorEl] = useState(null)
    const [openDrawer, setOpenDrawer] = useState(false)
    const openMenu = Boolean(anchorEl)
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#f00',
            color: '#f00',
            boxShadow: `0 0 0 .5px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                content: '""',
            },
        },
    }));

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>

                <Toolbar>
                    <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
                        <IconButton color="inherit" onClick={() => setOpenDrawer(openDrawer ? false : true)}>
                            {openDrawer ? <ArrowBackIosRounded /> : <MenuRounded />}
                        </IconButton>
                        <Typography variant="h5" component="p" sx={{ marginLeft: 5 }} flexGrow={1}>
                            N E T H U N T
                        </Typography>
                        <IconButton onClick={(event) => { anchorEl == null ? setAnchorEl(event.currentTarget) : setAnchorEl(null) }}>
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot">
                                <Avatar />
                            </StyledBadge>
                            <Menu open={openMenu} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                                <MenuItem>
                                    <Avatar />
                                    <Typography ml={2} pr={3}>Profile</Typography>
                                </MenuItem>
                                <MenuItem>
                                    <Avatar />
                                    <Typography ml={2} pr={3}>Account</Typography>
                                </MenuItem>
                                <Divider />
                                <MenuItem>
                                    <ListItemIcon>
                                        <SettingsOutlined />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Settings
                                    </ListItemText>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon>
                                        <LogoutOutlined />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Logout
                                    </ListItemText>
                                </MenuItem>

                            </Menu>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Box>
                <Drawer open={openDrawer} anchor="left"
                    variant="persistent"
                    onClose={() => { setOpenDrawer(false) }}
                    sx={{
                        width: 240,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: 240,
                            boxSizing: 'border-box',
                        },
                    }}>
                    <Toolbar />
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <DashboardRounded />
                                </ListItemIcon>
                                <ListItemText primary={"Dashboard"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {/* Choose based on boy or girl */}
                                    <FaceRounded />
                                </ListItemIcon>
                                <ListItemText primary={"Profile"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ScoreboardRounded />
                                </ListItemIcon>
                                <ListItemText primary={"Score board"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <HelpCenterRounded />
                                </ListItemIcon>
                                <ListItemText primary={"Help"} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>
                <Container >
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
                            <Paper sx={{padding:2}}>
                                <Typography flexGrow={1}>Quiz</Typography>
                                <IconButton>
                                    <ArrowForwardRounded/>
                                </IconButton>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} p={2}>
                            <Paper  sx={{padding:2}}>
                            <Typography flexGrow={1}>Leaderboard</Typography>
                                <IconButton>
                                    <ArrowForwardRounded/>
                                </IconButton>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>);
}