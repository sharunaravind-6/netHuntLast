import { ThemeProvider } from "@emotion/react";
import { AppBar, Box, Container, CssBaseline, Toolbar, Typography } from "@mui/material";
import Timer from "../Components/Parts/Timer";
import { theme } from "../Theme/LightTheme";

export default function LandingPage(props) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
                        <Typography variant="h5" component="p" sx={{ marginLeft: 5 }} flexGrow={1}>
                            N E T H U N T
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Container>
                <Timer />
            </Container>
        </ThemeProvider>)
}