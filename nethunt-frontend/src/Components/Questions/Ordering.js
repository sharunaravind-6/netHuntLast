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
import { Backdrop, Button, CircularProgress, FormControl, Input, InputAdornment, InputLabel, Modal } from '@mui/material';
import { KeyRounded } from '@mui/icons-material';
import useAxios from '../../utils/useAxios';

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
    const [loader, setLoader] = React.useState(false)
    const [ordering, setOrdering] = React.useState([])
    const [basicOrderingMain, setBasicOrderingMain] = React.useState([])
    const [basicOrderingPractice, setBasicOrderingPractice] = React.useState([])
    const [alumniOrderingMain, setAlumniOrderingMain] = React.useState([])
    const [alumniOrderingPractice, setAlumniOrderingPractice] = React.useState([])
    const [displayQues, setDisplayQues] = React.useState(true)
    const [secretKey, setSecretKey] = React.useState("")
    const [alumni, setAlumni] = React.useState(false)
    const api = useAxios()
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    async function fetchQuestionsOrdering() {
        setLoader(true)
        const response = await api.post("/game/quetion_ordering", {
            password: secretKey,
        })
        setLoader(false)
        console.log(response.data)
        if (response?.data?.correct) {
            if (response?.data?.alumni) {
                setAlumni(true)
                setAlumniOrderingMain(response?.data?.alumniOrderingMain)
                setAlumniOrderingPractice(response?.data?.alumniOrderingPractice)
            }
            setBasicOrderingMain(response?.data?.orderingMain)
            setBasicOrderingPractice(response?.data?.orderingPractice)
            setDisplayQues(false)
            setLoader(true)
            console.log(response.data)
            setOrdering(response?.data?.questions)
            setLoader(false)
        }
        setSecretKey("")
    }
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="General main" {...a11yProps(0)} />
                    <Tab label="General practice" {...a11yProps(1)} />
                    {alumni && <><Tab label="Alumni main" {...a11yProps(2)} />
                        <Tab label="Alumni practice" {...a11yProps(3)} /></>}
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <OrderingDisp ordering={basicOrderingMain} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <OrderingDisp ordering={basicOrderingPractice} />
            </TabPanel>
            {alumni && <><TabPanel value={value} index={2}>
                <OrderingDisp ordering={alumniOrderingMain} />
            </TabPanel>
                <TabPanel value={value} index={3}>
                    <OrderingDisp ordering={alumniOrderingPractice} />
                </TabPanel>
            </>}
            <Backdrop open={displayQues}>
                <Modal
                    open={displayQues}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: "300px", sm: "650px" },
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}>
                        <Typography id="keep-mounted-modal-title" variant="h6" component="h2" sx={{ textAlign: "center" }}>
                            Please type your password to verify your identity.<br />
                        </Typography>
                        {/* <Typography id="keep-mounted-modal-description" sx={{ mt: 2, textAlign: "justify" }}>
                            If so, please note that your progress will be saved and you may resume the quiz at any time.<br />
                            Thank you for taking the quiz.
                        </Typography> */}
                        <FormControl variant="standard" focused fullWidth sx={{ mb: 2, mt: 2 }}>
                            <InputLabel htmlFor="password">
                                Password
                            </InputLabel>
                            <Input
                                id="password"
                                type='password'
                                value={secretKey}
                                onChange={event => {
                                    setSecretKey(event.target.value)
                                }
                                }
                                startAdornment={
                                    <InputAdornment position="start">
                                        <KeyRounded />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <div id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                            <Box sx={{ width: { xs: "250px", sm: "600px" }, position: "relative" }}>
                                {/* <img src={ByeSVG} width="100%" /> */}
                            </Box>
                            <Button fullWidth onClick={fetchQuestionsOrdering} variant="contained">CONTINUE</Button>
                            <Button fullWidth onClick={() => { }}>EXIT</Button>

                        </div>
                    </Box>
                </Modal>
            </Backdrop>
            <Backdrop open={loader}>
                <CircularProgress />
            </Backdrop>
        </Box>
    );
}