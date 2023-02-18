import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Autocomplete, createFilterOptions, Divider, IconButton, List, ListItem, ListItemText, Paper, TextField } from '@mui/material';
import { AddRounded, DeleteRounded, EditRounded, ModeEdit, SearchRounded } from '@mui/icons-material';
import { red } from '@mui/material/colors';
import { CoordinatorContext } from '../Store/coordinatorStore';


export default function ViewCollege() {
    const { colleges, fetchCollege } = React.useContext(CoordinatorContext)
    React.useEffect(
        ()=>{
            if(colleges.length == 0){
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
