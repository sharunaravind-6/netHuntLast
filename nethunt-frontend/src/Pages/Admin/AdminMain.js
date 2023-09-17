import { ArrowBackIosRounded, DashboardRounded, FaceRounded, LogoutOutlined, MenuRounded, QuizRounded, SchoolRounded, ScoreboardRounded, SettingsOutlined, SupervisedUserCircleRounded } from "@mui/icons-material";
import { Box, Container, AppBar, Toolbar, Typography, IconButton, Avatar, styled, Menu, MenuItem, Divider, ListItemIcon, ListItemText, Drawer, List, ListItemButton, ListItem, CssBaseline, ThemeProvider, Backdrop, CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, } from "react-router-dom";
import ContactUS from "../../Components/ContactUs";
import StyledBadge from "../../Components/Parts/StyledBadge";
import { AdminContext } from "../../Store/adminStore";
import { userContext } from "../../Store/user";
import useAxios from "../../utils/useAxios";

import { theme } from "./../../Theme/LightTheme";
export default function AdminMain(props) {
    const [anchorEl, setAnchorEl] = useState(null)
    const [openDrawer, setOpenDrawer] = useState(false)
    const openMenu = Boolean(anchorEl)
    const [loading, setLoading] = useState(false)
    const { logout } = useContext(userContext)
    const navigate = useNavigate()
    const api = useAxios()
    const { config, setConfig } = useContext(AdminContext)
    const [initialLoading, setInitialLoading] = useState(true)
    useEffect(
        () => {
            if (initialLoading) {
                if (config === null) {
                    api.get("/game/config").then(
                        response => {
                            setConfig("yes")
                            if (!response?.data?.configured) {
                                navigate("config")
                            }
                        }
                    )
                }
            }
            setInitialLoading(false)
        },
        [initialLoading]
    )
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>

                <Toolbar>
                    <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
                        <IconButton color="inherit" onClick={() => setOpenDrawer(openDrawer ? false : true)}>
                            {openDrawer ? <ArrowBackIosRounded /> : <MenuRounded />}
                        </IconButton>
                        <Typography variant="h5" component="p" sx={{ marginLeft: 5,cursor: "pointer" }} flexGrow={1}>
                            N E T H U N T
                        </Typography>
                        <IconButton onClick={(event) => { anchorEl == null ? setAnchorEl(event.currentTarget) : setAnchorEl(null) }}>
                            <StyledBadge color="green">
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
                                {/* <MenuItem>
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
                                </MenuItem> */}
                                <MenuItem onClick={logout}>
                                    {/* <ListItemIcon>
                                        <LogoutOutlined />
                                    </ListItemIcon> */}
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
                    // variant="persistent"
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
                            <ListItemButton onClick={() => {
                                navigate("dashboard")
                                setOpenDrawer(false);
                            }}>
                                <ListItemIcon>
                                    <DashboardRounded />
                                </ListItemIcon>
                                <ListItemText primary={"Home"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => {
                                setLoading(true);
                                navigate("quiz/v");
                                setOpenDrawer(false);
                                setLoading(false);
                            }}>
                                <ListItemIcon>
                                    <QuizRounded />
                                </ListItemIcon>
                                <ListItemText primary={"Quiz"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => {
                                setLoading(true);
                                navigate("college")
                                setOpenDrawer(false);
                                setLoading(false);
                            }}>
                                <ListItemIcon>
                                    {/* Choose based on boy or girl */}
                                    <SchoolRounded />
                                </ListItemIcon>
                                {/* <ListItemText primary={"College"} /> */}
                                <ListItemText primary={"Batch"} /> 
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => {
                                setLoading(true);
                                navigate("usr")
                                setOpenDrawer(false);
                                setLoading(false);
                            }}>
                                <ListItemIcon>
                                    <FaceRounded />
                                </ListItemIcon>
                                {/* <ListItemText primary={"Candidates"} /> */}
                                <ListItemText primary={"Alumni"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => {
                                setLoading(true);
                                navigate("crd")
                                setOpenDrawer(false);
                                setLoading(false);
                            }}>
                                <ListItemIcon>
                                    <SupervisedUserCircleRounded />
                                </ListItemIcon>
                                <ListItemText primary={"Coordinators"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => {
                                setLoading(true);
                                navigate("score")
                                setOpenDrawer(false);
                                setLoading(false);
                            }}>
                                <ListItemIcon>
                                    <ScoreboardRounded />
                                </ListItemIcon>
                                <ListItemText primary={"Scoreboard"} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>
                <Container sx={{ marginTop: 2 }} maxWidth="false">
                    <Backdrop open={loading} sx={{ zIndex: 10 }}>
                        <CircularProgress />
                    </Backdrop>
                    <Outlet />
                </Container>
            </Box>
            <ContactUS />
        </ThemeProvider>);
}