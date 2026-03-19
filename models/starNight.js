import mongoose from 'mongoose';

const starNightSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
    phone: { 
    type: String,
    required: true
   },
   institute:{
    type: String,
    required: true
   },
   aadhar:{
    type: String,
    required: true
   },
   isCheckedIn:{
    type: Boolean,
    default: false
   },
   checkInTime:{
    type: Date,
    default: null
   },
   createdAt:{
    type: Date,
    default: Date.now
   }
});

const StarNight = mongoose.model('StarNight', starNightSchema);

export default StarNight;