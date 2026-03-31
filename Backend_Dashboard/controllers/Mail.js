const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
	const { to, subject, message } = req.body;

	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASSWORD,
		},
	});
	try {
		await transporter.sendMail({
			from: process.env.EMAIL,
			to,
			subject,
			text: message,
		});

		res.status(200).json({ message: "Mail sent" });
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message || "Failed to send email",
			code: error.code,
		});
	}
};
module.exports = sendMail;
