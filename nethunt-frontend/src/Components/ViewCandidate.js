import { MailRounded, PhoneRounded, SchoolRounded } from "@mui/icons-material"
import { Avatar, Grid, Paper, Typography, Stack, Divider, Box, Container } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { CoordinatorContext } from "../Store/coordinatorStore"
import StyledBadge from "./Parts/StyledBadge"
import StudentSVG from "./../Images/Students.svg"
export default function ViewCandidates() {
    const { fetchUsers, usrs } = useContext(CoordinatorContext)
    const [loading, setLoading] = useState(true)
    useEffect(
        () => {
            if (loading) {
                fetchUsers();
            }
            setLoading(false);
        },
        [loading]
    )
    return (
        <Paper>
            <Grid container padding={3} >
                <Grid item xs={12} sm={12} md={12}>
                <Box sx={{display:"flex",alignContent:"center",alignItems:"center",justifyContent:"center",flexDirection:{"md":"row","xs":"column"}}}>
                    <img src={StudentSVG} width="250px"/>
                    <Typography sx={{fontFamily: "'Tourney', cursive;",fontSize:"2rem"}}>
                        Participants List
                    </Typography>
                </Box>
                </Grid>
                {
                    usrs.map(
                        (item) => {
                            return (<Grid item xs={12} sm={6} md={4}  padding={1} key={item.id}>
                                <Paper elevation={10} sx={{ padding: 3 }}>
                                    <Stack sx={{ display: "flex", alignItems: "center", }}>
                                        <StyledBadge
                                            color={item.status === "online" ? "green" : "false"}
                                        >
                                            <Avatar sx={{ width: { xs: "100px", sm: "200px" }, height: { xs: "100px", sm: "200px" } }} >
                                                {item.user.first_name[0] + item.user.last_name[0]}
                                            </Avatar>
                                        </StyledBadge>
                                        <Typography>
                                            {item.user.first_name + " " + item.user.last_name}
                                        </Typography>
                                        <Divider />
                                        <Box mt={2}>
                                            <Stack>
                                                <Typography variant="h6" align="center" mt={3}>
                                                    <Container sx={{ display: "flex", alignItems: "center", gap: 2 }}><SchoolRounded/>
                                                        {item.college.collegeName}
                                                    </Container>
                                                </Typography>
                                                <Typography variant="h6" align="center" mt={3}>
                                                    <Container sx={{ display: "flex", alignItems: "center", gap: 2, fontSize: { xs: "15px", sm: "20px" } }}><MailRounded />
                                                        {item.user.email}
                                                    </Container>
                                                </Typography>
                                                <Typography variant="h6" align="center" mt={3}>
                                                    <Container sx={{ display: "flex", alignItems: "center", gap: 2 }}><PhoneRounded />
                                                        +91 {" " + String(item.phone)}
                                                    </Container>
                                                </Typography>
                                            </Stack>
                                        </Box>
                                    </Stack>
                                </Paper>
                            </Grid>)
                        }
                    )
                }
            </Grid>
        </Paper>)
}