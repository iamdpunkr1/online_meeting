import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
// import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
// import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout'

const UserHome = () => {
    const {user} = useAuthContext()
    const [meetings, setMeetings] = useState(null)
    const [selectMeet,setSelectMeet]= useState(null)
    const [show, setShow] = useState(false);
    const [feedback, setFeedback] = useState("");

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
              console.log("from Userhome ",json)
              setSelectMeet(json)
              handleShow()
            }
          }
        
      
          if (user) {
              fetchMeeting()
          }

    }

    
    const handleFeedback=async(e)=>{
        console.log("feedback")

        e.preventDefault()
        if (!user) {
          console.log('You must be logged in')
          return
        }

        const feedbacks = {feedback}


        const response = await fetch('/feedback/'+selectMeet.meet_id, {
          method: 'PATCH',
          body: JSON.stringify(feedbacks),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
       
          }
        })
        const json = await response.json()
    
        if (!response.ok) {
          console.log("Error in Adding Feedbacks",json)
        }
        if (response.ok) {
            handleClose()
            setFeedback("")
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
            <th>Draft</th>
            <th>View Details</th>
          </tr>
        </thead>
        <tbody>
        {meetings && meetings.map(m=>
            <tr key={m.meet_id}>
                <td>{m.meet_id}</td>
                <td>{m.agenda}</td>
                <td>{m.topic}</td>
                <td>{m.draft}</td>
                <td><button className={m.feedbacks.filter(f=>f.email===user.user.email)? "btn disabled":"btn"} onClick={()=>handleSelect(m.meet_id)}>Check here</button></td>

          </tr>
          )}
        </tbody>
      </Table>
        </div>
    </div>


    {selectMeet && 
<Modal show={show} onHide={handleClose}>
<form onSubmit={handleFeedback}>
    <Modal.Header closeButton>
      <Modal.Title>Meet_ID: {selectMeet.meet_id}</Modal.Title>
    </Modal.Header>
    <Modal.Body>

      <strong>Topic:</strong> {selectMeet.topic}<br/>
      <strong>Agenda:</strong> {selectMeet.agenda}<br/>
      <strong>Location:</strong> {selectMeet.location}<br/>
      <strong>Date:</strong> {selectMeet.date} &nbsp; &nbsp;
      <strong>Time:</strong> {selectMeet.time}<br/>
      <strong>Draft:</strong> {selectMeet.draft}
      <br/><br/>
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label><strong>Feedback</strong> </Form.Label>
          <Form.Control as="textarea" value={feedback} onChange={(e)=>setFeedback(e.target.value)} rows={3} />
        </Form.Group>

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
 
export default UserHome;