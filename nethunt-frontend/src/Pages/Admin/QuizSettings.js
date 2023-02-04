import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { EventBusyRounded } from "@mui/icons-material";
import { Avatar, Backdrop, Container, FormControl, Grid, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import { YearPicker } from '@mui/x-date-pickers';
import { Stack } from '@mui/system';


export default function QuizSettings() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [data, setData] = React.useState({
    eventInfo: {
      event: "",
      year: "",
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
          <Paper>
            <Container sx={{ display: "flex", alignItems: "center" ,alignContent:"center",width:"100%",justifyContent:"center",gap:4,flexDirection:{sm:"column",md:"row"}}}>
              <Avatar
                variant="contained"
                component="label"
                sx={{ width: 300, height: 300 }}
              >
                <Typography>Nethunt Logo</Typography>
                <input
                  type="file"
                  hidden
                />
              </Avatar>

              <Avatar
                variant="contained"
                component="label"
                sx={{ width: 300, height: 300 }}
              >
                <Typography>{data.eventInfo.event} Logo </Typography>
                <input
                  type="file"
                  hidden
                />
              </Avatar>
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
        <Box>
          Test
        </Box>
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
        <Box>
          Test
        </Box>
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
        <Box>
          Test
        </Box>
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
    <Backdrop open={true} >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}>
        <Paper
          square
          elevation={12}
          sx={{
            display: 'flex',
            alignItems: 'center',
            textAlign: "center",
            pl: 2,
            width: "100%",
            bgcolor: 'background.default',
          }}
        >
          <Typography flexGrow={1} >{steps[activeStep].label}</Typography>
          <IconButton>{steps[activeStep].icon}</IconButton>
        </Paper>
        <Box sx={{ minWidth: { sm: "100vw", md: '50vw' }, minHeight: "50vh", p: 2 }}>

          {steps[activeStep].component}
        </Box>
        <MobileStepper
          sx={{ width: "100%" }}
          variant="dots"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
            >
              {activeStep === maxSteps - 1 ? "Finish" : "Next"}
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
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
    </Backdrop>
  );
}