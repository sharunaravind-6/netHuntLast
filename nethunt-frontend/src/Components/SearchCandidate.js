import { MailRounded, PhoneRounded, SchoolRounded } from "@mui/icons-material"
import { Avatar, Grid, Paper, Typography, Stack, Divider, Box, Container } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { AdminContext } from "../Store/adminStore"
import StyledBadge from "./Parts/StyledBadge"

export default function SearchCandidate() {
    const { fetchUsers, usrs } = useContext(AdminContext)
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
                <Grid item xs={12} padding={2}>
                    <Typography variant="h5">
                        Candidates
                    </Typography>
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