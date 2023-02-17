import { styled } from "@mui/material";

import MuiAccordion from '@mui/material/Accordion';
export const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={10} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));