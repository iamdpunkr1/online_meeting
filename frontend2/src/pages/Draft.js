import Dropdown from 'react-bootstrap/Dropdown';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
const Draft = () => {
    const {user} = useAuthContext()
    const [meetings, setMeetings] = useState(null)
    const [meetDetails, setMeetDetails] = useState(null)
    
    useEffect(()=>{
        const fetchMeetings = async () => {
            const response = await fetch('/draft',{
              headers:{
                'Authorization':`Bearer ${user.token}`
              }
            })
      
            const json = await response.json()
      
            if(response.ok){
              setMeetings(json)
            }
          }
        
      
          if (user) {
            fetchMeetings()
          }
    },[setMeetings,user])

    const handleClick = (mid) =>{
        const meet = meetings.filter(m=>m.meet_id===mid)
        console.log(meet)
        setMeetDetails(meet)
        console.log(meetDetails)
    }

    return ( 
       <div className="App">
        <h3>Create a Draft of Previous Meetings</h3>
            <Dropdown className='mt-3'>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Select Meeting 
                </Dropdown.Toggle>
            
                <Dropdown.Menu>
                    {meetings && meetings.map(meeting=> <Dropdown.Item onClick={()=>handleClick(meeting.meet_id)}>Meet_ID: {meeting.meet_id}</Dropdown.Item>
                    )}
              </Dropdown.Menu>
            </Dropdown>
       </div>
     );
}
 
export default Draft;