import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import QuizDisplay from '../../Components/QuizDisplay';
import AddQuestion from '../../Components/Parts/AddQuestion';
import EditQuestion from '../../Components/Parts/EditQuestion';
import OrderingDisp from './OrderingDisp';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
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
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function OrderingQuestions() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="General main" {...a11yProps(0)} />
                    <Tab label="General practice" {...a11yProps(1)} />
                    <Tab label="Alumni main" {...a11yProps(2)} />
                    <Tab label="Alumni practice" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <OrderingDisp />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <AddQuestion />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <OrderingDisp />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <AddQuestion />
            </TabPanel>
        </Box>
    );
}