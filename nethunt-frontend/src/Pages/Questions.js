import { InfoRounded } from "@mui/icons-material";
import { Box, Container, AppBar, Toolbar, Typography, IconButton, Avatar, styled, Menu, MenuItem, Divider, ListItemIcon, ListItemText, Drawer, List, ListItemButton, ListItem, CssBaseline, ThemeProvider, Paper, Grid, CardHeader, Card, CardContent, Switch, Stepper, Step, StepContent, StepLabel, ButtonGroup, Button, Chip, Badge } from "@mui/material";
import { Outlet } from "react-router-dom";
import ContactUS from "../Components/ContactUs";
import QuestionFooter from "../Components/QuestionFooter";


import { theme } from "./../Theme/LightTheme";
export default function Questions(props) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
                        <Typography variant="h5" component="p" sx={{ marginLeft: 5 }} >
                            N E T H U N T
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignContent: "center", alignItems: "center", flexDirection: "row" }}>
                        <Typography>
                            SCORE 1010
                        </Typography>
                        {/* <InfoRounded sx={{marginRight:{xs:2,sm:4}}}/> */}
                        <Button variant="contained">
                            PAUSE
                        </Button>
                    </Box>

                </Toolbar>
            </AppBar>
            <Toolbar />
            <Box>
                <Drawer variant="permanent" sx={{
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', }
                }}>
                    <Toolbar />
                    <Stepper orientation="vertical" sx={{ padding: 1, width: "100%", height: "100%", }}>
                        <Step>
                            <StepLabel></StepLabel>
                        </Step>
                        <Step>
                            <StepLabel></StepLabel>
                        </Step><Step>
                            <StepLabel></StepLabel>
                        </Step><Step>
                            <StepLabel></StepLabel>
                        </Step><Step>
                            <StepLabel></StepLabel>
                        </Step><Step>
                            <StepLabel></StepLabel>
                        </Step><Step>
                            <StepLabel></StepLabel>
                        </Step><Step>
                            <StepLabel></StepLabel>
                        </Step><Step>
                            <StepLabel></StepLabel>
                        </Step><Step>
                            <StepLabel></StepLabel>
                        </Step><Step>
                            <StepLabel></StepLabel>
                        </Step><Step>
                            <StepLabel></StepLabel>
                        </Step><Step>
                            <StepLabel></StepLabel>
                        </Step><Step>
                            <StepLabel></StepLabel>
                        </Step><Step>
                            <StepLabel></StepLabel>
                        </Step><Step>
                            <StepLabel></StepLabel>
                        </Step><Step>
                            <StepLabel></StepLabel>
                        </Step><Step>
                            <StepLabel></StepLabel>
                        </Step>
                        <Step>
                            <StepLabel></StepLabel>
                        </Step><Step>
                            <StepLabel></StepLabel>
                        </Step><Step>
                            <StepLabel></StepLabel>
                        </Step><Step>
                            <StepLabel></StepLabel>
                        </Step><Step>
                            <StepLabel></StepLabel>
                        </Step><Step>
                            <StepLabel></StepLabel>
                        </Step><Step>
                            <StepLabel></StepLabel>
                        </Step><Step>
                            <StepLabel></StepLabel>
                        </Step><Step>
                            <StepLabel></StepLabel>
                        </Step><Step>
                            <StepLabel></StepLabel>
                        </Step><Step>
                            <StepLabel></StepLabel>
                        </Step><Step>
                            <StepLabel></StepLabel>
                        </Step>
                    </Stepper>
                </Drawer>
                <Container >
                    <Outlet />
                </Container>
            </Box>
            <QuestionFooter />
        </ThemeProvider>);
}