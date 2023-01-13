import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import DashboardX from './Pages/Dashboard';
import Question from './Pages/Question';

function App() {
  return (
    <div>
      <Routes>
        <Route path='login' element={<Login/>}></Route>
        <Route path="dashboard" element = {<DashboardX/>}></Route>
        {/* <Route path="question" element = {<Question/>}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
