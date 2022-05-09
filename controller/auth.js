import User from "../models/user";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
export const register = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "Không đăng kí được tài khoản",
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json(user);
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  User.findOne({ email }, (error, user) => {
    const { _id, name, email, role, username, avatar } = user;

    if (error || !user || !user.authenticate(password)) {
      return res.status(400).json({
        error: "Function failure!",
      });
    }

    res.cookie("t", token, { expire: new Date() + 9999 });
    return res.json({
      token,
      user: { _id, email, name, role, username, avatar },
    });
  });
};

export const logout = (__, res) => {
  res.clearCookie("t");
  res.json({
    message: "Signout Success",
  });
};

export const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

export const isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Quyền truy cập bị Từ chối !",
    });
  }
  next();
};
export const isAdmin = (req, res, next) => {
  const role = req.profile.role;
  if (role == 0) {
    return res.status(403).json({
      error: "Tài nguyên quản trị ! Quyền truy cập bị Từ chối",
    });
  }
  next();
};
