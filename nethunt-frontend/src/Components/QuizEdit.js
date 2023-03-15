import { AddCircleRounded, DeleteRounded, EditRounded, EmojiObjectsRounded, KeyboardArrowRightRounded, Visibility } from "@mui/icons-material";
import { Stack, Divider, Grid, IconButton, List, ListItem, ListItemButton, ListItemSecondaryAction, ListItemText, Paper, Toolbar, Typography, FormControl, InputLabel, Input, InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function QuizEdit(props) {
    const navigate = useNavigate()
    // console.log(props.quiz)
    return (
        <Stack sx={{ gap: 3 }}>
            <Paper>
                <Grid container>
                    <Grid item xs={12}>
                        <Toolbar>
                            <Typography variant="h5" flexGrow={1}>
                                Hints Settings
                            </Typography>
                            <IconButton>
                                <EditRounded />
                            </IconButton>
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
                                        disabled
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
                                        disabled
                                        defaultValue={100}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <EmojiObjectsRounded />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Stack>
                        </Paper>
                    </Grid>
                    <Grid item xs={1} />
                </Grid>
                <Divider />
                <Toolbar>
                    <Typography variant="h5" flexGrow={1}>
                        Questions
                    </Typography>
                    <IconButton onClick={() => {
                        // console.log(props.quiz === "Main" ? "main" : "practice")
                        // console.log(navigate.name)
                        navigate("../"+String(props.quiz === "Main" ? "main" : "practice"))
                        // navigate("./../"+ props.quiz === "Main"?"main":"practice" )
                    }
                    }
                    >
                        <Visibility />
                    </IconButton>
                </Toolbar>
            </Paper>
        </Stack>
    )
}