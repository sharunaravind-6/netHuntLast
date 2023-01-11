import { AppBar, Box, Button, createTheme, IconButton, styled, ThemeProvider, Toolbar, Typography } from "@mui/material";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Avatar } from "antd";
import { useSelector } from "react-redux";


function stringAvatar(name) {
  return {
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export function AppBarX(props) {
  const globalThemeData = useSelector((state) => state.global.theme);
  const theme = createTheme({
    palette: {
      mode: globalThemeData,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" size="large" edge="start" sx={{ mr: 10 }}>
              <MenuRoundedIcon />
            </IconButton>
            <Typography component="div" variant="h6" sx={{ flexGrow: 1 }}>N E T H U N T</Typography>
            <IconButton onClick={(event) => { props.onAvatarClick(event.currentTarget) }}>
              <Avatar {...stringAvatar('Sanjay Prakash')} />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );

}