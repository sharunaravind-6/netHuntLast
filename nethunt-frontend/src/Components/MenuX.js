import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentPaste from '@mui/icons-material/ContentPaste';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { createTheme, CssBaseline, Menu, ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';

export default function IconMenu({ anchorEl, open, onClose }) {
    const globalThemeData = useSelector((state) => state.global.theme);
    const theme = createTheme({
        palette: {
            mode: globalThemeData,
        },
    });
    // console.log(anchorEl);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Paper sx={{ width: 320, maxWidth: '100%' }}>
                <Menu open={open} anchorEl={anchorEl} onClose={onClose}>
                    <MenuList>
                        <MenuItem>
                            <ListItemIcon>
                                <AccountCircleIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Profile</ListItemText>

                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <SettingsIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Settings</ListItemText>

                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <LogoutRoundedIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Logout</ListItemText>

                        </MenuItem>

                    </MenuList>
                </Menu>
            </Paper>
        </ThemeProvider>
    );
}