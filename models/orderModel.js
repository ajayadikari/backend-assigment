import mongoose from "mongoose";

const schema = mongoose.Schema({
    orders: [{
        type: mongoose.Types.ObjectId, 
        ref: 'product'
    }], 
    sellerId:{
        type: mongoose.Types.ObjectId, 
        ref: 'seller'
    }, 
    customerId:{
        type: mongoose.Types.ObjectId, 
        ref: 'customer'
    }
})


export default mongoose.model('order', schema);