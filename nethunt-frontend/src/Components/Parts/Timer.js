import { Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
const CalanderPaper = ({ children }) => {
    return (<Grid item xs={12} md={3} padding={2}>
        <Paper sx={{ position: "relative", textAlign: "center", minHeight: "10vh", padding: 2 ,}}>
            <Typography sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" ,fontFamily: "'Tourney', cursive;",fontSize:"3rem"}}>
                {children}
            </Typography>
        </Paper>
    </Grid>)
}

export default function Timer(props) {

    const [days, setDays] = useState()
    const [hours, setHours] = useState()
    const [minutes, setMinutes] = useState()
    const [seconds, setSeconds] = useState()
    const djangoDateTime = "2023-02-28T13:45:00Z";
    const countdownDate = new Date(djangoDateTime);

    const timer = setInterval(() => {

        const now = new Date().getTime();
        const distance = countdownDate.getTime() - now;

        if (distance < 0) {
            clearInterval(timer);
            // console.log("Countdown is over!");
        } else {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            // console.log(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            setDays(days)
            setHours(hours)
            setMinutes(minutes)
            setSeconds(seconds)
        }
    }, 1000);
    return (
        <Grid container padding={2}>
            <CalanderPaper>
                {days}
            </CalanderPaper>
            <CalanderPaper>
                {hours}
            </CalanderPaper>
            <CalanderPaper>
                {minutes}
            </CalanderPaper>
            <CalanderPaper>
                {seconds}
            </CalanderPaper>
        </Grid>
    )
}