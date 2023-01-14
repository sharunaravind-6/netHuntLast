import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import DashboardX from './Pages/Dashboard';
import Question from './Pages/Question';
import Help from './Components/Help';
import Home from './Components/Home';
import ScoreBoardX from './Components/Scoreboard';

function App() {
  return (
    <div>
      <Routes>
        <Route path='login' element={<Login />}></Route>
        <Route path="dashboard" element={<DashboardX />}>
          <Route path="" element={<Home />}></Route>
          <Route path="help" element={<Help />}></Route>
          <Route path="scoreboard" element={<ScoreBoardX/>}></Route>
        </Route>
        {/* <Route path="question" element = {<Question/>}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
