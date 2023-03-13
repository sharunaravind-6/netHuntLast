import { InfoRounded } from "@mui/icons-material";
import { Box, Container, AppBar, Toolbar, Typography, IconButton, Avatar, styled, Menu, MenuItem, Divider, ListItemIcon, ListItemText, Drawer, List, ListItemButton, ListItem, CssBaseline, ThemeProvider, Paper, Grid, CardHeader, Card, CardContent, Switch, Stepper, Step, StepContent, StepLabel, ButtonGroup, Button, Chip, Badge, TextField } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { userContext } from "../../Store/user";
import { theme } from "../../Theme/LightTheme";
import useAxios from "../../utils/useAxios";
import QuestionFooter from "../QuestionFooter";
export default function PracticeQuestions(props) {
    const [loading, setLoading] = useState(true)
    const api = useAxios()
    const [noOfQues, setNoOfQues] = useState([])
    const [score, setScore] = useState(0)
    const [current_question, set_current_question] = useState(0)
    const location = useLocation()

    const [hits, setHits] = useState(0)
    const [question, setQuestion] = useState(null)
    const { userDetails } = useContext(userContext)
    const [answer, setAnswer] = useState("")
    function hasSpecialCharsAndCapitalLetters(string) {
        var regex = /[^a-z]+|[A-Z]+|\s+/g;
        return regex.test(string);
    }
    const handleSubmit = async () => {
        if (answer === "" || hasSpecialCharsAndCapitalLetters(answer)) {
            return
        }
        const pathname = location.pathname.split("/")
        const response = await api.post("game/check_answer", {
            quiz: pathname[pathname.length - 1] === "main" ? "Main" : "Practice",
            try: answer
        })
        console.log(response.data)
        if (response.data.passed) {
            if (response.data.end) {
                //navigate to scoreboard
            } else {
                //move to next question
                setQuestion(response.data.question)
                setHits(response.data.progress.hits)
                set_current_question(response.data?.progress?.level)
            }
        } else {
            //same question but need to update hits
            setHits(response.data.progress.hits)
        }
        setAnswer("")
    }
    useEffect(
        () => {
            const pathname = location.pathname.split("/")
            if (loading) {
                api.post("game/status", {
                    quiz: pathname[pathname.length - 1] === "main" ? "Main" : "Practice"
                }).then(
                    res => {
                        const data = res.data
                        setScore(data.status.score)
                        setNoOfQues(data.total_ques)
                        let steps = []
                        for (let i = 0; i < data.total_ques; i++) {
                            steps.push(
                                <Step key={i}>
                                    <StepLabel></StepLabel>
                                </Step>
                            )
                        }
                        setNoOfQues(steps)
                        setHits(data?.progress?.hits)
                        setQuestion(data?.current_question)
                        set_current_question(data?.status?.level)
                        console.log(res.data)

                        setLoading(false)
                    }
                )
            }
        }, []
    )
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box>
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
                            <Typography variant="h5" component="p" sx={{ marginLeft: 5 }} >
                                N E T H U N T
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignContent: "center", alignItems: "center", flexDirection: "row" }}>
                            <Typography>
                                SCORE {score}
                            </Typography>
                            {/* <InfoRounded sx={{marginRight:{xs:2,sm:4}}}/> */}
                            <Button variant="contained">
                                PAUSE
                            </Button>
                        </Box>

                    </Toolbar>
                </AppBar>
                <Toolbar />
                <Container>
                    <Box>
                        <Drawer variant="permanent" sx={{
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', }
                        }}>
                            <Toolbar />
                            <Stepper orientation="vertical" sx={{ padding: 1, width: "100%", height: "100%", }} activeStep={current_question}>
                                {noOfQues}
                            </Stepper>
                        </Drawer>
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
                                <TextField label={"Guess"} sx={{ width: "100%" }} value={answer} onChange={(event) => {
                                    setAnswer(event.target.value)
                                }} focused />
                                <Button variant="contained" disabled={answer === "" || hasSpecialCharsAndCapitalLetters(answer)} onClick={handleSubmit}>Hit!</Button>
                            </Box>
                        </Paper>
                    </Box>
                </Container>
                <QuestionFooter />
            </Box>
        </ThemeProvider>);
}