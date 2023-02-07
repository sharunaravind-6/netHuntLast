import { AddCircleRounded, ArrowLeftRounded, ArrowRightAltRounded, ArrowRightAltSharp, KeyboardArrowRightRounded } from "@mui/icons-material";
import {Stack, AppBar, Box, Divider, Grid, IconButton, List, ListItem, ListItemButton, ListItemSecondaryAction, ListItemText, Paper, Toolbar, Typography } from "@mui/material";
export default function QuizDisplay() {
    return (<Grid container padding={2}>
        <Grid item xs={12}>
            <Toolbar>
                <Typography variant="h5" flexGrow={1}>
                    Quizes
                </Typography>
                <IconButton>
                    <AddCircleRounded />
                </IconButton>
            </Toolbar>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={10}>
            <Paper elevation={12} sx={{ minHeight: "50vh" }}>
                <List>
                    <ListItemButton>
                        <ListItemText>
                            Sample
                        </ListItemText>
                        <ListItemSecondaryAction>
                            <ListItemButton>
                                <KeyboardArrowRightRounded />
                            </ListItemButton>
                        </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>
                        <ListItemText>
                            Quiz 1
                        </ListItemText>
                        <ListItemSecondaryAction>
                            <ListItemButton>
                                <KeyboardArrowRightRounded />
                            </ListItemButton>
                        </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider />
                </List>
            </Paper>
        </Grid>
        <Grid item xs={1} />

    </Grid>)
}