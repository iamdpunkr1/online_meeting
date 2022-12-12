import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
// import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
// import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout'

const ViewFeedbacks = () => {
    const {user} = useAuthContext()
    const [meetings, setMeetings] = useState(null)
    const [selectMeet,setSelectMeet]= useState(null)
    const [show, setShow] = useState(false);
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
              console.log("from ViewFeedbacks ",json)
              setSelectMeet(json)
              handleShow()
            }
          }
        
      
          if (user) {
              fetchMeeting()
          }

    }

    
    // const handleFeedback=async(e)=>{
    //     console.log("feedback")

    //     e.preventDefault()
    //     if (!user) {
    //       console.log('You must be logged in')
    //       return
    //     }

    //     const feedbacks = {feedback}


    //     const response = await fetch('/feedback/'+selectMeet.meet_id, {
    //       method: 'PATCH',
    //       body: JSON.stringify(feedbacks),
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${user.token}`
       
    //       }
    //     })
    //     const json = await response.json()
    
    //     if (!response.ok) {
    //       console.log("Error in Adding Feedbacks",json)
    //     }
    //     if (response.ok) {
    //         handleClose()
    //         setFeedback("")
    //     }



    // }

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
            <th>View Feedbacks</th>
          </tr>
        </thead>
        <tbody>
        {meetings && meetings.map(m=>
            <tr key={m.meet_id}>
                <td>{m.meet_id}</td>
                <td>{m.agenda}</td>
                <td>{m.topic}</td>
                <td>{m.draft}</td>
                <td><button className="btn" onClick={()=>handleSelect(m.meet_id)}>Check here</button></td>

          </tr>
          )}
        </tbody>
      </Table>
        </div>
    </div>


    {selectMeet && 
<Modal show={show} onHide={handleClose}>
<form >
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
          <Form.Label><strong>Feedbacks by Users:</strong> </Form.Label>
          <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>&nbsp;&nbsp; Feedback &nbsp;&nbsp;</th>
            </tr>
          </thead>
          <tbody>
          {selectMeet && selectMeet.feedbacks.map((m,i)=>
              <tr key={i}>
                  <td>{m.username}</td>
                  <td>{m.msg}</td>
            </tr>
            )}
          </tbody>
        </Table>
        </Form.Group>

    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>

    </Modal.Footer>
    </form>
  </Modal>    }  
        </>
 
     );
}
 
export default ViewFeedbacks;