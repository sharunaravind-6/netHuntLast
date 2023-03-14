import { InfoRounded } from "@mui/icons-material";
import { Box, Container, AppBar, Toolbar, Typography, IconButton, Avatar, styled, Menu, MenuItem, Divider, ListItemIcon, ListItemText, Drawer, List, ListItemButton, ListItem, CssBaseline, ThemeProvider, Paper, Grid, CardHeader, Card, CardContent, Switch, Stepper, Step, StepContent, StepLabel, ButtonGroup, Button, Chip, Badge, TextField, Backdrop, CircularProgress, Dialog, Modal } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { userContext } from "../../Store/user";
import { theme } from "../../Theme/LightTheme";
import useAxios from "../../utils/useAxios";
import QuestionFooter from "../QuestionFooter";
import WaitingSVG from "./../../Images/Waiting.svg";
import CongratsSVG from "./../../Images/Appreciation.svg"
export default function PracticeQuestions(props) {
    const [loading, setLoading] = useState(true)
    const api = useAxios()
    const [noOfQues, setNoOfQues] = useState([])
    const [score, setScore] = useState(0)
    const [current_question, set_current_question] = useState(0)
    const location = useLocation()
    const [loader, setLoader] = useState(false)
    const [hits, setHits] = useState(0)
    const [question, setQuestion] = useState(null)
    const { userDetails } = useContext(userContext)
    const [answer, setAnswer] = useState("")
    const [starter, setStarter] = useState(true)
    const [nextQuesInit, setNextQuesNavInit] = useState(false)
    const appreciationText = ["Hooray! You did it!",
        "Way to go, champ!",
        "Woohoo! Congrats on completing the level!",
        "You rock!",
        "Awesome job!",
        "You're amazing!",
        "Go, you!",
        "Hip hip hooray!",
        "All right, all right, all right!",
        "That's the way to do it!",
        "Yes, yes, yes!",
        "You're a star!",
        "Keep up the great work!",
        "That was incredible!",
        "You're on fire!",
        "You're a winner!",
        "Bravo, bravo!",
        "That's how it's done!",
        "You're unstoppable!"]
    function hasSpecialCharsAndCapitalLetters(string) {
        var regex = /[^a-z]+|[A-Z]+|\s+/g;
        return regex.test(string);
    }
    const handleSubmit = async () => {
        setLoader(true)
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
                setLoader(true)
                setNextQuesNavInit(true)
                setQuestion(response.data.question)
                setHits(response.data.progress.hits)
                set_current_question(response.data?.progress?.level)
                setLoader(false)
            }
        } else {
            //same question but need to update hits
            setHits(response.data.progress.hits)
        }
        setAnswer("")
        setLoader(false)
    }
    const moveToNextQuestion = () => {
        setNextQuesNavInit(false)
    }
    const openQuestion = () => {
        setLoader(true)
        setStarter(false)
        const pathname = location.pathname.split("/")
        api.post("game/status", {
            quiz: pathname[pathname.length - 1] === "main" ? "Main" : "Practice"
        }).then(
            res => {
                const data = res.data
                if (!data?.problem) {
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
                }
                setLoader(false)
            }
        )
    }
    useEffect(
        () => {



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
                                {question !== null ?
                                    <img src={"data:image/png;base64," + question?.image} width="100%" />
                                    :
                                    <img src={WaitingSVG} width="100%" />
                                }
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
                <Backdrop open={loader}>
                    <CircularProgress />
                </Backdrop>
                <Backdrop open={starter}>
                    <Modal
                        open={starter}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                        }}>
                            <Typography id="keep-mounted-modal-title" variant="h6" component="h2" sx={{ textAlign: "center" }}>
                                Welcome to NETHUNT! <br />
                                Please read the following instructions carefully before proceeding:
                            </Typography>
                            <div id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                                <ul>
                                    <li>
                                        Ensure that you have a stable internet connection before starting the quiz.
                                    </li>
                                    <li>
                                        Do not refresh or close the quiz window while attempting the quiz.
                                    </li>
                                    <li>
                                        You will have a specific time limit to complete the quiz. Please keep an eye on the timer provided on the home page.
                                    </li>
                                    <li>
                                        Cheating or attempting to cheat during the quiz will result in disqualification.
                                    </li>
                                </ul>

                                With that said, we hope you are ready to test your knowledge and wish you the best of luck!<br />
                                <Button fullWidth onClick={openQuestion}>Proceed</Button>
                            </div>
                        </Box>
                    </Modal>
                </Backdrop>


                <Backdrop open={nextQuesInit}>
                    <Modal
                        open={nextQuesInit}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: { xs: "300px", sm: "650px" },
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                        }}>
                            <Typography id="keep-mounted-modal-title" variant="h6" component="h2" sx={{ textAlign: "center" }}>
                                {appreciationText[Math.floor(appreciationText.length * Math.random())]}
                            </Typography>
                            <div id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                                <Box sx={{ width: { xs: "250px", sm: "600px" }, position: "relative" }}>
                                    <img src={CongratsSVG} width="100%" />
                                </Box>
                                <Button fullWidth onClick={moveToNextQuestion}>Proceed</Button>
                            </div>
                        </Box>
                    </Modal>
                </Backdrop>
            </Box>
        </ThemeProvider>);
}