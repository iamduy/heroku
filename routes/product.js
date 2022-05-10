import express from 'express'
import { isAdmin, isAuth, requireSignin } from '../controller/auth';
import { create, list, productById, read, remove, update, photo } from '../controller/product'
import { userById } from '../controller/user'
const router = express.Router();

router.get('/products', list);

router.post('/product/:user', requireSignin, isAuth, isAdmin, create);

router.patch('/product/:productId/:user', requireSignin, isAuth, isAdmin, update);

router.get('/product/:productId', read);

router.get('/product/photo/:productId', photo);

router.delete('/product/:productId/:user', requireSignin, isAuth, isAdmin, remove);

router.param('productId', productById);

router.param('user', userById);
module.exports = router;