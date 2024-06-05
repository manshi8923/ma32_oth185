const asyncHandler =require("express-async-handler");
const Guests=require("../../models/ma32/guestModel");
const Rooms=require("../../models/ma32/roomModel");

//get guests
const getGuests=asyncHandler(async(req,res)=>{
    const guests=await Guests.find();
    res.send(guests);
});

//add guests
const addGuest=asyncHandler(async(req,res)=>{
    const newGuest=await new Guests(req.body);
    const guests=await Guests.find();
    newGuest.size=guests.length;
    const room=await Rooms.findById(req.params.id);
        newGuest.roomNo=room.roomNo;
        newGuest.bookedOn=new Date().toLocaleDateString();
        newGuest.color="#87f0aa";
        room.book="Booked"
        room.color="#FF9494";
        room.guests.push(newGuest);
        await newGuest.save();
        await room.save();
        res.status(201).json(newGuest);
});
//update guest 
const updateFoodBill=asyncHandler(async(req,res)=>{
    const{bill,total}=req.body;
    const guest=await Guests.findById(req.params.id);
    try{
        if(guest){
            guest.bill=bill;
            guest.total=total+guest.price*guest.days+(guest.price*guest.days)*0.12;
            guest.status="Depart";
            guest.color="#FF9494";
            await guest.save();
        }
    }
    catch(err){
        console.log(err);
    }
})
//search guests
const searchGuest=asyncHandler(async(req,res)=>{
   const guest=await Guests.findById(req.params.id);
   console.log(',');
   
   try{
     if(guest){
        console.log(guest);
        res.json(guest);
     }
   }
   catch(err){
    console.log(err);
   }
});

module.exports={addGuest,getGuests,searchGuest,updateFoodBill};