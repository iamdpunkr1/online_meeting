import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useLogout } from './hooks/useLogout'
import NavBar from './partials/NavBar';

const Home = () => {
    // const { user } = useAuthContext()
    const {logout} = useLogout()

    const handleClick = () =>{
      logout()
    }
    return ( <>
      <NavBar/>
      <div className='App'>
        
      <h1>Meeting App</h1>
      
      <div className='mt-5'>
      <Link to="/createMeeting"><Button v>Create Meeting</Button></Link>
      <Link to="/draft"><Button >Send Draft</Button></Link> <br/>
      <Link to="/reschedule"><Button >Reschedule</Button></Link> 
      <Link to="/viewfeedbacks"><Button >Feedbacks</Button></Link>
      <Button onClick={handleClick} className='mt-2'>Logout</Button>
      </div>
  </div>
      </>

     );
}
 
export default Home;