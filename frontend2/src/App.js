import Home from './Home';
import Meeting from './pages/Meeting';
import Draft from './pages/Draft';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const {user} = useAuthContext()
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/dashboard' element={ user ? <Home /> : <Navigate to="/" />}/>
        <Route path='/' element={ !user ? <Login/>  : <Navigate to="/dashboard" />}/>
        <Route path='/signup' element={ !user ? <Signup/> : <Navigate to="/dashboard" />}/>
        <Route path='/createMeeting' element={<Meeting/>}/>
        <Route path='/draft' element={<Draft/>}/>
    </Routes>
  </BrowserRouter>

  );
}

export default App;
