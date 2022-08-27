import express from "express";
import {
    updateUser,
    deleteUser,
    getUser,
    getUsers,
} from "../api/controllers/userController.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();


// router.get("/check", verifyToken, (req, res, next) => {
//     res.send("Logged in")
// })

// router.get("/check/:id", verifyUser, (req, res, next) => {
//     res.send("You are logged in and you can delete the account")
// })


//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);

export default router;



