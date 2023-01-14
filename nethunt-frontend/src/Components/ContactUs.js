import { HelpRounded } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

export default function ContactUS(props){
    return (
        <IconButton sx={{position:"fixed",bottom:"2px",right:"2px"}}>
            <Tooltip title="help">
                <HelpRounded/>
            </Tooltip>
        </IconButton>
    )
}