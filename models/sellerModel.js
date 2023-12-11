import mongoose from "mongoose";

const schema = mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'name is requried'], 
        trim: true
    }, 
    email:{
        type: String, 
        required: [true, 'email is required'],
        unique: true
    }, 
    contact:{
        type: String, 
        required: [true, 'contact is required']
    }, 
    password:{
        type: String, 
        required: [true, 'password is required']
    }, 
    catalog:[{
        type: mongoose.Types.ObjectId, 
        ref: 'product'
    }]
})


export default mongoose.model('seller', schema);