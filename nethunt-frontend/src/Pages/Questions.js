import { Box, Container, AppBar, Toolbar, Typography, IconButton, Avatar, styled, Menu, MenuItem, Divider, ListItemIcon, ListItemText, Drawer, List, ListItemButton, ListItem, CssBaseline, ThemeProvider, Paper, Grid, CardHeader, Card, CardContent, Switch } from "@mui/material";
import { Outlet } from "react-router-dom";
import ContactUS from "../Components/ContactUs";


import { theme } from "./../Theme/LightTheme";
export default function Questions(props) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="fixed" sx={{zIndex:(theme)=>theme.zIndex.drawer+1}}>
                <Toolbar>
                    <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
                        <Typography variant="h5" component="p" sx={{ marginLeft: 5 }} flexGrow={1}>
                            N E T H U N T
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Box>
                <Drawer variant="permanent">
                <Toolbar/>
                    
                </Drawer>
                <Container >
                    <Outlet/>
                </Container>
            </Box>
            <ContactUS/>
        </ThemeProvider>);
}