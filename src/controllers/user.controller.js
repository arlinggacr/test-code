const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");

const register = async (req, res) => {
  try {
    const { userName, accountNumber, emailAddress, identityNumber, password } =
      req.body;

    const existingUser = await User.findOne({ emailAddress });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    const newUser = await User.save({
      userName,
      accountNumber,
      emailAddress,
      identityNumber,
      password,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token, user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { emailAddress, password } = req.body;

    const user = await User.findOne({ emailAddress });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getUserByAccountNumber = async (req, res) => {
  try {
    const user = await User.findOne({
      accountNumber: req.params.id,
    });
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserByIdentityNumber = async (req, res) => {
  try {
    const user = await User.findOne({
      identityNumber: req.params.id,
    });
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const user = await User.find();

    const result = user.map((e) => ({
      id: e._id,
      username: e.userName,
      account_number: e.accountNumber,
      email: e.emailAddress,
      id_number: e.identityNumber,
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) return res.status(404).json({ msg: "User not found" });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ msg: "User not found" });
    res.json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  createUser,
  getUserByAccountNumber,
  getUserByIdentityNumber,
  getAllUser,
  updateUser,
  deleteUser,
};
