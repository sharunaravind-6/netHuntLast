import { Box, Button, Chip, CssBaseline, Divider, Paper, TextField, ThemeProvider, Toolbar, Typography } from "@mui/material";

import { theme } from "../Theme/LightTheme";

import QuestionImg from "./../Images/QuestionSample.svg";
import QuestionFooter from "./QuestionFooter";

export default function Question() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Paper elevation={24} sx={{ position: "relative", marginTop: 3, padding: 2, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", marginLeft: { xs: 6 } }}>
                <Toolbar sx={{width:"100%"}}>
                    <Paper sx={{ padding: 1, position: "absolute", right: "10px", top: "5px" }}>
                        HITS 1
                    </Paper>
                </Toolbar>
                <Box sx={{ width: { xs: "250px", sm: "600px" }, position: "relative" }}>
                    <img src={QuestionImg} width="100%" />
                </Box>
                <Divider />
                <Box sx={{ width: "100%", display: "flex", marginTop: { md: 3, xs: 10 } }}>
                    <TextField label={"Guess"} sx={{ width: "100%" }} focused />
                    <Button variant="contained">Hit!</Button>
                </Box>
            </Paper>
            {/* <QuestionFooter/> */}
        </ThemeProvider>
    );
}