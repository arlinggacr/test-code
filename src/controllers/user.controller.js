const User = require("../models/User.model");

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
  createUser,
  getUserByAccountNumber,
  getUserByIdentityNumber,
  getAllUser,
  updateUser,
  deleteUser,
};