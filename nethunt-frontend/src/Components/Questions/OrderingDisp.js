import { EditRounded, EmojiObjectsRounded, FormatListNumbered, Numbers } from "@mui/icons-material";
import { Avatar, Backdrop, Box, Button, Divider, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, MenuItem, Modal, Paper, Select, Stack, Toolbar, Typography, } from "@mui/material";
import { useEffect, useState } from "react";
import { Accordion } from "./../Parts/Accordion";
import { AccordionDetails } from "./../Parts/AccordionDetails";
import { AccordionSummary } from "./../Parts/AccordionSummary";
import QuizEdit from "./../QuizEdit";

function OrderingModal(props) {
    return (
        <Stack sx={{ gap: 3 }}>
            <Paper>
                <Grid container>
                    <Grid item xs={12}>
                        <Toolbar>
                            <Typography variant="h5" flexGrow={1}>
                                Update question order
                            </Typography>
                        </Toolbar>
                    </Grid>
                    <Grid item xs={1} />

                    <Grid item xs={10}>
                        <Paper elevation={12}>
                            <Stack padding={2} sx={{ gap: 3 }}>
                                <FormControl>
                                    <InputLabel htmlFor="qno">
                                        Assign question at
                                    </InputLabel>
                                    <Input
                                        id="qno"
                                        type='number'
                                        fullWidth
                                        disabled
                                        value={props.id === null?"":props.id}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <FormatListNumbered />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel id="ques-select-label">Question</InputLabel>
                                    <Select
                                        labelId="ques-select-label"
                                        id="ques-select"
                                        label="Question"
                                    >
                                        <MenuItem value={"Login"}>Login</MenuItem>
                                        <MenuItem value={"Thiran"}>Thiran</MenuItem>
                                    </Select>
                                </FormControl>
                                <Button startIcon={<EditRounded />} variant="outlined" onClick={()=>{props.set_are_you_sure(true)}}>
                                    Update
                                </Button>
                            </Stack>
                        </Paper>
                    </Grid>
                    <Grid item xs={1} />
                </Grid>
                <Divider />
            </Paper>
        </Stack>
    )
}
export default function OrderingDisp(props) {
    const [quiz, setQuiz] = useState("")
    const [edit, setEdit] = useState({
        allowed: false,
        id: null,
    })
    const [are_you_sure, set_are_you_sure] = useState(false)
    const handleChange = (panel) => (event, newExpanded) => {
        setQuiz(newExpanded ? panel : false);
    };
    return (<Grid container padding={2}>
        <Grid item xs={12}>
            <Toolbar>
                <Typography variant="h5" flexGrow={1}>
                    Questions Ordering
                </Typography>

            </Toolbar>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={10}>
            <Paper elevation={12}>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <Avatar>1</Avatar>
                        </ListItemIcon>
                        <ListItemText>
                            <FormControl fullWidth>
                                <InputLabel id="question-select-label">Event</InputLabel>
                                <Select
                                    labelId="question-select-label"
                                    id="question-select"
                                    label="Question"
                                    disabled
                                >
                                    <MenuItem value={"Login"}>Login</MenuItem>
                                    <MenuItem value={"Thiran"}>Thiran</MenuItem>
                                </Select>
                            </FormControl>
                        </ListItemText>
                        <ListItemSecondaryAction>
                            <IconButton onClick={() => {
                                setEdit({
                                    allowed: true,
                                    id: 1
                                })
                            }}>
                                <EditRounded />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </Paper>
        </Grid>
        <Grid item xs={1} />
        <Modal keepMounted open={edit.allowed}
            closeAfterTransition
            onClose={() => { setEdit({ allowed: false, id: null }) }}
        >
            <Paper sx={{
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
                <OrderingModal id={edit.id} set_are_you_sure={set_are_you_sure}/>
            </Paper>
        </Modal>
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
                    <Button variant="contained" fullWidth onClick={() => { }}>
                        UPDATE
                    </Button>
                </Box>
            </Modal>
        </Backdrop>
    </Grid>)
}