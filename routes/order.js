import express from 'express'
import { requireSignin } from '../controller/auth';
import { create, remove, list, orderId, read } from '../controller/order';
import { userById } from '../controller/user'
const router = express.Router();

router.post('/order/:userId', requireSignin, create);

router.get('/order/:orderId', read);

router.delete('/order/:orderId', remove);

router.param('orderId', orderId);

router.get('/order', list);

router.param('userId', userById)

module.exports = router;