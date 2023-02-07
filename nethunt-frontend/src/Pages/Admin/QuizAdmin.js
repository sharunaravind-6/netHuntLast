import { Paper } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function QuizAdmin(props) {
    return (
        <Paper>
            <Outlet/>
        </Paper>
    )
}