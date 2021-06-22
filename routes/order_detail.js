import express from 'express'
import { requireSignin } from '../controller/auth';
import { create, list, OrderDetailId, read } from '../controller/order_detail';
import { userById } from '../controller/user'
const router = express.Router();

router.post('/orderdetail/:userId', requireSignin, create);

router.get('/orderdetail', list);

router.get('/orderdetail/:OrderDetailId', read);

router.param('OrderDetailId', OrderDetailId);

router.param('userId', userById)

module.exports = router;