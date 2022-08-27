import User from '../models/User.js'
import bcrypt from 'bcrypt'
//import dotenv from "dotenv";
import jwt from "jsonwebtoken"
export const register = async (req, res, next) => {

    console.log("Signup")
    try {

        const salt = bcrypt.genSaltSync(10)
        const hashpwd = bcrypt.hashSync(req.body.password, salt)
        const newUser = User({
            username: req.body.username,
            email: req.body.email,
            password: hashpwd

        })

        await newUser.save()
        //const savedUser = newUser.save()

        res.status(200).json("user has been created")

    }
    catch (err) {
        res.status(500).json(err)
    }


}

//dotenv.config()

export const login = async (req, res, next) => {

    console.log("Login")
    try {

        const user = await User.findOne({ username: req.body.username })
        if (!user) return res.status(404).send("Enter correct username")

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) return res.status(404).send("Please enter correct password")

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT)

        const { password, isAdmin, ...otherDetails } = user._doc;
        res
            .cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json({ ...otherDetails })
        //res.status(200).send(user)

    }
    //const savedUser = newUser.save()

    catch (err) {
        res.status(500).json(err)
    }

}