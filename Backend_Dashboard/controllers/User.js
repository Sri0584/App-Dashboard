const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ✅ GET ALL USERS
const getUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

// ✅ CREATE USER
const createUser = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		const hashedPwd = await bcrypt.hash(password, 10);
		const newUser = new User({
			username,
			email,
			password: hashedPwd,
		});

		const savedUser = await newUser.save();
		const { password: _, ...userData } = savedUser._doc;
		res.status(201).json(userData);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

// ✅ DELETE USER
const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedUser = await User.findByIdAndDelete(id);
		if (!deletedUser) {
			return res.status(404).json("User not found");
		}
		res.json({ message: "User deleted successfully" });
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const getUserById = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		res.json(user);
	} catch (err) {
		res.status(500).json(err);
	}
};

const updateUser = async (req, res) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }, // return updated doc
		);

		res.status(200).json(updatedUser);
	} catch (err) {
		res.status(500).json(err);
	}
};

module.exports = { getUsers, deleteUser, createUser, getUserById, updateUser };
