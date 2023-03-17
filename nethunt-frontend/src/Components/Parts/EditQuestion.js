import { AddPhotoAlternateRounded, ContactSupportOutlined, EmojiObjectsRounded, QuestionAnswerOutlined, QuizRounded, SpeedRounded } from "@mui/icons-material";
import { Backdrop, Box, Button, CircularProgress, FormControl, Grid, Input, InputAdornment, InputLabel, MenuItem, Modal, Paper, Select, Stack, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import useAxios from "./../../utils/useAxios"
import SuccessSnackbar from "./SuccessSnackbar";
export default function EditQuestion() {
    const [question, setQuestion] = useState({
        quiz: "",
        img: null,
        answer: "",
        ques: "",
        hint1: "",
        hint2: "",
        difficultyLevel: "",
    })
    const [success,setSuccess] = useState(false)
    const [loader, setLoader] = useState(false)
    const [are_you_sure, set_are_you_sure] = useState(false)
    const api = useAxios()
    const [questions, setQuestions] = useState([])
    const [operation, setOperation] = useState("")
    const [message,setMessage] = useState("")
    const fetchQuizQuestions = async (quiz) => {
        const response = await api.post("/game/disp_q_update", { quiz: quiz })
        setQuestions(response?.data?.questions)
    }
    const updateQuestion = async () => {
        setLoader(true)
        let data = {};
        for (let key in question) {
            if (question[key] !== "" && question[key] !== null) {
                data[key] = question[key]
            }
        }
        console.log(data)
        const response = await api.post("/game/update_ques", { ...data })
        console.log(response?.data)
        setLoader(false)
        set_are_you_sure(false)
        if(response?.data?.updated){
            setMessage("Question successfully updated")
            setSuccess(true)
        }
    }
    const deleteQuestion = async () => {
        setLoader(true)
        const response = await api.post("/game/delete_ques", { questionId: question.ques })
        console.log(response?.data)
        if(response?.data?.deleted){
            setMessage("Question successfully deleted")
            setSuccess(true)
            fetchQuizQuestions(question.quiz)
        }
        setLoader(false)
        set_are_you_sure(false)
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
            <Button variant="contained"
                disabled={question.ques === null}
                sx={{ width: { sm: "100%", md: "20%" }, mr: 3 }}
                onClick={() => {
                    set_are_you_sure(true);
                    setOperation("DELETE")
                }}
            >DELETE</Button>
            <Button variant="contained" sx={{ width: { sm: "100%", md: "20%" } }}
                disabled={question.ques === null}
                onClick={() => {
                    set_are_you_sure(true);
                    setOperation("UPDATE")
                }}
            >Update</Button>
            {/* <Button onClick={()=>{setSuccess(true)}}>Test</Button> */}
        </Toolbar>
    </Stack>
        <Backdrop open={loader}>
            <CircularProgress />
        </Backdrop>
        <Backdrop open={are_you_sure}>
            <Modal
                open={are_you_sure}
                onClose={() => { set_are_you_sure(false) }}
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
                    <Button variant="contained" fullWidth onClick={() => {
                        console.log()
                        if (operation === "DELETE"){
                            deleteQuestion()
                        }if (operation === "UPDATE"){
                            updateQuestion()
                        }
                    }
                    }
                    >
                        {operation}
                    </Button>
                </Box>
            </Modal>
        </Backdrop>
        {/* <Button onClick={setSuccess(true)}>Test</Button> */}
        <SuccessSnackbar open={success} onClose={()=>{setSuccess(false)}} message = {message}/>
    </Paper>)
}