const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllUsers = (req, res) => {
  res.status(200).json({ message: "Get all users" });
};

const userSignup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ message: "All fields are mandatory" });
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    req.flash("error", "User already exist");
    return res.redirect("/signup");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashPassword,
  });

  const token = jwt.sign(
    { email: user.email, username: user.username, id: user._id },
    process.env.SECRET_KEY
  );
  res.cookie("token", token);
  res.redirect("/");
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    req.flash("error", "User not found");
    return res.redirect("/login");
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      { email: user.email, username: user.username, id: user._id },
      process.env.SECRET_KEY
    );
    res.cookie("token", token);
    return res.redirect("/");
  } else {
    req.flash("error", "Invalid credentials");
    return res.redirect("/login");
  }
};

module.exports = { getAllUsers, userSignup, userLogin };
