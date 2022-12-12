import Home from './Home';
import Meeting from './pages/Meeting';
import Draft from './pages/Draft';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Login from './pages/Login'
import Signup from './pages/Signup'
import SignupUser from './pages/SignupUser';
import UserHome from './pages/UserHome';
import { useAuthContext } from './hooks/useAuthContext';
import SendDraft from './pages/SendDraft';
import ViewFeedbacks from './pages/ViewFeedbacks';
import Reschedule from './pages/Reschedule';

function App() {
  const {user} = useAuthContext()

  return (
    <BrowserRouter>
    <Routes>
 
        <Route path='/dashboard' element={ user ? user.user.user_type === "admin" && <Home/>: <Navigate to="/" />}/>
        <Route path='/userhome' element={ user ? user.user.user_type === "user" && <UserHome />: <Navigate to="/" />}/>
        <Route path='/' element={ !user ? <Login/>  : user.user.user_type === "admin"? <Navigate to="/dashboard" />:<Navigate to="/userhome" />}/>
        <Route path='/signupAdmin' element={ !user ? <Signup/> : user.user.user_type === "admin"? <Navigate to="/dashboard" />:<Navigate to="/userhome" />}/>
        <Route path='/signupUser' element={ !user ? <SignupUser/> : user.user.user_type === "admin"? <Navigate to="/dashboard" />:<Navigate to="/userhome" />}/>
        <Route path='/createMeeting' element={<Meeting/>}/>
        <Route path='/draft' element={<Draft/>}/>
        <Route path='/draft/:id' element={<SendDraft/>}/>
        <Route path='/viewfeedbacks' element={<ViewFeedbacks/>}/>
        <Route path='/reschedule' element={<Reschedule/>}/>

    </Routes>
  </BrowserRouter>

  );
}

export default App;
