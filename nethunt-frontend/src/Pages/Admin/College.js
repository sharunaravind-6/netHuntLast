import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Autocomplete, createFilterOptions, Divider, IconButton, List, ListItem, ListItemText, Paper, TextField } from '@mui/material';
import { AddRounded, DeleteRounded, EditRounded, ModeEdit, SearchRounded } from '@mui/icons-material';
import { red } from '@mui/material/colors';
import AddCollege from '../../Components/AddCollege';
import { userContext } from '../../Store/user';
import { serverHost } from '../../utils/server';
import { Container } from '@mui/material';
import useAxios from '../../utils/useAxios';
import axios from 'axios';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}
const filter = createFilterOptions();

export default function College() {
    const api = useAxios()
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const { token } = React.useContext(userContext)
    const [searchValue, setSearchValue] = React.useState("");
    const [colleges, setColleges] = React.useState([])
    async function fetchCollege() {
        let response = await api.get( "/user/college")
        if (response.data) {
            let collegeZ = await response.data
            console.log(collegeZ)
            setColleges(() => { return collegeZ })
            return collegeZ
        }
    }
    React.useEffect(() => {
        const temp = fetchCollege()
    }, [])
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <Box sx={{
            bgcolor: 'background.paper',
            width: "auto"
        }}>
            <AppBar position="static" sx={{
            }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Search" {...a11yProps(0)} icon={<SearchRounded />} />
                    <Tab label="Add" {...a11yProps(1)} icon={<AddRounded />} />
                    <Tab label="Edit" {...a11yProps(2)} icon={<EditRounded />} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Autocomplete
                        value={searchValue}
                        onChange={(event, newValue) => {
                            if (typeof newValue === 'string') {
                                setSearchValue({
                                    title: newValue,
                                });
                            } else if (newValue && newValue.inputValue) {
                                // Create a new value from the user input
                                setSearchValue({
                                    title: newValue.inputValue,
                                });
                            } else {
                                setSearchValue(newValue);
                            }
                        }}
                        filterOptions={(options, params) => {
                            const filtered = filter(options, params);

                            const { inputValue } = params;
                            // Suggest the creation of a new value
                            const isExisting = options.some((option) => inputValue === option.title);
                            if (inputValue !== '' && !isExisting) {
                                filtered.push({
                                    inputValue,
                                    title: `Add "${inputValue}"`,
                                });
                            }

                            return filtered;
                        }}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        id="free-solo-with-text-demo"
                        options={colleges}
                        getOptionLabel={(option) => {
                            // Value selected with enter, right from the input
                            if (typeof option === 'string') {
                                return option;
                            }
                            // Add "xxx" option created dynamically
                            if (option.inputValue) {
                                return option.inputValue;
                            }
                            // Regular option
                            return option.collegeName;
                        }}
                        renderOption={(props, option) => <li {...props}>{option.collegeName}</li>}
                        sx={{ width: "auto" }}
                        freeSolo
                        renderInput={(params) => (
                            <TextField {...params} label="Search College" />
                        )}
                    />

                    <Paper elevation={5} sx={{ marginTop: 3 }}>
                        <List dense>
                            {colleges.map(item => {
                                return (<React.Fragment key={item.collegeName}>
                                    <ListItem >
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
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <AddCollege />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <Paper elevation={5} sx={{ marginTop: 3 }}>
                        <List dense>
                            {colleges.map(item => {
                                return (<React.Fragment key={item.id}>
                                    <ListItem
                                        secondaryAction={
                                            <Box edge="end">
                                                <IconButton  >
                                                    <ModeEdit color={red[100]} />
                                                </IconButton>
                                                <IconButton >
                                                    <DeleteRounded color={red[100]} />
                                                </IconButton>
                                            </Box>
                                        }
                                    >
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
                </TabPanel>
            </SwipeableViews>
        </Box>
    );
}
