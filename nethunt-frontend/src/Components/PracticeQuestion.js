import { Box, Button, Chip, CssBaseline, Divider, Paper, TextField, ThemeProvider, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { UserContextProvider } from "../Store/user";

import { theme } from "../Theme/LightTheme";
import useAxios from "../utils/useAxios";

import QuestionImg from "./../Images/QuestionSample.svg";
import QuestionFooter from "./QuestionFooter";

export default function PracticeQuestion() {
    const api = useAxios()
    const  {userDetails} = useContext(UserContextProvider)
    const handleOpenQuestion =async (quiz) => {
        console.log({
            email:userDetails.user.email,
            quiz:"Practice"
        })
        const response =await api.post("/game/progress",{
            email:userDetails.user.email,
            quiz:quiz
        })
        console.log(response.data)
        if(response.data?.problem !== false){
            
        }
    }
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