import Seller from "../models/sellerModel.js";
import Customer from "../models/customerModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const register = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, isSeller, contact } = req.body;
        if (!name) {
            res.status(400).json({
                success: false,
                message: 'name is required'
            })
        }
        if (!email) {
            res.status(400).json({
                success: false,
                message: 'email is required'
            })
        }
        if (!password) {
            res.status(400).json({
                success: false,
                message: 'password is required'
            })
        }
        if (!confirmPassword) {
            res.status(400).json({
                success: false,
                message: 'confirmPassword is required'
            })
        }
        if (!contact) {
            res.status(400).json({
                success: false,
                message: 'contact is required'
            })
        }

        if (password != confirmPassword) {
            res.status(400).json({
                success: false,
                message: 'passwords should match'
            })
        }

        let user = {};
        if (isSeller) {
            user = await Seller.findOne({ email: email });
        }
        else {
            user = await Customer.findOne({ email: email });
        }

        if (user) {
            res.status(500).json({
                success: false,
                message: 'user already exists'
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        let newUser = {}

        if (isSeller) {
            newUser = await new Seller({
                name,
                email,
                password: hashPassword,
                contact
            }).save()
        }
        else {
            newUser = await new Customer({
                name,
                email,
                password: hashPassword,
                contact
            }).save()
        }

        res.status(200).json({
            success: true,
            message: 'user registration successfull',
            newUser
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error: regitration controller',
            error
        })
    }
}



const login = async (req, res) => {
    try {
        const { email, password, isSeller } = req.body;
        if (!email) {
            res.status(400).json({
                success: false,
                message: 'email is required'
            })
        }
        if (!password) {
            res.status(400).json({
                success: false,
                message: 'password is required'
            })
        }
        let user = {}
        if (isSeller) user = await Seller.findOne({ email: email })
        else user = await Customer.findOne({ email: email })
        const verify = await bcrypt.compare(password, user.password)
        if (!verify) {
            res.status(500).json({
                success: false,
                message: 'Password verification failed',
            })
        }
        const payload = {
            userId: user._id,
            email: email,
            isSeller: true
        }
        user.password = null
        const token = await jwt.sign(payload, process.env.SECRET)
        res.status(200).json({
            success: true,
            message: 'user login successful',
            user,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error: login controller',
            error
        })
    }
}


export { login, register }