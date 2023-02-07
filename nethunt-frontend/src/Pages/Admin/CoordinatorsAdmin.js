import { AccountCircle, AddAPhotoRounded, MailRounded, PhoneRounded } from "@mui/icons-material"
import { Avatar, Grid, Paper, Typography, Stack, FormControl, InputLabel, Input, InputAdornment, Divider, Box, Container } from "@mui/material"

export default function CoordinatorsAdmin() {
    return (
        <Paper>
            <Grid container padding={3} >
                <Grid item xs={12} padding={2}>
                    <Typography variant="h5">
                        Coordinators
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} padding={2}>
                    <Paper elevation={10} sx={{ padding: 2 ,width:{sm:"100%",md:"60%"}}}>
                        <Stack sx={{ display: "flex", alignItems: "center", }}>
                            <Avatar sx={{ width: { xs: "100px", sm: "200px" }, height: { xs: "100px", sm: "200px" } }} component="label">
                                <AddAPhotoRounded />
                                <input type="file" hidden onChange={(event) => { }} />
                            </Avatar>
                            <FormControl variant="standard">
                                <InputLabel htmlFor="c1name">
                                    Coordinator name
                                </InputLabel>
                                <Input
                                    id="c1name"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <Divider />
                            <Box mt={2}>
                                <Stack>
                                    <Typography variant="h6" align="center" mt={3}>
                                        <Container sx={{ display: "flex", alignItems: "center", gap: 2, fontSize: { xs: "15px", sm: "20px" } }}>
                                            <FormControl variant="standard">
                                                <InputLabel htmlFor="c1email">
                                                    Email
                                                </InputLabel>
                                                <Input
                                                    id="c1email"
                                                    startAdornment={
                                                        <InputAdornment position="start">
                                                            <MailRounded />
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                        </Container>
                                    </Typography>
                                    <Typography variant="h6" align="center" mt={3}>
                                        <Container sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                            <FormControl variant="standard">
                                                <InputLabel htmlFor="c1phone">
                                                    Phone
                                                </InputLabel>
                                                <Input
                                                    id="c1phone"
                                                    startAdornment={
                                                        <InputAdornment position="start">
                                                            <PhoneRounded />
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                        </Container>
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} padding={2}>
                    <Paper elevation={10} sx={{ padding: 2 ,width:{sm:"100%",md:"60%"}}}>
                        <Stack sx={{ display: "flex", alignItems: "center", }}>
                            <Avatar sx={{ width: { xs: "100px", sm: "200px" }, height: { xs: "100px", sm: "200px" } }} component="label">
                                <AddAPhotoRounded />
                                <input type="file" hidden onChange={(event) => { }} />
                            </Avatar>
                            <FormControl variant="standard">
                                <InputLabel htmlFor="c1name">
                                    Coordinator name
                                </InputLabel>
                                <Input
                                    id="c2name"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <Divider />
                            <Box mt={2}>
                                <Stack>
                                    <Typography variant="h6" align="center" mt={3}>
                                        <Container sx={{ display: "flex", alignItems: "center", gap: 2, fontSize: { xs: "15px", sm: "20px" } }}>
                                            <FormControl variant="standard">
                                                <InputLabel htmlFor="c2email">
                                                    Email
                                                </InputLabel>
                                                <Input
                                                    id="c2email"
                                                    startAdornment={
                                                        <InputAdornment position="start">
                                                            <MailRounded />
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                        </Container>
                                    </Typography>
                                    <Typography variant="h6" align="center" mt={3}>
                                        <Container sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                            <FormControl variant="standard">
                                                <InputLabel htmlFor="c2phone">
                                                    Phone
                                                </InputLabel>
                                                <Input
                                                    id="c2phone"
                                                    startAdornment={
                                                        <InputAdornment position="start">
                                                            <PhoneRounded />
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                        </Container>
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </Paper>)
}