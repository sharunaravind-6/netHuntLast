import { ThemeProvider } from "@emotion/react";
import { AppBar, Box, Container, CssBaseline, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Timer from "../Components/Parts/Timer";
import { theme } from "../Theme/LightTheme";
import { serverHost } from "../utils/server";

export default function LandingPage(props) {
    const [startBy, setStartBy] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(
        () => {
            if (loading) {
                const response = axios.get(serverHost + "/game/startBy").then(
                    (res) => {
                        // console.log(res.data)
                        if (res.data?.configured) {
                            setStartBy(res.data?.startDateTime)
                        }
                    }
                )
            }
            setLoading(false)
        },[]
    )
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
                {startBy !==null ?<Timer timing={startBy} />:<>Coming Soon</>}
            </Container>
        </ThemeProvider>)
}