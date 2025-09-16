import * as React from 'react';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { AccountCircle, AddPhotoAlternateRounded, ChildCareRounded, EventBusyRounded, KeyboardArrowUpRounded, KeyboardDoubleArrowUpRounded, KeyRounded, MailRounded, PhoneRounded } from "@mui/icons-material";
import { Avatar, Backdrop, Container, CssBaseline, Divider, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, LinearProgress, MenuItem, Select, TextField, ThemeProvider } from '@mui/material';
import { Stack } from '@mui/system';
import { userContext } from '../../Store/user';
import { theme } from '../../Theme/LightTheme';
import useAxios from "./../../utils/useAxios";
import { useNavigate } from 'react-router-dom';

export default function QuizSettings() {
  const [loading,setLoading] = React.useState(false)
  const { logout } = React.useContext(userContext)
  const [activeStep, setActiveStep] = React.useState(0);
  const [imageUrls, setImageUrls] = React.useState({
    event: null,
    nethunt: null,
    coordinatorImg1: null,
    coordinatorImg2: null
  })
  const [data, setData] = React.useState({
    eventInfo: {
      event: "",
      year: "",
      commonMailId: "",
    },
    eventLogos: {
      event: null,
      nethunt: null,
    },
    coordinators: [
      {
        coordinatorFirstName: "",
        coordinatorLastName: "",
        coordinatorEmail: "",
        coordinatorPassword: "",
        coordinatorPhone: "",
        coordinatorImg: null,
      },
      {
        coordinatorFirstName: "",
        coordinatorLastName: "",
        coordinatorEmail: "",
        coordinatorPassword: "",
        coordinatorPhone: "",
        coordinatorImg: null,
      }
    ],
    quizScores: {
      easy: "",
      medium: "",
      hard: "",
    },
    quizTimings: {
      startsBy: new Date(),
      endsBy: new Date()
    }
  })
  const previewImageFile = (event, type) => {
    if (type === "event") {
      setData((data) => { return { ...data, eventLogos: { ...data["eventLogos"], event: event.target.files[0] } } });
      setImageUrls((data) => { return { ...data, event: URL.createObjectURL(event.target.files[0]) } })
    }
    else {
      setData((data) => { return { ...data, eventLogos: { ...data["eventLogos"], nethunt: event.target.files[0] } } });
      setImageUrls((data) => { return { ...data, nethunt: URL.createObjectURL(event.target.files[0]) } })
    }
  }
  const previewCoordinatorImageFile = (event, type) => {
    // console.log("testy")
    if (type === "c1") {
      setData(
        (data) => {
          let coordinators = data.coordinators
          coordinators[0].coordinatorImg = event.target.files[0]
          return {
            ...data, coordinators: [...coordinators]
          }
        });
      setImageUrls((data) => { return { ...data, coordinatorImg1: URL.createObjectURL(event.target.files[0]) } })
    }
    else {
      setData(
        (data) => {
          let coordinators = data.coordinators
          coordinators[1].coordinatorImg = event.target.files[0]
          return {
            ...data, coordinators: [...coordinators]
          }
        });
      setImageUrls((data) => { return { ...data, coordinatorImg2: URL.createObjectURL(event.target.files[0]) } })
    }
  }
  const steps = [
    {
      label: 'Event info',
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
                onChange={(event) => {
                  setData((data) => {
                    return { ...data, eventInfo: { ...data["eventInfo"], event: event.target.value } }
                  });
                  // console.log(event.target.value);
                }}
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
                onChange={(event) => { setData((data) => { return { ...data, eventInfo: { ...data["eventInfo"], year: event.target.value } } }); }}
              >
                <MenuItem value={new Date().getFullYear()}>{new Date().getFullYear()}</MenuItem>
                <MenuItem value={new Date().getFullYear() + 1}>{new Date().getFullYear() + 1}</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard">
              <InputLabel htmlFor="mailId">
                Common mail id
              </InputLabel>
              <Input
                id="mailId"
                value={data.eventInfo.commonMailId}
                onChange={event => {
                  setData((data) => { return { ...data, eventInfo: { ...data["eventInfo"], commonMailId: event.target.value } } });
                }
                }
                startAdornment={
                  <InputAdornment position="start">
                    <MailRounded />
                  </InputAdornment>
                }
              />
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
          <Paper sx={{ padding: 3 }}>
            <Container sx={{ display: "flex", alignItems: "center", alignContent: "center", width: "100%", justifyContent: "center", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
              <Paper elevation={16} sx={{ padding: 3 }}>
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
                  <img src={imageUrls.nethunt} width="200px" height="auto" />
                </Box>
              </Paper>
              <Paper elevation={16} sx={{ padding: 3 }}>
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
                  <img src={imageUrls.event} width="200px" height="auto" />
                </Box>
              </Paper>
            </Container>
          </Paper>
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
                  {data.coordinators[0].coordinatorImg && <img src={imageUrls.coordinatorImg1} width="200px" height="auto" />}
                  {!data.coordinators[0].coordinatorImg && <AddPhotoAlternateRounded sx={{ width: "100px" }} />}
                  <input type="file" hidden onChange={(event) => { previewCoordinatorImageFile(event, "c1") }} />
                </Avatar>
                <FormControl variant="standard">
                  <InputLabel htmlFor="c1fname">
                    First name
                  </InputLabel>
                  <Input
                    id="c1fname"
                    value={data.coordinators[0].coordinatorFirstName}
                    onChange={event => {
                      setData(
                        (data) => {
                          let coordinators = data.coordinators
                          coordinators[0].coordinatorFirstName = event.target.value
                          return {
                            ...data, coordinators: [...coordinators]
                          }
                        })
                    }
                    }

                  />
                </FormControl>
                <Divider />
                <FormControl variant="standard">
                  <InputLabel htmlFor="c1lname">
                    Last name
                  </InputLabel>
                  <Input
                    id="c1lname"
                    value={data.coordinators[0].coordinatorLastName}
                    onChange={event => {
                      setData(
                        (data) => {
                          let coordinators = data.coordinators
                          coordinators[0].coordinatorLastName = event.target.value
                          return {
                            ...data, coordinators: [...coordinators]
                          }
                        })
                    }
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
                            value={data.coordinators[0].coordinatorEmail}
                            onChange={event => {
                              setData(
                                (data) => {
                                  let coordinators = data.coordinators
                                  coordinators[0].coordinatorEmail = event.target.value
                                  return {
                                    ...data, coordinators: [...coordinators]
                                  }
                                })
                            }
                            }
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
                      <Container sx={{ display: "flex", alignItems: "center", gap: 2, fontSize: { xs: "15px", sm: "20px" } }}>
                        <FormControl variant="standard">
                          <InputLabel htmlFor="c1password">
                            password
                          </InputLabel>
                          <Input
                            id="c1password"
                            type='password'
                            value={data.coordinators[0].coordinatorPassword}
                            onChange={event => {
                              setData(
                                (data) => {
                                  let coordinators = data.coordinators
                                  coordinators[0].coordinatorPassword = event.target.value
                                  return {
                                    ...data, coordinators: [...coordinators]
                                  }
                                })
                            }
                            }
                            startAdornment={
                              <InputAdornment position="start">
                                <KeyRounded />
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
                            value={data.coordinators[0].coordinatorPhone}
                            type="number"
                            onChange={event => {
                              setData(
                                (data) => {
                                  let coordinators = data.coordinators
                                  coordinators[0].coordinatorPhone = event.target.value
                                  return {
                                    ...data, coordinators: [...coordinators]
                                  }
                                })
                            }
                            }
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
                  {data.coordinators[1].coordinatorImg && <img src={imageUrls.coordinatorImg2} width="200px" height="auto" />}
                  {!data.coordinators[1].coordinatorImg && <AddPhotoAlternateRounded sx={{ width: "100px" }} />}
                  <input type="file" hidden onChange={(event) => { previewCoordinatorImageFile(event, "c2") }} />
                </Avatar>
                <FormControl variant="standard">
                  <InputLabel htmlFor="c2fname">
                    First name
                  </InputLabel>
                  <Input
                    id="c2fname"
                    value={data.coordinators[1].coordinatorFirstName}
                    onChange={event => {
                      setData(
                        (data) => {
                          let coordinators = data.coordinators
                          coordinators[1].coordinatorFirstName = event.target.value
                          return {
                            ...data, coordinators: [...coordinators]
                          }
                        })
                    }
                    }

                  />
                </FormControl>
                <Divider />
                <FormControl variant="standard">
                  <InputLabel htmlFor="c2lname">
                    Last name
                  </InputLabel>
                  <Input
                    id="c2lname"
                    value={data.coordinators[1].coordinatorLastName}
                    onChange={event => {
                      setData(
                        (data) => {
                          let coordinators = data.coordinators
                          coordinators[1].coordinatorLastName = event.target.value
                          return {
                            ...data, coordinators: [...coordinators]
                          }
                        })
                    }
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
                            value={data.coordinators[1].coordinatorEmail}
                            onChange={event => {
                              setData(
                                (data) => {
                                  let coordinators = data.coordinators
                                  coordinators[1].coordinatorEmail = event.target.value
                                  return {
                                    ...data, coordinators: [...coordinators]
                                  }
                                })
                            }
                            }
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
                      <Container sx={{ display: "flex", alignItems: "center", gap: 2, fontSize: { xs: "15px", sm: "20px" } }}>
                        <FormControl variant="standard">
                          <InputLabel htmlFor="c2password">
                            password
                          </InputLabel>
                          <Input
                            id="c2password"
                            type='password'
                            value={data.coordinators[1].coordinatorPassword}
                            onChange={event => {
                              setData(
                                (data) => {
                                  let coordinators = data.coordinators
                                  coordinators[1].coordinatorPassword = event.target.value
                                  return {
                                    ...data, coordinators: [...coordinators]
                                  }
                                })
                            }
                            }
                            startAdornment={
                              <InputAdornment position="start">
                                <KeyRounded />
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
                            type='number'
                            value={data.coordinators[1].coordinatorPhone}
                            onChange={event => {
                              setData(
                                (data) => {
                                  let coordinators = data.coordinators
                                  coordinators[1].coordinatorPhone = event.target.value
                                  return {
                                    ...data, coordinators: [...coordinators]
                                  }
                                })
                            }
                            }
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
              value={data.quizScores.easy}
              onChange={event => {
                setData(
                  (data) => {
                    return {
                      ...data,
                      quizScores: {
                        ...data.quizScores,
                        easy: event.target.value,
                      }
                    }
                  })
              }
              }
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
              value={data.quizScores.medium}
              onChange={event => {
                setData(
                  (data) => {
                    return {
                      ...data,
                      quizScores: {
                        ...data.quizScores,
                        medium: event.target.value,
                      }
                    }
                  })
              }
              }
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
              value={data.quizScores.hard}
              onChange={event => {
                setData(
                  (data) => {
                    return {
                      ...data,
                      quizScores: {
                        ...data.quizScores,
                        hard: event.target.value,
                      }
                    }
                  })
              }
              }
              startAdornment={
                <InputAdornment position="start">
                  <KeyboardDoubleArrowUpRounded />
                </InputAdornment>
              }
            />
          </FormControl>
        </Stack>
      ),
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
            value={data.quizTimings.startsBy}
            onChange={event => {
              setData(
                (data) => {
                  return {
                    ...data,
                    quizTimings: {
                      ...data.quizTimings,
                      startsBy: event.target.value,
                    }
                  }
                })
            }
            }
          />
          <TextField
            id="datetime-local"
            label="End By"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            value={data.quizTimings.endsBy}
            onChange={event => {
              setData(
                (data) => {
                  return {
                    ...data,
                    quizTimings: {
                      ...data.quizTimings,
                      endsBy: event.target.value,
                    }
                  }
                })
            }
            }
          />
        </Stack>
      ),
      icon: (
        <EventBusyRounded />
      )
    },
  ];
  const api = useAxios()
  const maxSteps = steps.length;
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const navigate = useNavigate()
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleSumbit = async () => {
    setLoading(true);
    const form = new FormData()
    const files = [
      data.eventLogos.event,
      data.eventLogos.nethunt,
      data.coordinators[0].coordinatorImg,
      data.coordinators[1].coordinatorImg,
    ]
    // console.log(data)
    form.append("event", files[0])
    form.append("nethunt", files[1])
    form.append("coordinator1", files[2])
    form.append("coordinator2", files[3])
    form.append('data', JSON.stringify(data));
    const response = await api.post("/game/set_config", form, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: data
    })
    if (response.data?.configured) {
      navigate("/a/dashboard")
    }
    setLoading(false)
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Backdrop open={loading} sx={{ zIndex: 10 }}>
        <LinearProgress />
      </Backdrop>
      <Grid container>
        <Grid item xs={0} sm={0} md={3} />
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{
            width: "100%",
            marginTop: { "sm": 0, "md": 15 },
          }}>
            <Paper
              square
              elevation={12}
              sx={{
                display: 'flex',
                alignItems: 'center',
                textAlign: "center",
                width: "100%",
                bgcolor: 'background.default',
              }}
            >
              <Typography flexGrow={1} >{steps[activeStep].label}</Typography>
              <IconButton>{steps[activeStep].icon}</IconButton>
              <Button onClick={logout}>Cancel</Button>
            </Paper>
            <Paper sx={{
              minHeight: { "sm": "90vh", "md": "50vh" }, p: 2
            }}>
              {steps[activeStep].component}
            </Paper>
            <MobileStepper
              sx={{
                width: "100%",
              }}
              variant="dots"
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <>
                  {activeStep === maxSteps - 1 ? (
                    <Button
                      size="small"
                      onClick={handleSumbit}
                      disabled={
                        !(
                          data.eventInfo.event !== "" &&
                          data.eventInfo.event !== null &&
                          data.eventInfo.year !== "" &&
                          data.eventInfo.year !== null &&
                          data.eventInfo.commonMailId !== "" &&
                          data.eventInfo.commonMailId !== null &&

                          data.eventLogos.event !== "" &&
                          data.eventLogos.event !== null &&
                          data.eventLogos.nethunt !== "" &&
                          data.eventLogos.nethunt !== null &&


                          data.coordinators[0].coordinatorFirstName !== "" &&
                          data.coordinators[0].coordinatorFirstName !== null &&
                          data.coordinators[0].coordinatorLastName !== "" &&
                          data.coordinators[0].coordinatorLastName !== null &&
                          data.coordinators[0].coordinatorEmail !== "" &&
                          data.coordinators[0].coordinatorEmail !== null &&
                          data.coordinators[0].coordinatorPassword !== "" &&
                          data.coordinators[0].coordinatorPassword !== null &&
                          data.coordinators[0].coordinatorPhone !== "" &&
                          data.coordinators[0].coordinatorPhone !== null &&
                          data.coordinators[0].coordinatorImg !== "" &&
                          data.coordinators[0].coordinatorImg !== null &&

                          data.coordinators[1].coordinatorFirstName !== "" &&
                          data.coordinators[1].coordinatorFirstName !== null &&
                          data.coordinators[1].coordinatorLastName !== "" &&
                          data.coordinators[1].coordinatorLastName !== null &&
                          data.coordinators[1].coordinatorEmail !== "" &&
                          data.coordinators[1].coordinatorEmail !== null &&
                          data.coordinators[1].coordinatorPassword !== "" &&
                          data.coordinators[1].coordinatorPassword !== null &&
                          data.coordinators[1].coordinatorPhone !== "" &&
                          data.coordinators[1].coordinatorPhone !== null &&
                          data.coordinators[1].coordinatorImg !== "" &&
                          data.coordinators[1].coordinatorImg !== null &&

                          data.quizScores.easy !== "" &&
                          data.quizScores.easy !== null &&
                          data.quizScores.medium !== "" &&
                          data.quizScores.medium !== null &&
                          data.quizScores.hard !== "" &&
                          data.quizScores.hard !== null &&

                          data.quizTimings.startsBy !== "" &&
                          data.quizTimings.startsBy !== null &&
                          data.quizTimings.endsBy !== "" &&
                          data.quizTimings.endsBy !== null
                        )
                      }
                    >
                      Finish
                      {theme.direction === 'rtl' ? (
                        <KeyboardArrowLeft />
                      ) : (
                        <KeyboardArrowRight />
                      )}
                    </Button>
                  ) : (
                    <Button
                      size="small"
                      onClick={handleNext}
                    >
                      Next
                      {theme.direction === 'rtl' ? (
                        <KeyboardArrowLeft />
                      ) : (
                        <KeyboardArrowRight />
                      )}
                    </Button>
                  )}
                </>
              }
              backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
          </Box>
        </Grid>
        <Grid item xs={0} sm={0} md={3} />
      </Grid>
    </ThemeProvider>
  );
}