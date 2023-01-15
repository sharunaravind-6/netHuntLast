import { EmojiObjectsRounded, InfoRounded } from "@mui/icons-material";
import { AppBar, Box, Button, ButtonGroup, IconButton, Modal, Paper, Toolbar } from "@mui/material";

export default function QuestionFooter(props) {
    return <Box sx={{position:"absolute",bottom:"0px",right:"0px",zIndex:(theme)=>theme.zIndex.drawer+1}}>
        <Toolbar>
            <Paper >
                <ButtonGroup>
                    <Button><EmojiObjectsRounded/></Button>
                    <Button><InfoRounded/></Button>
                </ButtonGroup>
                <Modal>

                </Modal>
            </Paper>
        </Toolbar>
    </Box>
}