import express from "express";

const router = express.Router();

import { register, login, logout } from "../controller/auth";
import { userSignupValidator } from "../validator/index";

router.post("/register", userSignupValidator, register);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
