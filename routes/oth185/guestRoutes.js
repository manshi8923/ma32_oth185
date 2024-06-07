const express=require("express");
const { addGuest, getGuests, searchGuest, updateFoodBill, updateGuest } = require("../../controllers/oth185/guestController");
const router=express.Router();
router.route('/').get(getGuests);
router.route('/addguest/:id').post(addGuest);
router.route('/search/:id').get(searchGuest)
router.route('/food/:id').put(updateFoodBill);
router.route('/edit/:id').put(updateGuest);
module.exports=router;