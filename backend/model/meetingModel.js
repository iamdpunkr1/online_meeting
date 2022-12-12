const mongoose = require("mongoose");
const  meetingSchema = new mongoose.Schema(
  {
    meet_id: {
      type: String,
      required:true
    },
    agenda: {
      type: String,
      required: true,
    },
   topic: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required:true
    },
    time: {
      type: String,
      required:true
    },
    location: {
      type: String,
      required:true
    },
    draft:{
      type:String,
    },
    feedbacks:[]
    ,
    user_id:{
      type:String,
      required: true
    }


  },
  { timestamps: true }
);

const Meeting = mongoose.model("meeting", meetingSchema);
module.exports = Meeting;