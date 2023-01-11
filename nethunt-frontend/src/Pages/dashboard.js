import { Box, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/system";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { AppBarX } from "../Components/AppBarX"
import IconMenu from "../Components/MenuX";
import { SideDrawer } from "../Components/SideDrawer";

export default function Dashboard(props) {
  
  const globalThemeData = useSelector((state) => state.global.theme);
  const theme = createTheme({
    palette: {
      mode: globalThemeData,
    },
  });
  const [anchorEl,setAnchorEl] = useState(null);
  const open = Boolean(anchorEl)
  console.log(globalThemeData);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <AppBarX onAvatarClick={(event)=>{setAnchorEl(event)}}/>
        <SideDrawer />
        <IconMenu anchorEl={anchorEl} setAnchorEl = {setAnchorEl} open={open} onClose={()=>{setAnchorEl(null)}}/>
      </Box>
    </ThemeProvider>
  )
}