import { Grid, Paper, Toolbar, Typography, } from "@mui/material";
import { useEffect, useState } from "react";
import { Accordion } from "./Parts/Accordion";
import { AccordionDetails } from "./Parts/AccordionDetails";
import { AccordionSummary } from "./Parts/AccordionSummary";
import QuizEdit from "./QuizEdit";
export default function QuizDisplay(props) {
    const [quiz, setQuiz] = useState("")
    const handleChange = (panel) => (event, newExpanded) => {
        setQuiz(newExpanded ? panel : false);
    };
    return (<Grid container padding={2}>
        <Grid item xs={12}>
            <Toolbar>
                <Typography variant="h5" flexGrow={1}>
                    Quizes
                </Typography>

            </Toolbar>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={10}>
            <Paper elevation={0}>
                <Accordion expanded={quiz === 'practice'} onChange={handleChange('practice')}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Typography>Practice Quiz</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <QuizEdit/>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={quiz === 'main'} onChange={handleChange('main')}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Typography>Main Quiz</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <QuizEdit/>
                    </AccordionDetails>
                </Accordion>
            </Paper>
        </Grid>
        <Grid item xs={1} />

    </Grid>)
}