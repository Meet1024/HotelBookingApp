import express from "express";
//import Hotel from "../api/models/Hotel.js";
const router = express.Router();
import { createHotel, deletehotel, gethotel, gethotels, updatehotel, countByCity, countByType } from "../api/controllers/hotelController.js"
import { verifyAdmin } from "../utils/verifyToken.js";


router.post('/', verifyAdmin, createHotel)

router.put('/:id', verifyAdmin, updatehotel)//update

router.delete('/:id', verifyAdmin, deletehotel)


router.get('/find/:id', gethotel)

router.get('/', gethotels)

router.get("/countByCity", countByCity);

router.get("/countByType", countByType);



export default router;