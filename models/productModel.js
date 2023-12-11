import mongoose from "mongoose";

const schema = mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'name is requried'], 
        trim: true
    }, 
    price:{
        type: Number, 
        required: [true, 'price is required'], 
    }, 
    sellerId:{
        type: mongoose.Types.ObjectId, 
        ref: 'seller'
    }, 
    catelogId:{
        type: mongoose.Types.ObjectId, 
        ref: 'catalog'
    }
})


export default mongoose.model('product', schema);