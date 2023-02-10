import {Modal} from "@mui/material"
import QuizSettings from "../Pages/Admin/QuizSettings"
export default function QuizInitialConfig(){
    return <Modal open={true}>
        <QuizSettings/>
    </Modal>
}