const asyncHandler =require("express-async-handler");
const Guests=require("../../models/ma32/guestModel");
const Rooms=require("../../models/ma32/roomModel");
const Expense=require("../../models/ma32/expenseModel");
//get guests
const getGuests=asyncHandler(async(req,res)=>{
    const guests=await Guests.find();
    res.send(guests);
});

//add guests
const addGuest=asyncHandler(async(req,res)=>{
    const newGuest=await new Guests(req.body);
    const guests=await Guests.find();
    newGuest.size=guests.length+1;
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
//add expense
const addExpense=asyncHandler(async(req,res)=>{
    const newExpense=await new Expense(req.body);
    await newExpense.save();
    res.status(201).json(newExpense);
})
//get expense
const getExpense=asyncHandler(async(req,res)=>{
    const expense=await Expense.find();
    res.send(expense);
})
const updateExpense=asyncHandler(async(req,res)=>{
    const {date,remarks,title}=req.body;
    const expense=await Expense.findById(req.params.id);
    try{
        if(expense){
                expense.date=date;
                expense.remarks=remarks;
                expense.title=title;
            await expense.save();
        }
    }
    catch(err){
        console.log(err);
    }
})
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
//update guest 
const updateGuest=asyncHandler(async(req,res)=>{
    const {days,arrival,depart,price,gst}=req.body;
    const guest=await Guests.findById(req.params.id);
    try{
        if(guest){
            guest.days=days;
            guest.arrival=arrival;
            guest.depart=depart;
            guest.price=price;
            if(gst!==""){
                guest.gst=gst;
            }
            await guest.save();
        }
        else{
            res.status(404).send("Not found");
        }
    }
    catch(err){
        console.log(err);
    }
})
//search guests
const searchGuest=asyncHandler(async(req,res)=>{
   const guest=await Guests.findById(req.params.id);
   
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

module.exports={addGuest,getGuests,searchGuest,updateFoodBill,addExpense,getExpense,updateGuest,updateExpense};