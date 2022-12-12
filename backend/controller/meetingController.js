var nodemailer = require("nodemailer");
const fs = require('fs')
const pdf = require('html-pdf')
const Meeting = require('../model/meetingModel')



const createMeeting=async(req,res)=>{
  const {meet_id, agenda, topic,location,date, time}=req.body

  try {
    const user=req.user.email
    const pass=req.user.appPass
    console.log(req.user)
    const user_id = req.user._id
    const meeting = await Meeting.create({meet_id, agenda, topic,location,date, time,user_id})

    const sendEmail=(mapObj)=>{
      var sender = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: user,
          pass: pass
        }
      });

      const pdfName=`meet${meet_id}.pdf`;
      var mail = {
        from: user,
        to: "dpunkrgamez@gmail.com , nissingh589@gmail.com",
        subject:  "Meeting of "+topic,
        text: "Created New Meeting!"
        ,
        attachments: [
              {
                  filename:  pdfName,
                  path: __dirname +  '/'+pdfName,
                  cid:  `uniq-meet${meet_id}.pdf`
              }
          ]
      };
       
      sender.sendMail(mail, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent successfully: "
                       + info.response);
          // delete file named 'sample.txt'
          fs.unlink(__dirname +  `/meet${meet_id}.pdf`, function (err) {
              if (err) throw err;
              // if no error, file has been deleted successfully
              console.log('File deleted!');//program ends here
              // res.status(200).json(mapObj)
              // res.status(200).json(meeting)
          });
        }
      });
    }
    
    let html = fs.readFileSync('./template.html','utf8')
    let options={
      format: 'Letter'
    }
  //   let meetId= Math.floor(Math.random() * 999) + 100;
  //   let today = new Date()
  //   let currDate = today.getFullYear() + '-' + parseInt(today.getMonth() + 1) + '-' + today.getDate();
  //   var current_time = today.getHours()+":"+today.getMinutes()+":"+ today.getSeconds();
    let mapObj={
      '{{meeting_id}}': meet_id,
      '{{agenda}}':agenda,
      '{{topic}}':topic,
      '{{date}}': date,
      '{{time}}':time,
      '{{location}}':location

    } 
    
    html=html.replace(/{{meeting_id}}|{{agenda}}|{{topic}}|{{date}}|{{time}}|{{location}}/gi,(matched)=>{return mapObj[matched]});
    
    pdf.create(html, options).toFile(__dirname + `./meet${meet_id}.pdf`, function(err,resp){
      if(err) return console.log(err)
    
      console.log(resp)
      sendEmail(mapObj);
    
    })

    res.status(200).json(meeting)

  } catch (error) {
    res.status(400).json({error: error.message})
  }


       
}

//get all Meetings
const getMeetings = async(req, res) => {
 const user_id = req.user._id
 try{
   const meetings = await Meeting.find({user_id}).sort({createdAt: -1})
   res.status(200).json(meetings)
 }catch(error){
    res.status(400).json({error:error.message})
 }
}


//get a single Meeting
const getMeeting = async(req, res) => {
  const {id }= req.params
  try{
    const meeting = await Meeting.findOne({meet_id:id})
    res.status(200).json(meeting)
  }catch(error){
     res.status(400).json({error:error.message})
  }
 }
 

 //send Draft
const sendDraft = async(req, res) => {
  const {id }= req.params

  try{
    const { draft} = req.body
    const meeting = await Meeting.updateOne({meet_id:id},
      {
      $set:{draft:draft}
    })

    // const user=req.user.email
    // const pass=req.user.appPass
    // console.log(req.user)


  //   const sendEmail=(mapObj)=>{
  //     var sender = nodemailer.createTransport({
  //       service: 'gmail',
  //       auth: {
  //         user: user,
  //         pass: pass
  //       }
  //     });

  //     const pdfName=`draft${meet_id}.pdf`;
  //     var mail = {
  //       from: user,
  //       to: "dpunkrgamez@gmail.com , nissingh589@gmail.com",
  //       subject:  "Draft of "+topic,
  //       text: "sending decision of the meeting!"
  //       ,
  //       attachments: [
  //             {
  //                 filename:  pdfName,
  //                 path: __dirname +  '/'+pdfName,
  //                 cid:  `uniq-meet${meet_id}.pdf`
  //             }
  //         ]
  //     };
       
  //     sender.sendMail(mail, function(error, info) {
  //       if (error) {
  //         console.log(error);
  //       } else {
  //         console.log("Email sent successfully: "
  //                      + info.response);
  //         // delete file named 'sample.txt'
  //         fs.unlink(__dirname +  `/draft${meet_id}.pdf`, function (err) {
  //             if (err) throw err;
  //             // if no error, file has been deleted successfully
  //             console.log('File deleted!');//program ends here
  //             // res.status(200).json(mapObj)
  //             // res.status(200).json(meeting)
  //         });
  //       }
  //     });
  //   }
    
  //   let html = fs.readFileSync('./draft.html','utf8')
  //   let options={
  //     format: 'Letter'
  //   }
  // //   let meetId= Math.floor(Math.random() * 999) + 100;
  // //   let today = new Date()
  // //   let currDate = today.getFullYear() + '-' + parseInt(today.getMonth() + 1) + '-' + today.getDate();
  // //   var current_time = today.getHours()+":"+today.getMinutes()+":"+ today.getSeconds();
  //   let mapObj={
  //     '{{meeting_id}}': meet_id,
  //     '{{agenda}}':agenda,
  //     '{{topic}}':topic,
  //     '{{date}}': date,
  //     '{{time}}':time,
  //     '{{location}}':location,
  //     '{{decision}}':decision,
  //   } 
    
  //   html=html.replace(/{{meeting_id}}|{{agenda}}|{{topic}}|{{date}}|{{time}}|{{location}}|{{decision}}/gi,(matched)=>{return mapObj[matched]});
    
  //   pdf.create(html, options).toFile(__dirname + `./draft${meet_id}.pdf`, function(err,resp){
  //     if(err) return console.log(err)
    
  //     console.log(resp)
  //     sendEmail(mapObj);
    
  //   })

    res.status(200).json(meeting)
  }catch(error){
     res.status(400).json({error:error.message})
  }
 }
 
 //get all Meetings
const getUserMeetings = async(req, res) => {
  // const user_id = req.user._id
  try{
    const meetings = await Meeting.find()
    res.status(200).json(meetings)
  }catch(error){
     res.status(400).json({error:error.message})
  }
 }


 
//add feedback from users to Meeting
const addFeedback = async(req, res) => {
  const {id }= req.params
  const {email, username}=req.user
  const {feedback} = req.body
  console.log("userHome",feedback)
  try{
    const meeting = await Meeting.updateOne({meet_id:id},{
      $push:{feedbacks:{email, username, msg:feedback}}
    })
    res.status(200).json(meeting)
  }catch(error){
     res.status(400).json({error:error.message})
  }
 }

 //add feedback from users to Meeting
const rescheduleMeeting = async(req, res) => {
  const {id }= req.params

  const {agenda, topic, location, date, time, draft} = req.body

  try{
    const meeting = await Meeting.updateOne({meet_id:id},{
      $set:{agenda, topic, location, date, time, draft}
    })
    res.status(200).json(meeting)
  }catch(error){
     res.status(400).json({error:error.message})
  }
 }
 module.exports={
    createMeeting,
    getMeetings,
    getMeeting,
    sendDraft,
    getUserMeetings,
    addFeedback,
    rescheduleMeeting
}



