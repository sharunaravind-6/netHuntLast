import { EditRounded, EmojiObjectsRounded } from "@mui/icons-material";
import { Button, Divider, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, Modal, Paper, Stack, Toolbar, Typography, } from "@mui/material";
import { useEffect, useState } from "react";
import { Accordion } from "./../Parts/Accordion";
import { AccordionDetails } from "./../Parts/AccordionDetails";
import { AccordionSummary } from "./../Parts/AccordionSummary";
import QuizEdit from "./../QuizEdit";

function QuizEditUpdate(props) {
    return (
        <Stack sx={{ gap: 3 }}>
            <Paper>
                <Grid container>
                    <Grid item xs={12}>
                        <Toolbar>
                            <Typography variant="h5" flexGrow={1}>
                                Hints Settings
                            </Typography>
                        </Toolbar>
                    </Grid>
                    <Grid item xs={1} />

                    <Grid item xs={10}>
                        <Paper elevation={12}>
                            <Stack padding={2} sx={{ gap: 3 }}>
                                <FormControl>
                                    <InputLabel htmlFor="hint1">
                                        Hint 1 reveals at
                                    </InputLabel>
                                    <Input
                                        id="hint1"
                                        type='number'
                                        fullWidth
                                        
                                        defaultValue={50}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <EmojiObjectsRounded />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <FormControl>
                                    <InputLabel htmlFor="hint2">
                                        Hint 2 reveals at
                                    </InputLabel>
                                    <Input
                                        id="hint2"
                                        type='number'
                                        fullWidth
                                        
                                        defaultValue={100}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <EmojiObjectsRounded />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <Button startIcon={<EditRounded />} variant="outlined">
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
        <Grid item xs={12}>

        </Grid>
        <Grid item xs={1} />
        <Grid item xs={10}>
            <Paper elevation={0}>
                <Accordion expanded={quiz === 'practice'} onChange={handleChange('practice')}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Typography>Practice Quiz</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <QuizEdit quiz="Practice"/>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={quiz === 'main'} onChange={handleChange('main')}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Typography>Main Quiz</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <QuizEdit quiz="Main"/>
                    </AccordionDetails>
                </Accordion>
            </Paper>
        </Grid>
        <Grid item xs={1} />
        <Modal keepMounted open={false}
            closeAfterTransition
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
                <QuizEditUpdate />
            </Paper>

        </Modal>
    </Grid>)
}