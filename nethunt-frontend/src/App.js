import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import DashboardX from './Pages/Dashboard';
import Question from './Components/Question';
import Help from './Components/Help';
import Home from './Components/Home';
import ScoreBoardX from './Components/Scoreboard';
import ProfileX from './Components/Profile';
import Questions from './Pages/Questions';
import "./App.css";
import { UserContextProvider } from './Store/user';
import AdminMain from './Pages/Admin/AdminMain';
import AdminHome from './Components/AdminHome';
import College from './Pages/Admin/College';
import Candidate from './Pages/Admin/Candidate';
import QuizSettings from './Pages/Admin/QuizSettings';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  return (
    <div>
      <UserContextProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Routes>
            <Route path='login' element={<Login />}></Route>
            <Route path="s" element={<DashboardX />}>
              <Route path="dashboard" element={<Home />}></Route>
              <Route path="help" element={<Help />}></Route>
              <Route path="scoreboard" element={<ScoreBoardX />}></Route>
              <Route path="profile" element={<ProfileX />}></Route>
            </Route>
            <Route path="q" element={<Questions />}>
              <Route path="" element={<Question />}></Route>
            </Route>
            <Route path="a" element={<AdminMain />}>
              <Route path="" element={<AdminHome />}></Route>
              <Route path="college" element={<College />}></Route>
              <Route path="qsettings" element={<QuizSettings />}></Route>
              <Route path="usr" element={<Candidate />}></Route>
            </Route>
            {/* <Route path="question" element = {<Question/>}></Route> */}
          </Routes>
        </LocalizationProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
