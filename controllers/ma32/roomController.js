const Rooms=require("../../models/ma32/roomModel");
const asyncHandler=require("express-async-handler");
const guestModel=require("../../models/ma32/guestModel");
//get rooms status
const getRooms=asyncHandler(async(req,res)=>{
    try{
        const rooms=await Rooms.find();
        res.send(rooms);
    }
    catch(err){
        res.send("Error caught in server side");
    }
});
//update 
const updateRoom=asyncHandler(async(req,res)=>{
    const {cleaningStatus,book}=req.body;
    try{
        const room=await Rooms.findById(req.params.id);
        if(room){
            if(cleaningStatus!==""){
                room.cleaningStatus=cleaningStatus;
            }
            if(book!==""){
                room.book=book;
            }
            if(room.book==="Booked"){
                room.color="#FF9494";
            }
            if(room.book==="Vacant"){
                room.color="#87f0aa";
            }
            const updatedRoom=await room.save();
            res.send(updatedRoom);
        }
        else{
            console.log("error");
            res.status(404);
            throw new Error("Room not found");
        }
    }
    catch(err){
        res.send("Error in server side");
    }
  
});

// get guest of the room
const roomGuests=asyncHandler(async(req,res)=>{
    try{
        
    }
    catch(err){
        res.send("Error caught in server side");
    }
})
module.exports={getRooms,updateRoom};