import Catalog from "../models/catalogModel.js"
import Product from "../models/productModel.js"
import Order from "../models/orderModel.js";

const createCatalog = async (req, res) => {
    try {
        const { list } = req.body;
        const { id } = req.params;

        // Step 1: Create a new Catalog
        const catalog = await new Catalog({
            sellerId: id,
        }).save();

        // Step 2: Create products and push their IDs into the Catalog
        const createdCatalog = await Promise.all(
            list.map(async (item) => {
                const product = await new Product({
                    name: item.name,
                    price: item.price,
                    sellerId: id,
                    catalogId: catalog._id, // Assuming you have a field named catalogId in your Product model
                }).save();

                // Push the product ID into the Catalog's products array
                await Catalog.findByIdAndUpdate(
                    catalog._id,
                    {
                        $push: { products: product._id },
                    },
                    { new: true }
                );

                return product;
            })
        );

        res.status(200).json({
            success: true,
            message: 'Catalog created successfully',
            createdCatalog,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to create catalog',
        });
    }
};

const orderList = async (req, res) => {
    try {
        const {seller_id} = req.params
        const orderList = await Order.find({ sellerId: seller_id }).populate('orders')
        res.status(200).json({
            success: true,
            message: 'orders fetched successfully',
            orderList
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error: orderList controller'
        })
    }
}


export { createCatalog, orderList }