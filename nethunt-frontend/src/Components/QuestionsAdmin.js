import { AddCircleRounded, EmojiObjectsRounded, ExpandMoreRounded, KeyRounded, SpeedRounded } from "@mui/icons-material";
import { Stack, Box, Grid, IconButton, Paper, Toolbar, Typography, Accordion, AccordionSummary, AccordionDetails, FormControl, InputLabel, Input, InputAdornment, Button, Backdrop, Modal, CircularProgress } from "@mui/material";
import React, {  useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { server, serverHost } from "../utils/server";
import useAxios from "../utils/useAxios";
import SampleImage from "./../Images/QuestionSample.svg"
export default function QuestionAdmin(props) {
    const [secretKey, setSecretKey] = useState("")
    const [displayQues, setDisplayQues] = useState(true)
    const api = useAxios()
    const [loader, setLoader] = useState(false)
    const [questions,setQuestions] = useState([])
    const location = useLocation()
    async function fetchQuestions()  {
        const pathname = location.pathname.split("/")
        const quiz = pathname[pathname.length - 1]
        setLoader(true)
        const response = await api.post("/game/fetchQues", {
            password: secretKey,
            quiz: quiz === "main" ? "Main" : "Practice"
        })
        setLoader(false)
        if (response?.data?.correct) {
            setDisplayQues(false)
            setLoader(true)
            setQuestions(["test"])
            setQuestions(response?.data?.questions)
            setLoader(false)
        }
        setSecretKey("")
    }
    useEffect(
        ()=>{
            // console.log("Updated questions",questions)
        },[questions]
    )
    return (
        <Paper>
            <Grid container padding={2}>
                <Grid item xs={12}>
                    <Toolbar>
                        <Typography variant="h5" flexGrow={1}>
                            Questions
                        </Typography>
                        <IconButton>
                            <AddCircleRounded />
                        </IconButton>
                    </Toolbar>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={10}>
                    <Paper elevation={4} sx={{ minHeight: "50vh", padding: 2 }}>
                       {questions.map(item=>{
                        return (<Accordion key={item.id}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreRounded />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>{item.answer}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container padding={3}>
                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{ position: "relative" }}>
                                            <img src={item.image} width="100%" />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Stack padding={2} sx={{ gap: 3 }}>
                                            <FormControl>
                                                <InputLabel htmlFor="hint1">
                                                    Hint 1 
                                                </InputLabel>
                                                <Input
                                                    fullWidth
                                                    disabled
                                                    defaultValue={item.hint1}
                                                    startAdornment={
                                                        <InputAdornment position="start">
                                                            <EmojiObjectsRounded />
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                            <FormControl>
                                                <InputLabel htmlFor="hint2">
                                                    Hint 2
                                                </InputLabel>
                                                <Input
                                                    fullWidth
                                                    disabled
                                                    defaultValue={item.hint2}
                                                    startAdornment={
                                                        <InputAdornment position="start">
                                                            <EmojiObjectsRounded />
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                            <FormControl>
                                                <InputLabel htmlFor="hint2">
                                                    Difficulty Level
                                                </InputLabel>
                                                <Input
                                                    id="hint2"
                                                    fullWidth
                                                    disabled
                                                    defaultValue={item.difficulty}
                                                    startAdornment={
                                                        <InputAdornment position="start">
                                                            <SpeedRounded />
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>)
                       })}
                    </Paper>
                </Grid>
                <Grid item xs={1} />

            </Grid>
            <Backdrop open={displayQues}>
                <Modal
                    open={displayQues}
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
                            Please type your password to verify your identity.<br />
                        </Typography>
                        {/* <Typography id="keep-mounted-modal-description" sx={{ mt: 2, textAlign: "justify" }}>
                            If so, please note that your progress will be saved and you may resume the quiz at any time.<br />
                            Thank you for taking the quiz.
                        </Typography> */}
                        <FormControl variant="standard" focused fullWidth sx={{ mb: 2, mt: 2 }}>
                            <InputLabel htmlFor="password">
                                Password
                            </InputLabel>
                            <Input
                                id="password"
                                type='password'
                                value={secretKey}
                                onChange={event => {
                                    setSecretKey(event.target.value)
                                }
                                }
                                startAdornment={
                                    <InputAdornment position="start">
                                        <KeyRounded />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <div id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                            <Box sx={{ width: { xs: "250px", sm: "600px" }, position: "relative" }}>
                                {/* <img src={ByeSVG} width="100%" /> */}
                            </Box>
                            <Button fullWidth onClick={fetchQuestions} variant="contained">CONTINUE</Button>
                            <Button fullWidth onClick={() => { }}>EXIT</Button>

                        </div>
                    </Box>
                </Modal>
            </Backdrop>
            <Backdrop open={loader}>
                <CircularProgress/>
            </Backdrop>
        </Paper>)
}
