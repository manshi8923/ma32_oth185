const express=require("express");
const { getRooms, updateRoom } = require("../../controllers/ma32/roomController");
const router=express.Router();
router.route('/').get(getRooms);
router.route('/:id').put(updateRoom);
module.exports=router;