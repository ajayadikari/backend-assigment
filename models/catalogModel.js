import mongoose from "mongoose";

const schema = mongoose.Schema({
    products: [{
        type: mongoose.Types.ObjectId, 
        ref: 'product'
    }], 
    sellerId: {
        type: mongoose.Types.ObjectId, 
        ref: 'seller'
    }
})

export default mongoose.model('catalog', schema)