import express from 'express'
import {createOrder, getSellerCatalog, getSellers} from '../controllers/buyerController.js'
import { isUserLoggedIn } from '../middlewares/authMiddleware.js'
const router = express.Router()


router.route('/list-of-sellers')
    .get(getSellers)
router.route('/seller-catalog/:seller_id')
    .get(getSellerCatalog)
router.route('/create-order/:seller_id')
    .post(isUserLoggedIn, createOrder)

export default router