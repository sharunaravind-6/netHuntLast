import { CssBaseline, ThemeProvider, Typography } from "@mui/material";

import { theme } from "../Theme/LightTheme";


export default function Question(){
    console.log(theme);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Typography>Question</Typography>
        </ThemeProvider>
    );
}