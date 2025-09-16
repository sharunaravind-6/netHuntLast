import { EmojiObjectsRounded, InfoRounded } from "@mui/icons-material";
import { AppBar, Box, Button, ButtonGroup, IconButton, Modal, Paper, Snackbar, Toolbar, Typography } from "@mui/material";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useRef, useState } from "react";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';


export default function QuestionFooter(props) {
    const [openModal, setOpenModal] = useState(false);
    const snackbarRef = useRef();
    return <SnackbarProvider maxSnack={2} ref={snackbarRef}>
        <Box sx={{ position: "absolute", bottom: "0px", right: "0px", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Paper >
                    <ButtonGroup>
                        <Button onClick={() => {
                            setTimeout(() => {
                                snackbarRef.current.enqueueSnackbar("Hint 1 " + props.hint1,{autoHideDuration:3000});
                            }, 500);
                            snackbarRef.current.enqueueSnackbar("Hint 2 " +props.hint2,{autoHideDuration:3000});
                        }}><EmojiObjectsRounded /></Button>
                        <Button onClick={() => { setOpenModal(true) }}><InfoRounded /></Button>
                    </ButtonGroup>
                    <Modal
                        keepMounted
                        open={openModal}
                        onClose={() => setOpenModal(false)}
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
                            p: 3,
                            overflow: 'hidden', 
                        }}>
                            <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                                INFORMATION
                            </Typography>
                            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                                A picture conveys multiple things that words can neither express nor explain. Depictions can sometimes be deceptive, too. Are you someone with eagle eyes, critiquing every critical detail? If yes is your answer, we throw you a challenge. It is not a challenge that makes you think, but one that twists every strand of neurons in your head. Are you ready? Here you go!
                            </Typography>
                            <Typography id="keep-mounted-modal-description" sx={{ mt: 2,mb:3 }}>
                                RULES
                            </Typography>
                            <div
                                style={{
                                maxHeight: '300px', // Set a max height for the list container
                                overflow: 'auto', // Add a scrollbar when content overflows
                                }}
                            >
                                <List
                                    sx={{
                                        width: '100%',
                                        maxWidth: 360,
                                        bgcolor: 'background.paper',
                                        position: 'relative',
                                    }}
                                    >
                                    <ListItem>
                                        <ListItemText primary="1. Guess the computer related technical term from the image displayed." />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="2. Answers are to be entered in the textbox provided."/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="3. The answers should or will not contain any special characters (, + * / < > - $ &)." />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="4. Ignore the space between the words in the answer." />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="5. Example: 'Net-Hunt' must be entered as 'nethunt', The number '1' must be entered as 'one'." />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="6. Clues will be provided for every image after a few tries or hits." />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="7. Scores will be reduced according to your hit count for every image." />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="8. The first clue appears after 50 hits." />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="9. A second clue appears after 100 hits." />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="10. Internet resources can be used." />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="11. In case of a tie, the winner will be selected based on the number of tries." />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="12. In a leaderboard, if both leading teams are from the same college, then only one team will be considered as winner which is selected based on tries." />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="13. Any form of malpractice will lead to disqualification. Organizers have all the rights to disqualify anyone without any prior notice." />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="14. Selection will be made after verification of the student's credentials. Students with invalid credentials will be disqualified." />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="15. Winners will be announced after verification on LOGIN 2K23." />
                                    </ListItem>
                                </List>
                            </div>
                        </Box>
                    </Modal>
                </Paper>
            </Toolbar>
        </Box>
    </SnackbarProvider>
}