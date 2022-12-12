import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
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

    const [disabled, setDisabled]=useState(false);
    const [meetings, setMeetings] = useState([]);
    const [date, setDate] = useState(currDate);
    const [topic, setTopic] = useState("");
    const [location, setLocation] = useState("");
    const [time, setTime] = useState(currentTime);
    const [agenda, setAgenda] = useState("");
    const [error, setError] = useState(null)
    const navigate=useNavigate()


    const createMeeting= async(e)=>{
        e.preventDefault()
        if (!user) {
          setError('You must be logged in')
          return
        }
        setDisabled(true)
        let meet_id= (Math.random() + 1).toString(36).substring(2);
        let temp = meetings
        temp.push({meet_id, agenda, topic,location,date, time})


        const meeting = {meet_id, agenda, topic, location, date, time}

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
        {error && <div className="error">{error}</div>}

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
      <h3 className='mb-3'>Create a Meeting</h3>
      <div className="form-group ">
      <input
          type="text"
          name="Agenda"
          onChange={(e)=>{setAgenda(e.target.value)}}
          value={agenda}
          className="form-style"
          placeholder="Agenda"
          id="agenda"
          autoComplete="off"
      />
    </div>

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

      <Row>
      <Col>

      </Col>

      <Col>

      </Col>
  </Row>
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