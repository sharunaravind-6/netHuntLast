import { CssBaseline } from "@mui/material";
import { createTheme } from "@mui/system";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { AppBarX } from "../Components/AppBarX"

export default function Dashboard(props){
    const globalThemeData = useSelector((state)=>state.global.theme);
    const theme = createTheme({
        palette: {
          mode: globalThemeData,
        },
      });
    console.log(globalThemeData);
    return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
        <AppBarX/>
    </ThemeProvider>
    )
}