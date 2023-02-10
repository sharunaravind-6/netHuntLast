import { ArrowBackIosRounded, DashboardRounded, FaceRounded, HelpCenterRounded, LogoutOutlined, MenuRounded, ScoreboardRounded, SettingsOutlined } from "@mui/icons-material";
import { Box, Container, AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem, Divider, ListItemIcon, ListItemText, Drawer, List, ListItemButton, ListItem, CssBaseline, ThemeProvider, Backdrop, CircularProgress } from "@mui/material";
import { useContext, useState } from "react";
import { Outlet, useNavigate, } from "react-router-dom";
import ContactUS from "../Components/ContactUs";
import StyledBadge from "../Components/Parts/StyledBadge";
import { userContext } from "../Store/user";

import { theme } from "./../Theme/LightTheme";
export default function DashboardX(props) {
    const [anchorEl, setAnchorEl] = useState(null)
    const [openDrawer, setOpenDrawer] = useState(false)
    const openMenu = Boolean(anchorEl)
    const [loading, setLoading] = useState(false)
    const { logout } = useContext(userContext)
    const navigate = useNavigate()
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
                                <MenuItem onClick={logout}>
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
                                setLoading(true);
                                navigate("dashboard");
                                setOpenDrawer(false);
                                setLoading(false);
                            }}>
                                <ListItemIcon>
                                    <DashboardRounded />
                                </ListItemIcon>
                                <ListItemText primary={"Dashboard"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => {
                                setLoading(true);
                                navigate("profile");
                                setOpenDrawer(false);
                                setLoading(false);
                            }}>
                                <ListItemIcon>
                                    {/* Choose based on boy or girl */}
                                    <FaceRounded />
                                </ListItemIcon>
                                <ListItemText primary={"Profile"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => {
                                setLoading(true);
                                navigate("scoreboard");
                                setOpenDrawer(false);
                                setLoading(false);
                            }}>
                                <ListItemIcon>
                                    <ScoreboardRounded />
                                </ListItemIcon>
                                <ListItemText primary={"Score board"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => {
                                setLoading(true);
                                navigate("help");
                                setOpenDrawer(false);
                                setLoading(false);
                            }}>
                                <ListItemIcon>
                                    <HelpCenterRounded />
                                </ListItemIcon>
                                <ListItemText primary={"Help"} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>
                <Container sx={{ marginTop: 3 }} maxWidth="false">
                    <Backdrop open={loading}>
                        <CircularProgress />
                    </Backdrop>
                    <Outlet />
                </Container>
            </Box>
            <ContactUS />
        </ThemeProvider>);
}