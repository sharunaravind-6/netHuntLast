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
import { Backdrop, IconButton } from '@mui/material';

const steps = [
  {
    label: 'Event info',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
    component: (<Box>

    </Box>),
    icon: (
      <EventBusyRounded />
    )
  },
  {
    label: 'Event Logos',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
    icon: (
      <EventBusyRounded />
    )
  },
  {
    label: 'Event Coordinator details',
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
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    icon: (
      <EventBusyRounded />
    )
  },
];

export default function QuizSettings() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
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
        <Box sx={{ width: '100%', p: 2 }}>

          {steps[activeStep].description}
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