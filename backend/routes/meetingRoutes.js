const express = require('express')
const {createMeeting} = require('../controller/meetingController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// router.get('/dashboard/draft',getMeetings)

router.post('/dashboard',createMeeting)

// router.post('/dashboard/draft',sendDraft)



module.exports=router