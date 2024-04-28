const mongoose=require("mongoose");
const roomSchema=new mongoose.Schema({
    roomNo:{
        type:Number,
        required:true
    },
    book:{
        type:String,
        required:false
    },
    cleaningStatus:{
        type:String,
        required:false
    },
    bookedOn:{
        type:String,
        required:false,
    },
    bookedBy:{
        type:String,
        required:false
    },
    color:{
        type:String,
        required:false
    },
    guests:[
        {
            type:Object,
            required:false
        }
    ]
},{
    timestamps:true
});

const roomModel=mongoose.model("Rooms_ma",roomSchema);
module.exports=roomModel;