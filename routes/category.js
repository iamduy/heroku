import express from 'express'
import { isAdmin, isAuth, requireSignin } from '../controller/auth';
import { categoryById, create, list, read, update, remove, photo } from '../controller/category'
import { userById } from '../controller/user';
const router = express.Router();

router.post('/category/:userId', requireSignin, isAuth, isAdmin, create);

router.get('/categories', list);

router.param('categoryById', categoryById);

router.get('/category/:categoryById', read);

router.put('/category/:categoryById/:userId', requireSignin, isAuth, isAdmin, update);

router.delete('/category/:categoryById/:userId', requireSignin, isAuth, isAdmin, remove);

router.get('/category/photo/:categoryById', photo);

router.param('userId', userById);
module.exports = router;