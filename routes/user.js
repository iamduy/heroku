import express from "express";
const router = express.Router();

import { userById, read, update, list } from "../controller/user";
import { requireSignin, isAdmin, isAuth } from "../controller/auth";

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  });
});
router.get("/users", list);
router.get("/user/:userId", read);
router.patch("/user/:userId", requireSignin, update);
router.param("userId", userById);

module.exports = router;
