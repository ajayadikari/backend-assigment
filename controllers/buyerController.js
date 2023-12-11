import Seller from "../models/sellerModel.js"
import Catalog from "../models/catalogModel.js";
import Order from "../models/orderModel.js";


const getSellers = async (req, res) => {
    try {
        const allSellers = await Seller.find({}, '-password');
        res.status(200).json({
            success: true,
            message: 'all sellers fetched successfully',
            allSellers
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            successa: false,
            message: 'Internal server error: getSeller controller'
        })
    }
}

const getSellerCatalog = async (req, res) => {
    try {
        const { seller_id } = req.params;
        const sellerCatelog = await Catalog.find({ sellerId: seller_id }).populate('products')
        res.status(200).json({
            success: true,
            message: 'seller catalog fetched successfully',
            sellerCatelog
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error: getSellerCatalog controller',
            error
        })
    }
}

const createOrder = async (req, res) => {
    try {

        const { order } = req.body
        console.log(order)
        const user = req.user;
        const {seller_id} = req.params
        const createdOrder = await new Order({
            sellerId: seller_id,
            orders: order,
            customerId: user.userId
        }).save()
        res.status(200).json({
            success: true,
            message: 'order placed successfully',
            createdOrder
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'order failed',
            error
        })
    }
}



export { getSellers, getSellerCatalog, createOrder }