const express = require('express')
// const { default: SendDraft } = require('../../frontend2/src/pages/SendDraft')
const {createMeeting, getMeetings,getMeeting,
     sendDraft, getUserMeetings, addFeedback, rescheduleMeeting} = require('../controller/meetingController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

router.post('/dashboard',createMeeting)
router.get('/draft',getMeetings)
router.get('/draft/:id',getMeeting)
router.patch('/draft/:id',sendDraft)
router.get('/userhome',getUserMeetings)
router.patch('/feedback/:id',addFeedback)
router.patch('/reschedule/:id',rescheduleMeeting)
module.exports=router