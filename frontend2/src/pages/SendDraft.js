
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import Toast from 'react-bootstrap/Toast';

const SendDraft = () => {
    const { user } = useAuthContext()
    let { id } = useParams();
    const [meetData,setMeetData] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [draft,setDraft] = useState("")
    const [show, setShow] = useState(false);
    const navigate=useNavigate()

    useEffect(()=>{
        const fetchMeeting = async () => {
          const response = await fetch('/draft/'+id,{
            headers:{
              'Authorization':`Bearer ${user.token}`
            }
          })
    
          const json = await response.json()
    
          if(response.ok){
            console.log("from MeetData ",json)
            setMeetData(json)
          }
        }
      
    
        if (user) {
            fetchMeeting()
        }
        // setGroupData(groups.filter(group=>group._id===id))
      },[id,user])





      const handleSubmit= async(e)=>{
        e.preventDefault()
        if (!user) {
          setError('You must be logged in')
          return
        }
        setIsLoading(true)

        const meeting = {draft:draft}


        const response = await fetch('/draft/'+id, {
          method: 'PATCH',
          body: JSON.stringify(meeting),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
       
          }
        })
        const json = await response.json()
    
        if (!response.ok) {
          console.log("Error in creating Draft",json)
        }
        if (response.ok) {
            setShow(true)
            setIsLoading(false)
            setTimeout(()=>{
            navigate('/')
          },2000)
        }

    }

    return ( 
        <>
        <div className="container">
        
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
        <Toast.Header>
          <img
            src="holder.js/20x20?text=%20"
            className="rounded me-2"
            alt=""
          />
          <strong className="me-auto">Meeting</strong>
          <small></small>
        </Toast.Header>
        <Toast.Body>Your draft was sent successfully!</Toast.Body>
      </Toast>
        {meetData && 
            <div className="form-box">
            <form className="center-wrap" onSubmit={handleSubmit}>
                    <div className="section text-center">
                    <h4 className="mb-4 pb-3">Meet_ID: "{meetData.meet_id}"<br/> {meetData.topic}</h4>
                    
                    <div className="form-group">
                      <input
                        type="text"
                        name="text"
                        className="form-style"
                        placeholder="Your Decision"
                        id="draft"
                        autoComplete="off"
                        value={draft}
                        onChange={(e)=>{setDraft(e.target.value)}}
                        required
                      />
                      </div>

                    <button className={isLoading?"btn mt-4 disabled":"btn mt-4"}>
                      Send Draft
                    </button>
                    {error && <div className="error">{error}</div>}

                  </div>
              </form>
            </div>
         }
        </div>
        </>
     );
}
 
export default SendDraft;