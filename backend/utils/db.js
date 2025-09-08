import mongoose from 'mongoose';
const db_string = process.env.DB_STRING;
console.log(db_string);

if(db_string === undefined){console.log('db string is undefined')}
const connect_db = async  () => {
    try{
    await mongoose.connect(process.env.DB_STRING);
    console.log("mongodb connected");
}
   catch(err){
      console.log('error in connect_db : ', err);
}
}
;

export default connect_db;