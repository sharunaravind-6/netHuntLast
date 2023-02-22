import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Autocomplete, createFilterOptions, Divider, IconButton, List, ListItem, ListItemText, Paper, TextField, Typography } from '@mui/material';
import { AddRounded, DeleteRounded, EditRounded, ModeEdit, SearchRounded } from '@mui/icons-material';
import { red } from '@mui/material/colors';
import { CoordinatorContext } from '../Store/coordinatorStore';
import CollegeSVG from "../Images/College.svg"

export default function ViewCollege() {
    const { colleges, fetchCollege } = React.useContext(CoordinatorContext)
    React.useEffect(
        () => {
            if (colleges.length == 0) {
                fetchCollege()
            }
        }
    )
    const theme = useTheme();

    return (
        <Box sx={{
            bgcolor: 'background.paper',
            width: "auto"
        }}>
            <Paper elevation={5} sx={{ marginTop: 3 }}>
                <Box sx={{display:"flex",alignContent:"center",alignItems:"center",justifyContent:"center",flexDirection:{"md":"row","xs":"column"}}}>
                    <img src={CollegeSVG} width="250px"/>
                    <Typography sx={{fontFamily: "'Tourney', cursive;",fontSize:"3rem"}}>
                        College List
                    </Typography>
                </Box>
                <List dense>
                    {colleges.map(item => {
                        return (<React.Fragment key={item.id}>
                            <ListItem>
                                <ListItemText
                                    primary={item.collegeName}
                                    secondary={item.collegeCity}
                                />
                            </ListItem>
                            <Divider />
                        </React.Fragment>)
                    })}
                </List>
            </Paper>
        </Box>
    );
}
