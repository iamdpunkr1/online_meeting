var nodemailer = require("nodemailer");
const fs = require('fs')
const pdf = require('html-pdf')

const createMeeting=(req,res)=>{

    const user='iamdpunkr@gmail.com'
    const pass='aawgousyjsnetrkn'

    const {meet_id,topic,location,date, time}=req.body
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
          to: "dpunkrgamez@gmail.com",
          subject:  "Meeting on "+topic,
          text: "That was tough!"
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
                res.status(200).json(mapObj)
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
        '{{topic}}':topic,
        '{{date}}': date,
        '{{time}}':time,
        '{{location}}':location
      } 
      
      html=html.replace(/{{meeting_id}}|{{topic}}|{{date}}|{{time}}|{{location}}/gi,(matched)=>{return mapObj[matched]});
      
      pdf.create(html, options).toFile(__dirname + `./meet${meet_id}.pdf`, function(err,resp){
        if(err) return console.log(err)
      
        console.log(resp)
        sendEmail(mapObj);
      
      })
       
}


module.exports={
    createMeeting
}



