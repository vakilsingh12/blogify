const User = require("../models/user");
const { createToken, validateToken } = require("../services/authentication");
const userControllerSignup = async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({ fullName, email, password });
  return res.status(201).json({ msg: "registered successfully!" });
};
const userControllerSignin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const token = await User.matchPassword(email, password);
    res.cookie("token", token);
    return res.status(201).json({ msg: "Login successfully!", token });
  } catch (err) {
    return res.status(400).json({ msg: "username & password wrong!" });
  }
};
const userLogout = (req,res) => {
  res.clearCookie("token");
  return res.status(200).json({msg:"user logout successfully!"})
};
module.exports = { userControllerSignup, userControllerSignin, userLogout };
