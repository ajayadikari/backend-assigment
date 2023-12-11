import mongoose from "mongoose";

const schema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is requried'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    contact: {
        type: Number,
        required: [true, 'contact is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    orders: {
        type: mongoose.Types.ObjectId,
        ref: 'Order'
    }
})


export default mongoose.model('customer', schema);