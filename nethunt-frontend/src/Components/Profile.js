import { MailRounded, PhoneEnabledRounded } from "@mui/icons-material";
import { Avatar, Card, CardContent, CardHeader, Container, Divider, Grid, Paper, Typography } from "@mui/material";
import { Box, Stack, width } from "@mui/system";
import MaleAvatar from "./../Images/MaleAvatar.svg";
export default function ProfileX(props) {
    return <Paper elevation={10} sx={{ marginTop: 4 }}>
        <Grid container p={2} sx={{display:"flex",alignItems:"center"}}>
            <Grid item sm={6}>
                <Box textAlign={"center"} sx={{ width: { sm: "200px", md: "400px" }, position: "relative" }}>
                    <img src={MaleAvatar} width="100%" />
                </Box>
            </Grid>
            <Grid item sm={6}>
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
                                        Sanjay
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="b">
                                        College
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>
                                        PSG TECH
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="b">
                                        Email id
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sx={{display:"flex",alignItems:"center"}}>
                                    <MailRounded/>
                                    <Box  sx={{ overflowx: "wrap",wordBreak:"break-word",marginLeft:1}}>
                                        nethuntlogin2k22@gmail.com
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="b">
                                        Phone
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sx={{display:"flex",alignItems:"center"}}>
                                    <PhoneEnabledRounded/>
                                    <Box  sx={{ overflowx: "wrap",wordBreak:"break-word",marginLeft:1}}>
                                        +91 9677427924
                                    </Box>
                                </Grid>
                                
                            </Grid>
                        </CardContent>
                    </Card>
                </Stack>
            </Grid>
        </Grid>
    </Paper>
}