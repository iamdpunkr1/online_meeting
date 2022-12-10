const express = require('express')
const {createMeeting, getMeetings} = require('../controller/meetingController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

router.post('/dashboard',createMeeting)
router.get('/draft',getMeetings)

module.exports=router