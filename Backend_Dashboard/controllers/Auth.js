const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
	const { username, email, password } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json("User already exists");
		}
		// 🔐 hash password
		const hashedPwd = await bcrypt.hash(password, 10);

		// ✅ create mongoose document
		const newUser = new User({
			username,
			email,
			password: hashedPwd, // ✅ correct field
		});

		// ✅ save to DB
		const savedUser = await newUser.save();

		// ❗ remove password before sending response
		const { password: _, ...userWithoutPassword } = savedUser._doc;

		res.status(201).json(userWithoutPassword);
	} catch (error) {
		res.status(500).json(error.message);
	}
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		// 🔍 find user
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(401).json("User not found!");
		}

		// 🔐 compare password
		const validPwd = await bcrypt.compare(password, user.password);

		if (!validPwd) {
			return res.status(401).json("Wrong password!");
		}

		// 🎟️ generate token
		const accessToken = jwt.sign(
			{
				id: user._id,
				isAdmin: user.isAdmin,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "1d" },
		);

		// ❌ remove password
		const { password: _, ...userData } = user._doc;

		// ✅ send response
		res.status(200).json({
			...userData,
			accessToken,
		});
	} catch (error) {
		res.status(500).json(error.message);
	}
};

module.exports = { loginUser, registerUser };
