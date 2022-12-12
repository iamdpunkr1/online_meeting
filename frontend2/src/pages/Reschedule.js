import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
// import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
// import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout'

const Reschedule = () => {
    const {user} = useAuthContext()
    const [meetings, setMeetings] = useState(null)
    const [selectMeet,setSelectMeet]= useState(null)
    const [show, setShow] = useState(false);


    // const [disabled, setDisabled]=useState(false);
    const [date, setDate] = useState("");
    const [topic, setTopic] = useState("");
    const [location, setLocation] = useState("");
    const [time, setTime] = useState("");
    const [agenda, setAgenda] = useState("");
    const [draft, setDraft] = useState("");
    // const [error, setError] = useState(null)
    // const navigate=useNavigate()
    // const [feedback, setFeedback] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const { user } = useAuthContext()
    const {logout} = useLogout()

    const handleClick = () =>{
      logout()
    }

    const handleSelect=(id)=>{
        const fetchMeeting = async () => {
            const response = await fetch('/draft/'+id,{
              headers:{
                'Authorization':`Bearer ${user.token}`
              }
            })
      
            const json = await response.json()
      
            if(response.ok){
              console.log("from Reschedule ",json)
              setSelectMeet(json)
              setAgenda(json.agenda)
              setDate(json.date)
              setLocation(json.location)
              setTime(json.time)
              setTopic(json.topic)
              setDraft(json.draft)
              handleShow()
            }
          }
        
      
          if (user) {
              fetchMeeting()
          }

    }

    
    const handleSubmit=async(e)=>{


        e.preventDefault()
        if (!user) {
          console.log('You must be logged in')
          return
        }

        const reschedule = {agenda, topic, location, date, time}


        const response = await fetch('/reschedule/'+selectMeet.meet_id, {
          method: 'PATCH',
          body: JSON.stringify(reschedule),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
       
          }
        })
        const json = await response.json()
    
        if (!response.ok) {
          console.log("Error in Updating Meetings",json)
        }
        if (response.ok) {
            handleClose()
            setAgenda("")
            setDate("")
            setLocation("")
            setTime("")
            setTopic("")
            setDraft("")
        }



    }

    useEffect(()=>{
        const fetchMeetings = async () => {
            const response = await fetch('/userhome',{
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
    },[user])
    return ( 
        <>
        <div className='container mt-5'>

        <h1>Meeting App</h1> <Button onClick={handleClick} className='mt-2'>Logout</Button>
        
        <div className='mt-5'>

        <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Meet_ID</th>
            <th>Agenda</th>
            <th>Topic</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
            <th colSpan={2}>Draft</th>
         
          </tr>
        </thead>
        <tbody>
        {meetings && meetings.map(m=>
            <tr key={m.meet_id}>
                <td>{m.meet_id}</td>
                <td>{m.agenda}</td>
                <td>{m.topic}</td>
                <td>{m.location}</td>
                <td>{m.date}</td>
                <td>{m.time}</td>
                <td>{m.draft}</td>
                <td><button className="btn" onClick={()=>handleSelect(m.meet_id)}>Reschedule</button></td>

          </tr>
          )}
        </tbody>
      </Table>
        </div>
    </div>


    {selectMeet && 
<Modal show={show} onHide={handleClose}>
<form onSubmit={handleSubmit}>
    <Modal.Header closeButton>
      <Modal.Title>Meet_ID: {selectMeet.meet_id}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
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

            <div className="form-group mt-3">
            <input
                type="text"
                name="draft"
                onChange={(e)=>{setDraft(e.target.value)}}
                value={draft}
                className="form-style"

                id="draft"
                autoComplete="off"

            />
            </div>


    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <button type="submit" className='btn btn-primary' >
        Save Changes
      </button>
    </Modal.Footer>
    </form>
  </Modal>    }  
        </>
 
     );
}
 
export default Reschedule;