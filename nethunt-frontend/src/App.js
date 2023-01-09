import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import SignUp from './Pages/Signup';
import Quiz from './Pages/Quiz';
import Question from './Pages/Question';


function App() {
  return (
    <div>
      <Routes>
        <Route path='login' element={<Login/>}></Route>
        <Route path="signup" element={<SignUp/>}/>
        <Route path="quiz" element={<Quiz/>}/>
        <Route path='question' element={<Question/>}/>
      </Routes>
    
    </div>
  );
}

export default App;
