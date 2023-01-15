import { EmojiObjectsRounded, InfoRounded } from "@mui/icons-material";
import { AppBar, Box, Button, ButtonGroup, IconButton, Modal, Paper, Snackbar, Toolbar, Typography } from "@mui/material";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useRef, useState } from "react";

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
                                snackbarRef.current.enqueueSnackbar('Hint 1',{autoHideDuration:3000});
                            }, 500);
                            snackbarRef.current.enqueueSnackbar('Hint 2',{autoHideDuration:3000});
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
                            p: 4,
                        }}>
                            <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                                Text in a modal
                            </Typography>
                            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                            </Typography>
                        </Box>
                    </Modal>
                </Paper>
            </Toolbar>
        </Box>
    </SnackbarProvider>
}