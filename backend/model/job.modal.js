import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
   company : {
    type : String,
    required : true
   },
   appliedOn : {
    type : String,
    required : true
  },
  gotCall : {
   type : String,
   required : true,
   default : "No"
  },
  status : {
    type : String,
    required : true,
  },
  location : {
  type : String,
  required : true
},
 workType : {
  type : String,
required : true
},
cv : {
  type : String,
  required : true
}
}, {timestamps : true});

const jobModal =  mongoose.model('JobMoad', jobSchema);

export default jobModal; 
