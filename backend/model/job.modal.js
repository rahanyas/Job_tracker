import mongoose from 'mongoose';

const jobSchema = new mongoose.schema({
   company : {
    type : String,
    required : true
   },
   aplliedOn : {
    type : String,
    required : true
  },
  gotCall : {
   type : Boolean,
   required : true,
   default : false
  },
  location : {
  type : String,
  required : true
},
 workType : {
  type : String,
required : true
}
});

const jobModal =  mongoose.modal('JobMoad', jobSchema);

export default jobModal; 
