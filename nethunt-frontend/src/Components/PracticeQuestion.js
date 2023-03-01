import { Box, Button, Chip, CssBaseline, Divider, Paper, TextField, ThemeProvider, Toolbar, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { userContext, } from "../Store/user";

import { theme } from "../Theme/LightTheme";
import useAxios from "../utils/useAxios";

import QuestionImg from "./../Images/QuestionSample.svg";


export default function PracticeQuestion() {
    const api = useAxios()
    const [hits, setHits] = useState(0)
    const [question, setQuestion] = useState(null)
    const { userDetails } = useContext(userContext)
    const [loading, setLoading] = useState(true)
    const [answer,setAnswer] = useState("")
    const location = useLocation()
    function hasSpecialCharsAndCapitalLetters(string) {
        var regex = /[^a-z]+|[A-Z]+|\s+/g;
        return regex.test(string);
      }
      const handleSubmit = async ()=>{
        if(answer === "" || hasSpecialCharsAndCapitalLetters(answer)){
            return
        }
        const pathname = location.pathname.split("/")
        const response = await api.post("game/check_answer", {
            quiz: pathname[pathname.length - 1] === "main" ? "Main" : "Practice",
            try:answer
        })
        console.log(response.data)
      }
    const handleOpenQuestion = async () => {
        console.log({
            email: userDetails?.user.email,
            quiz: "Practice"
        })
        const response = await api.post("/game/progress", {
            email: userDetails.user.email,
            quiz: "Practice"
        })
        return response.data
    }
    useEffect(
        () => {
            if (loading) {
                handleOpenQuestion().then(
                    res => {
                        console.log(res)
                        if (res?.problem === false) {
                            console.log(res)
                            setHits(res?.progress?.hits)
                            setQuestion(res?.question)
                        }
                    }
                )
            }
            setLoading(false)
        },
        [loading]
    )
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Paper elevation={24} sx={{ position: "relative", marginTop: 3, padding: 2, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", marginLeft: { xs: 6 } }}>
                <Toolbar sx={{ width: "100%" }}>
                    <Paper sx={{ padding: 1, position: "absolute", right: "10px", top: "5px" }}>
                        HITS {hits}
                    </Paper>
                </Toolbar>
                <Box sx={{ width: { xs: "250px", sm: "600px" }, position: "relative" }}>
                    <img src={"data:image/png;base64," + question?.image} width="100%" />
                </Box>
                <Divider />
                <Box sx={{ width: "100%", display: "flex", marginTop: { md: 3, xs: 10 } }}>
                    <TextField label={"Guess"} sx={{ width: "100%" }} onChange={(event)=>{
                        setAnswer(event.target.value)
                    }} focused />
                    <Button variant="contained" disabled={answer === "" || hasSpecialCharsAndCapitalLetters(answer)} onClick={handleSubmit}>Hit!</Button>
                </Box>
            </Paper>
            {/* <QuestionFooter/> */}
        </ThemeProvider>
    );
}