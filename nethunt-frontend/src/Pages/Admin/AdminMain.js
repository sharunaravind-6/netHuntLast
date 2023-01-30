import { ArrowBackIosRounded, ArrowForwardRounded, ArrowLeftRounded, DashboardRounded, Face2Rounded, Face3Rounded, FaceRounded, ForkLeftRounded, HelpCenterRounded, InboxRounded, LogoutOutlined, MenuRounded, SchoolRounded, ScoreboardRounded, SettingsOutlined, StartRounded, SupervisedUserCircleRounded } from "@mui/icons-material";
import { Box, Badge, Container, AppBar, Toolbar, Typography, IconButton, Avatar, styled, Menu, MenuItem, Divider, ListItemIcon, ListItemText, Drawer, List, ListItemButton, ListItem, CssBaseline, ThemeProvider, Paper, Grid, CardHeader, Card, CardContent, Switch, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { Outlet, Route, Router, Routes } from "react-router-dom";
import ContactUS from "../../Components/ContactUs";
import { theme } from "./../../Theme/LightTheme";
export default function AdminMain(props) {
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
                    variant={useMediaQuery(theme.breakpoints.up("sm"))?"permanent":"persistent"}
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
                                <ListItemText primary={"Home"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {/* Choose based on boy or girl */}
                                    <SchoolRounded/>
                                </ListItemIcon>
                                <ListItemText primary={"College"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <FaceRounded/>
                                </ListItemIcon>
                                <ListItemText primary={"Candidates"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <SupervisedUserCircleRounded/>
                                </ListItemIcon>
                                <ListItemText primary={"Coordinators"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                <ScoreboardRounded />
                                </ListItemIcon>
                                <ListItemText primary={"Scoreboard"} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>
                <Container >
                    <Outlet />
                </Container>
            </Box>
            <ContactUS />
        </ThemeProvider>);
}