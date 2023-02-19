import { AddPhotoAlternateRounded, EmojiObjectsRounded, QuestionAnswerOutlined, QuizRounded, SpeedRounded } from "@mui/icons-material";
import { Box, Button, FormControl, Grid, Input, InputAdornment, InputLabel, MenuItem, Paper, Select, Stack, Toolbar, Typography } from "@mui/material";
import { useState } from "react";

export default function AddQuestion() {
    const [question, setQuestion] = useState({
        quiz: "",
        img: null,
        answer: "",
        hint1: "",
        hint2: "",
        difficultyLevel: "",
    })
    const [dispQuestion, setDispQuestion] = useState(null)
    return (<Paper sx={{ padding: 2 }}><Stack padding={2} sx={{ gap: 3 }}>
        <FormControl fullWidth>
            <InputLabel id="year-select-label">Quiz</InputLabel>
            <Select
                labelId="quiz-select-label"
                id="quiz-select"
                label="Quiz"
                value={question.quiz}
                onChange={(event) => { setQuestion((oldData) => { return { ...oldData, quiz: event.target.value } }) }}
                startAdornment={
                    <InputAdornment position="start">
                        <QuizRounded />
                    </InputAdornment>
                }
            >
                <MenuItem value={"Practice"}>{"Practice"}</MenuItem>
                <MenuItem value={"Main"}>{"Main"}</MenuItem>
            </Select>
        </FormControl>
        <Paper elevation={16} sx={{ padding: 3 }}>
            <Button component="label">
                <AddPhotoAlternateRounded />
                <Typography>Question Image</Typography>
                <input
                    hidden
                    type="file"
                    onChange={(event) => {
                        setQuestion((oldData) => { return { ...oldData, img: event.target.files[0] } });
                        setDispQuestion(URL.createObjectURL(event.target.files[0]))
                    }}
                />
            </Button>
            <Box>
                <img src={dispQuestion} width="200px" height="auto" />
            </Box>
        </Paper>
        <FormControl>
            <InputLabel htmlFor="answer">
                Answer
            </InputLabel>
            <Input
                id="answer"
                fullWidth
                onChange={(event) => { setQuestion((oldData) => { return { ...oldData, answer: event.target.value } }) }}
                startAdornment={
                    <InputAdornment position="start">
                        <QuestionAnswerOutlined />
                    </InputAdornment>
                }
            />
        </FormControl>

        <FormControl>
            <InputLabel htmlFor="hint1">
                Hint 1
            </InputLabel>
            <Input
                id="hint1"
                onChange={(event) => { setQuestion((oldData) => { return { ...oldData, hint1: event.target.value } }) }}
                fullWidth
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
                id="hint2"
                fullWidth
                onChange={(event) => { setQuestion((oldData) => { return { ...oldData, hint2: event.target.value } }) }}
                startAdornment={
                    <InputAdornment position="start">
                        <EmojiObjectsRounded />
                    </InputAdornment>
                }
            />
        </FormControl>
        <FormControl fullWidth>
            <InputLabel id="xp-select-label">Difficulty Level</InputLabel>
            <Select
                labelId="xp-select-label"
                id="xp-select"
                label="Difficulty Level"
                value={question.difficultyLevel}
                onChange={(event) => {
                    setQuestion((oldData) => { return { ...oldData, difficultyLevel: event.target.value } })
                }
                }
                startAdornment={
                    <InputAdornment position="start">
                        <SpeedRounded />
                    </InputAdornment>
                }
            >
                <MenuItem value={"Easy"}>{"Easy"}</MenuItem>
                <MenuItem value={"Moderate"}>{"Moderate"}</MenuItem>
                <MenuItem value={"Hard"}>{"Hard"}</MenuItem>
            </Select>
        </FormControl>
        <Toolbar>
            <Box flexGrow={1} />
            <Button variant="contained" sx={{ width: { sm: "100%", md: "20%" } }}
                disabled={
                    !(
                        question.answer !== "" &&
                        question.answer !== null &&
                        question.hint1 !== "" &&
                        question.hint1 !== null &&
                        question.hint2 !== "" &&
                        question.hint2 !== null &&
                        question.img !== "" &&
                        question.img !== null &&
                        question.difficultyLevel !== "" &&
                        question.difficultyLevel !== null
                    )
                }
            >Add</Button>
        </Toolbar>
    </Stack>
    </Paper>)
}