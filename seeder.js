const mongoose=require("mongoose");
const dotenv=require("dotenv");
const connectDb=require("./config/db");
const roomModel_ma32=require("./models/ma32/roomModel");
const roomModel_oth185=require("./models/oth185/roomModel");
const rooms_ma= require("./utils/ma");
const rooms_oth=require("./utils/oth");
//config
dotenv.config();
connectDb();

//function seeder
const importData=async()=>{
    try{
        await roomModel_ma32.deleteMany();
        await roomModel_oth185.deleteMany();
        const roomsData_ma32=await roomModel_ma32.insertMany(rooms_ma);
        const roomsData_oth185=await roomModel_oth185.insertMany(rooms_oth);
        console.log('All rooms addded');
        process.exit();
    }
    catch(error){
        console.log(`${error}`);
        process.exit(1);
    }
}
importData();