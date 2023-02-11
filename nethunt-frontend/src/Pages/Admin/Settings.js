import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AccountCircle, AddPhotoAlternateRounded, ChildCareRounded, EventBusyRounded, KeyboardArrowUpRounded, KeyboardDoubleArrowUpRounded, MailRounded, PhoneRounded } from "@mui/icons-material";
import { Avatar, Container, CssBaseline, Divider, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, MenuItem, Select, TextField, ThemeProvider } from '@mui/material';
import { Stack } from '@mui/system';
import { userContext } from '../../Store/user';
import { theme } from '../../Theme/LightTheme';


export default function Settings() {
    const { logout } = React.useContext(userContext)
    const [activeStep, setActiveStep] = React.useState(0);
    const [data, setData] = React.useState({
        eventInfo: {
            event: "",
            year: "",
        },
        eventLogos: {
            event: null,
            nethunt: null,
        },
        coordinators: [
            {
                coordinatorName: null,
                coordinatorEmail: null,
                coordinatorPassword: null,
                coordinatorPhone: null,
                coordinatorImg: null,
            },
            {
                coordinatorName: null,
                coordinatorEmail: null,
                coordinatorPassword: null,
                coordinatorPhone: null,
                coordinatorImg: null,
            }
        ],
        quizScores: {
            easy: null,
            medium: null,
            hard: null,
        },
        quizTimings: {
            startsBy: null,
            endsBy: null
        }
    })
    const previewImageFile = (event, type) => {
        if (type === "event")
            setData((data) => { return { ...data, eventLogos: { ...data["eventLogos"], event: URL.createObjectURL(event.target.files[0]) } } });
        else
            setData((data) => { return { ...data, eventLogos: { ...data["eventLogos"], nethunt: URL.createObjectURL(event.target.files[0]) } } });
    }
    const previewCoordinatorImageFile = (event, type) => {
        console.log("testy")
        if (type === "c1")
            setData(
                (data) => {
                    let coordinators = data.coordinators
                    coordinators[0].coordinatorImg = URL.createObjectURL(event.target.files[0])
                    return {
                        ...data, coordinators: [...coordinators]
                    }
                });
        else
            setData(
                (data) => {
                    let coordinators = data.coordinators
                    coordinators[1].coordinatorImg = URL.createObjectURL(event.target.files[0])
                    return {
                        ...data, coordinators: [...coordinators]
                    }
                });
    }
    const steps = [
        {
            label: 'Event info',
            description: `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`,
            component: (
                <Box>
                    <Stack sx={{ padding: 2, gap: 4 }}>
                        <FormControl fullWidth>
                            <InputLabel id="event-select-label">Event</InputLabel>
                            <Select
                                labelId="event-select-label"
                                id="event-select"
                                value={data.eventInfo.event}
                                label="Event"
                                onChange={(event) => { setData((data) => { return { ...data, eventInfo: { ...data["eventInfo"], event: event.target.value } } }); console.log(event.target.value); }}
                            >
                                <MenuItem value={"Login"}>Login</MenuItem>
                                <MenuItem value={"Thiran"}>Thiran</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="year-select-label">Year</InputLabel>
                            <Select
                                labelId="year-select-label"
                                id="year-select"
                                value={data.eventInfo.year}
                                label="Year"
                                onChange={(event) => { setData((data) => { return { ...data, eventInfo: { ...data["eventInfo"], year: event.target.value } } }); console.log(event.target.value); }}
                            >
                                <MenuItem value={new Date().getFullYear()}>{new Date().getFullYear()}</MenuItem>
                                <MenuItem value={new Date().getFullYear() + 1}>{new Date().getFullYear() + 1}</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </Box>),
            icon: (
                <EventBusyRounded />
            )
        },
        {
            label: 'Event Logos',
            component: (
                <Box>
                        <Container sx={{ display: "flex", alignItems: "center", alignContent: "center", width: "100%", justifyContent: "center", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
                            <Paper elevation={4} sx={{ padding: 3 }}>
                                <Button component="label">
                                    <AddPhotoAlternateRounded />
                                    <Typography>{"NETHUNT"} Logo </Typography>

                                    <input
                                        hidden
                                        type="file"
                                        onChange={(event) => { previewImageFile(event, "nethunt") }}
                                    />
                                </Button>
                                <Box>
                                    <img src={data.eventLogos.nethunt} width="200px" height="auto" />
                                </Box>
                            </Paper>
                            <Paper elevation={4} sx={{ padding: 3 }}>
                                <Button component="label">
                                    <AddPhotoAlternateRounded />
                                    <Typography>{data.eventInfo.event} Logo </Typography>

                                    <input
                                        hidden
                                        type="file"
                                        onChange={(event) => { previewImageFile(event, "event") }}
                                    />
                                </Button>
                                <Box >
                                    <img src={data.eventLogos.event} width="200px" height="auto" />
                                </Box>
                            </Paper>
                        </Container>
                </Box>
            ),
            description:
                'An ad group contains one or more ads which target a shared set of keywords.',
            icon: (
                <EventBusyRounded />
            )
        },
        {
            label: 'Event Coordinator details',
            component: (
                <Grid container padding={3}>
                    <Grid item xs={12} padding={2}>
                        <Typography variant="h5">
                            Coordinators
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} padding={2}>
                        <Paper elevation={10} sx={{ padding: 2 }}>
                            <Stack sx={{ display: "flex", alignItems: "center", }}>
                                <Avatar sx={{ width: { xs: "100px", sm: "200px" }, height: { xs: "100px", sm: "200px" } }} component="label">
                                    {data.coordinators[0].coordinatorImg && <img src={data.coordinators[0].coordinatorImg} width="200px" height="auto" />}
                                    {!data.coordinators[0].coordinatorImg && <AddPhotoAlternateRounded sx={{ width: "100px" }} />}
                                    <input type="file" hidden onChange={(event) => { previewCoordinatorImageFile(event, "c1") }} />
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
                        <Paper elevation={10} sx={{ padding: 2 }}>
                            <Stack sx={{ display: "flex", alignItems: "center", }}>
                                <Avatar sx={{ width: { xs: "100px", sm: "200px" }, height: { xs: "100px", sm: "200px" } }} component="label">
                                    {data.coordinators[1].coordinatorImg && <img src={data.coordinators[1].coordinatorImg} width="200px" height="auto" />}
                                    {!data.coordinators[1].coordinatorImg && <AddPhotoAlternateRounded sx={{ width: "100px" }} />}
                                    <input type="file" hidden onChange={(event) => { previewCoordinatorImageFile(event, "c2") }} />
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
            ),
            description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
            icon: (
                <EventBusyRounded />
            )
        },
        {
            label: 'Quiz Settings',
            component: (
                <Stack sx={{ gap: 3 }}>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="easy">
                            Easy Score
                        </InputLabel>
                        <Input
                            id="easy"
                            type='number'
                            startAdornment={
                                <InputAdornment position="start">
                                    <ChildCareRounded />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="moderate">
                            Moderate Score
                        </InputLabel>
                        <Input
                            id="moderate"
                            type='number'
                            startAdornment={
                                <InputAdornment position="start">
                                    <KeyboardArrowUpRounded />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="hard">
                            Hard Score
                        </InputLabel>
                        <Input
                            type='number'
                            id="hard"
                            startAdornment={
                                <InputAdornment position="start">
                                    <KeyboardDoubleArrowUpRounded />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Stack>
            ),
            description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
            icon: (
                <EventBusyRounded />
            )
        },
        {
            label: 'Quiz timing',
            component: (
                <Stack sx={{ gap: 4 }}>
                    <TextField
                        id="startby"
                        label="Start By"
                        type="datetime-local"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="datetime-local"
                        label="End By"
                        type="datetime-local"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Stack>
            ),
            description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
            icon: (
                <EventBusyRounded />
            )
        },
    ];
    const maxSteps = steps.length;
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Paper sx={{ padding: 4, gap: 3 }}>
                <Stack sx={{gap:4}}>
                    {
                        steps.map(item => {
                            return <Paper sx={{ padding: 2 }} elevation={12}>
                                <Typography variant = {"h5"} component={"p"}>{item.label}</Typography>
                                {item.component}
                            </Paper>
                        })
                    }
                    <Container sx={{ display: "flex", alignItems: "center", alignContent: "center", width: "100%", justifyContent: "center", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
                                <Button color='success' variant="contained">
                                    Save
                                </Button>
                            
                                <Button color="secondary" variant="contained">
                                    Continue
                                </Button>
                            
                        </Container>
                </Stack>
            </Paper>
        </ThemeProvider>
    );
}