import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useLogout } from './hooks/useLogout'

const Home = () => {
    // const { user } = useAuthContext()
    const {logout} = useLogout()

    const handleClick = () =>{
      logout()
    }
    return ( 
        <div className='App'>
            <h1>Meeting App</h1>
            <div className='mt-5'>
            <Link to="/createMeeting"><Button v>Create Meeting</Button></Link>
            <Link to="/draft"><Button >Send Draft</Button></Link> <br/>
            <Button className='mt-2'>Send Final Draft</Button>
            <Button  className='mt-2'>Reschedule</Button>
            <Button onClick={handleClick} className='mt-2'>Logout</Button>
            </div>
        </div>
     );
}
 
export default Home;