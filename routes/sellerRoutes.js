import express from 'express'
import {createCatalog, orderList} from '../controllers/sellerController.js'
import { isUserLoggedIn, isSeller } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.route('/create-catalog/:id')
    .post(isUserLoggedIn, isSeller, createCatalog);
router.route('/orders/:seller_id')
    .get(isUserLoggedIn, isSeller, orderList);

export default router