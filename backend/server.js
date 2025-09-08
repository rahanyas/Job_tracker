import express from "express";
import dotenv from "dotenv";
import connect_db from "./utils/db.js";
import cors from "cors";
dotenv.config();
const port = process.env.PORT;
const app = express();
const base_url = process.env.NODE_ENV === 'dev' ? 'http://localhost:5173/' : ""
app.use(cors({
  origin : base_url
}
));

if(port === undefined){
   console.log('port is undefined');
};
connect_db();

app.listen(port, () => {
console.log("server is running on port : ", port)
})


