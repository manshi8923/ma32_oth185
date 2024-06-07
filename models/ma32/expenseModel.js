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

const Expense_ma=mongoose.model("Expense_ma",expenseSchema);
module.exports=Expense_ma;