import express from 'express'

const router = express.Router();

import { signup, signin, signout, isAdmin } from '../controller/auth'
import { userSignupValidator } from '../validator/index'

router.post('/register', userSignupValidator, signup)
router.post('/login', signin)
router.get('/logout', signout)

module.exports = router;