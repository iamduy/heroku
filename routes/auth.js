import express from 'express'

const router = express.Router();

import { signup, login, logout } from '../controller/auth'
import { userSignupValidator } from '../validator/index'

router.post('/register', userSignupValidator, signup)
router.post('/login', login)
router.get('/logout', logout)

module.exports = router;