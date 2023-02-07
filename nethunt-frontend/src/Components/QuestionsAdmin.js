import { AddCircleRounded, ArrowLeftRounded, ArrowRightAltRounded, ArrowRightAltSharp, EmojiObjectsRounded, ExpandMoreRounded, KeyboardArrowRightRounded, SpeedRounded } from "@mui/icons-material";
import { Stack, AppBar, Box, Divider, Grid, IconButton, List, ListItem, ListItemButton, ListItemSecondaryAction, ListItemText, Paper, Toolbar, Typography, Accordion, AccordionSummary, AccordionDetails, FormControl, InputLabel, Input, InputAdornment } from "@mui/material";
import { useEffect } from "react";
import SampleImage from "./../Images/QuestionSample.svg"
export default function QuestionAdmin(props) {
    useEffect(() => {
        console.log("Quiz Disp")
    }, [])
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
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreRounded />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Answer 1</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container padding={3}>
                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{ position: "relative" }}>
                                            <img src={SampleImage} width="100%" />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Stack padding={2} sx={{ gap: 3 }}>
                                            <FormControl>
                                                <InputLabel htmlFor="hint1">
                                                    Hint 1
                                                </InputLabel>
                                                <Input
                                                    id="hint1"
                                                    fullWidth
                                                    disabled
                                                    defaultValue={"Sample hint2"}
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
                                                    disabled
                                                    defaultValue={"Sample hint2"}
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
                                                    defaultValue={"Easy"}
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
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreRounded />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Answer 2</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container padding={3}>
                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{ position: "relative" }}>
                                            <img src={SampleImage} width="100%" />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Stack padding={2} sx={{ gap: 3 }}>
                                            <FormControl>
                                                <InputLabel htmlFor="hint1">
                                                    Hint 1
                                                </InputLabel>
                                                <Input
                                                    id="hint1"
                                                    fullWidth
                                                    disabled
                                                    defaultValue={"Sample hint2"}
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
                                                    disabled
                                                    defaultValue={"Sample hint2"}
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
                                                    defaultValue={"Easy"}
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
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreRounded />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Answer 3</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container padding={3}>
                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{ position: "relative" }}>
                                            <img src={SampleImage} width="100%" />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Stack padding={2} sx={{ gap: 3 }}>
                                            <FormControl>
                                                <InputLabel htmlFor="hint1">
                                                    Hint 1
                                                </InputLabel>
                                                <Input
                                                    id="hint1"
                                                    fullWidth
                                                    disabled
                                                    defaultValue={"Sample hint2"}
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
                                                    disabled
                                                    defaultValue={"Sample hint2"}
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
                                                    defaultValue={"Easy"}
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
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreRounded />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Answer 4</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container padding={3}>
                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{ position: "relative" }}>
                                            <img src={SampleImage} width="100%" />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Stack padding={2} sx={{ gap: 3 }}>
                                            <FormControl>
                                                <InputLabel htmlFor="hint1">
                                                    Hint 1
                                                </InputLabel>
                                                <Input
                                                    id="hint1"
                                                    fullWidth
                                                    disabled
                                                    defaultValue={"Sample hint2"}
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
                                                    disabled
                                                    defaultValue={"Sample hint2"}
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
                                                    defaultValue={"Easy"}
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
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreRounded />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Answer 5</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container padding={3}>
                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{ position: "relative" }}>
                                            <img src={SampleImage} width="100%" />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Stack padding={2} sx={{ gap: 3 }}>
                                            <FormControl>
                                                <InputLabel htmlFor="hint1">
                                                    Hint 1
                                                </InputLabel>
                                                <Input
                                                    id="hint1"
                                                    fullWidth
                                                    disabled
                                                    defaultValue={"Sample hint2"}
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
                                                    disabled
                                                    defaultValue={"Sample hint2"}
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
                                                    defaultValue={"Easy"}
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
                        </Accordion>
                    </Paper>
                </Grid>
                <Grid item xs={1} />

            </Grid>
        </Paper>)
}