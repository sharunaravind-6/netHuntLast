import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Autocomplete, Backdrop, CircularProgress, createFilterOptions, Divider, IconButton, List, ListItem, ListItemText, Paper, TextField } from '@mui/material';
import { AddRounded, CircleRounded, DeleteRounded, SearchRounded } from '@mui/icons-material';
import { red } from '@mui/material/colors';
import AddCollege from '../../Components/AddCollege';
import AddCandidate from '../../Components/AddCandidate';
import useAxios from '../../utils/useAxios';
import { AdminContext } from '../../Store/adminStore';
import SearchCandidate from '../../Components/SearchCandidate';
import SuccessSnackbar from '../../Components/Parts/SuccessSnackbar';

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

export default function Candidate() {
    const api = useAxios()
    const { fetchCollege, fetchUsers } = React.useContext(AdminContext)
    React.useEffect(() => {
        fetchCollege()
        fetchUsers()
    }, [])
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [loading,setLoading] = React.useState(false)
    const [success,setSuccess] = React.useState(false)
    const [searchValue, setSearchValue] = React.useState("");
    const handleChange = (event, newValue) => {
        console.log(newValue);
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
                    <Tab label="Delete" {...a11yProps(2)} icon={<DeleteRounded />} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Paper elevation={5} sx={{ marginTop: 3 }}>
                        <SearchCandidate />
                    </Paper>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <AddCandidate onAddingUserLoading={setLoading} onAddingUserSuccess={setSuccess}/>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <Paper elevation={5} sx={{ marginTop: 3 }}>

                    </Paper>
                </TabPanel>
            </SwipeableViews>
            <SuccessSnackbar open={success} onClose={()=>{setSuccess(false)}} message = {"Successfully added the user"}/>
            <Backdrop open={loading}>
                <CircularProgress/>
            </Backdrop>
        </Box>
    );
}
