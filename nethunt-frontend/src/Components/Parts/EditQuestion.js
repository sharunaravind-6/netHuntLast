import { AddPhotoAlternateRounded, ContactSupportOutlined, EmojiObjectsRounded, QuestionAnswerOutlined, QuizRounded, SpeedRounded } from "@mui/icons-material";
import { Backdrop, Box, Button, CircularProgress, FormControl, Grid, Input, InputAdornment, InputLabel, MenuItem, Modal, Paper, Select, Stack, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import useAxios from "./../../utils/useAxios"
export default function EditQuestion() {
    const [question, setQuestion] = useState({
        quiz: "",
        img: null,
        answer: "",
        ques: null,
        hint1: "",
        hint2: "",
        difficultyLevel: "",
    })
    const [loader,setLoader] = useState(false)
    const [are_you_sure,set_are_you_sure] = useState(false)
    const api = useAxios()
    const [questions, setQuestions] = useState([])
    const [operation,setOperation] = useState("")
    const fetchQuizQuestions = async (quiz) => {
        const response = await api.post("/game/disp_q_update", { quiz: quiz })
        setQuestions(response?.data?.questions)
    }
    const deleteQuestion =async ()=>{
        const response = await api.post("/game/delete_ques",{questionId: question.ques})
        console.log(response?.data)
        
    }
    const handleSubmit = async () => {
        console.log(question)
        const form = new FormData()
        form.append("question", question["img"])
        form.append("data", JSON.stringify(question))
        const response = await api.post("/game/add_question", form, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: question
        })
        const data = response.data
        console.log(data)
    }

    const [dispQuestion, setDispQuestion] = useState(null)
    return (<Paper sx={{ padding: 2 }}><Stack padding={2} sx={{ gap: 3 }}>
        <FormControl fullWidth>
            <InputLabel id="year-select-label">Quiz</InputLabel>
            <Select
                labelId="quiz-select-label"
                id="quiz-select"
                label="Quiz"
                value={question.quiz}
                onChange={(event) => {
                    setQuestion((oldData) => { return { ...oldData, quiz: event.target.value } })
                    // console.log(event.target.value === "Main"?"main":"practice")
                    fetchQuizQuestions(event.target.value)
                }}
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
        <FormControl fullWidth>
            <InputLabel id="year-select-label">Choose question</InputLabel>
            <Select
                labelId="ques-select-label"
                id="ques-select"
                label="Ques"
                value={question.ques}
                onChange={(event) => {
                    setQuestion((oldData) => { return { ...oldData, ques: event.target.value } })

                }}
                startAdornment={
                    <InputAdornment position="start">
                        <QuizRounded />
                    </InputAdornment>
                }
            >
                {
                    questions.map(item => {
                        return (
                            <MenuItem key={item.id} value={item.id}>{item.answer}</MenuItem>
                        )
                    })
                }
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
            <Button variant="contained" sx={{ width: { sm: "100%", md: "20%" }, mr: 3 }}
                onClick={()=>{set_are_you_sure(true);
                setOperation("DELETE")}}
            >DELETE</Button>
            <Button variant="contained" sx={{ width: { sm: "100%", md: "20%" } }}
                onClick={handleSubmit}
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
            >Update</Button>
        </Toolbar>
    </Stack>
        <Backdrop open={loader}>
            <CircularProgress />
        </Backdrop>
        <Backdrop open={are_you_sure}>
            <Modal
                open={are_you_sure}
                onClose={()=>{set_are_you_sure(false)}}
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
                        Are you sure ?
                    </Typography>
                    <Button variant="contained" fullWidth onClick={deleteQuestion}>
                        {operation}
                    </Button>
                </Box>
            </Modal>
        </Backdrop>
    </Paper>)
}