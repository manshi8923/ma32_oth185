const mongoose=require("mongoose");
const expenseSchema=mongoose.Schema({
    title:{
        type:String,
        required:false
    },
    date:{
        type:String,
        required:false
    },
    remarks:{
        type:String,
        required:false
    }
},{
    timestamps:true
});

const Expense_oth=mongoose.model("Expense_oth",expenseSchema);
module.exports=Expense_oth;