import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import {  useNavigate} from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
const Meeting = () => {
  const { user } = useAuthContext()
    const [show, setShow] = useState(false);
    let today = new Date()
    let currDate = today.getFullYear() + '-' + parseInt(today.getMonth() + 1) + '-' + today.getDate();
    var currentTime = today.getHours()+":"+today.getMinutes()+":"+ today.getSeconds();
    // let mapObj={
    // '{{meeting_id}}': meet_id,
    // '{{topic}}':"Exam cancellation",
    // '{{date}}': currDate,
    // '{{time}}':currentTime,
    // '{{location}}':"Gauhati"
    // } 
    const [disabled, setDisabled]=useState(false);
    const [meetings, setMeetings] = useState([]);
    const [date, setDate] = useState(currDate);
    const [topic, setTopic] = useState("");
    const [location, setLocation] = useState("");
    const [time, setTime] = useState(currentTime);
    const navigate=useNavigate()


    const createMeeting= async(e)=>{
        e.preventDefault()
        setDisabled(true)
        let meet_id= (Math.random() + 1).toString(36).substring(2);
        let temp = meetings
        temp.push({meet_id,topic,location,date, time})


        const meeting = {meet_id,topic,location,date, time}

        const response = await fetch('/dashboard', {
          method: 'POST',
          body: JSON.stringify(meeting),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
       
          }
        })
        const json = await response.json()
    
        if (!response.ok) {
          console.log("Error in Creating meeting",json)
        }
        if (response.ok) {
          setShow(true)
          setMeetings(temp)
          console.log(meetings)
          setDate(currDate)
          setLocation("")
          setTime(currentTime)
          setTopic("")
          setDisabled(false)
          setTimeout(()=>{
            navigate('/')
          },2000)
        }

    }


    return ( 
        <div className='App'>

          <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Meeting</strong>
            <small>{time}</small>
          </Toast.Header>
          <Toast.Body>Your meeting was created successfully!</Toast.Body>
        </Toast>

      <div className='form-box'>
      <form className="center-wrap" onSubmit={createMeeting}>
      <h3>Create a Meeting</h3>
      <div className="form-group mt-4">
          <input
          type="text"
          name="Topic"
          onChange={(e)=>{setTopic(e.target.value)}}
          value={topic}
          className="form-style"
          placeholder="Topic"
          id="expenseFor"
          autoComplete="off"
          />
      </div>

      <div className="form-group mt-3">
          <input
          type="text"
          name="Location"
          onChange={(e)=>{setLocation(e.target.value)}}
          value={location}
          className="form-style"
          placeholder="Location"
          id="location"
          autoComplete="off"
          />
      </div>

      
      <div className="form-group mt-3">
      <input
        type="date"
        name="date"
        onChange={(e)=>{setDate(e.target.value)}}
        value={date}
        className="form-style"
 
        id="date"
        autoComplete="off"
        pattern="\d{2}/\d{2}/\d{4}" 
      />
    </div>

    <div className="form-group mt-3">
    <input
      type="time"
      name="time"
      onChange={(e)=>{setTime(e.target.value)}}
      value={time}
      className="form-style"

      id="time"
      autoComplete="off"

    />
  </div>


  <Button type='submit' className={disabled?"btn mt-2 disabled":"btn mt-2 "}>
    Create Meeting
  </Button>

  </form>
      </div>
 

        </div>
     );
}
 
export default Meeting
;