import { MailRounded, PhoneEnabledRounded } from "@mui/icons-material";
import { Avatar, Card, CardContent, CardHeader, Container, Divider, Grid, Paper, Typography } from "@mui/material";
import { Box, Stack, width } from "@mui/system";
import { useContext } from "react";
import { userContext } from "../Store/user";
import Profile1 from "./../Images/Profile_1.svg";
import Profile2 from "./../Images/Profile_2.svg";
import Profile3 from "./../Images/Profile_3.svg";
import Profile4 from "./../Images/Profile_4.svg";
export default function ProfileX(props) {
    const profileImg = [
        Profile1,
        Profile2,
        Profile3,
        Profile4,
    ]
    const { userDetails } = useContext(userContext)
    return <Paper elevation={10} sx={{ marginTop: 4 }}>
        <Grid container p={2} sx={{ display: "flex", alignItems: "center" }}>
            <Grid item sm={4}>
                <Box textAlign={"center"} sx={{  position: "relative" }}>
                    <img src={profileImg[Math.floor(Math.random()*profileImg.length)]} width="100%" />
                </Box>
            </Grid>
            <Grid item sm={1}/>
            <Grid item sm={4}>
                <Stack>
                    <Card>
                        <CardHeader avatar={<Avatar></Avatar>} title={"Profile"} />
                        <Divider />
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="b">
                                        Name
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>
                                        {userDetails?.user?.first_name + " " + userDetails?.user?.last_name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="b">
                                        College
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>
                                        {userDetails?.college?.collegeName + ", " + userDetails?.college?.collegeCity}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="b">
                                        Email id
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
                                    <MailRounded />
                                    <Box sx={{ overflowx: "wrap", wordBreak: "break-word", marginLeft: 1 }}>
                                        {userDetails?.user?.email}
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="b">
                                        Phone
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
                                    <PhoneEnabledRounded />
                                    <Box sx={{ overflowx: "wrap", wordBreak: "break-word", marginLeft: 1 }}>
                                        +91 {userDetails?.phone}
                                    </Box>
                                </Grid>

                            </Grid>
                        </CardContent>
                    </Card>
                </Stack>
            </Grid>
            <Grid item sm={1}/>
        </Grid>
    </Paper>
}