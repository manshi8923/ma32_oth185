const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const connectDB=require("./config/db");
const path=require("path");
//env config
dotenv.config();

//mongodb connection
connectDB();


const app=express();

//middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/ma/rooms',require("./routes/ma32/roomRoutes"));
app.use('/api/ma/guests',require('./routes/ma32/guestRoutes'));

app.use(express.static(path.join(__dirname,'./client/build')));
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"))
})

const PORT=process.env.PORT||8090

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})
