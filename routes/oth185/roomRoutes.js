const express=require("express");
const { getRooms, updateRoom, getExpense, addExpense } = require("../../controllers/oth185/roomController");
const router=express.Router();
router.route('/').get(getRooms);
router.route('/:id').put(updateRoom);
router.route('/all-expense').get(getExpense);
router.route('/add-expense').post(addExpense);
module.exports=router;