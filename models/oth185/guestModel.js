const mongoose=require("mongoose");
const guestSchema=mongoose.Schema({
    name:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:false,
    },
    address:{
        type:String,
        required:false
    },
    price:{
        type:Number,
        required:false
    },
    phone:{
        type:String,
        required:false
    },
    days:{
        type:Number,
        required:false
    },
    arrival:{
        type:String,
        required:false
    },
    depart:{
        type:String,
        required:false
    },
    status:{
        type:String,
        default:"Not arrived"
    },
    roomNo:{
        type:Number,
        required:true
    },
    bookedOn:{
        type:String,
    },
    bill:{
        type:Number,
        required:false
    },
    color:{
        type:String,
        required:false
    },
    total:{
        type:Number,
        required:false
    },
    remarks:{
        type:String,
        required:false
    },
    gst:{
        type:String,
        required:false
    },
    type:{
        type:String,
        required:false
    },
    size:{
        type:String,
        required:false
    }
},{
    timestamps:true
});

const Guests_oth=mongoose.model("Guests_oth",guestSchema);
module.exports=Guests_oth;