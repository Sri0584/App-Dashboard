const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes.js");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const sendMail = require("./routes/mailRoutes.js");

const DEFAULT_FRONTEND_URL =
	"https://orange-smoke-016ceda03.7.azurestaticapps.net";
const apiRoutes = [
	{
		path: "/api/auth",
		methods: ["POST /login", "POST /register", "POST /refresh", "POST /logout"],
	},
	{
		path: "/api/products",
		methods: ["GET", "POST", "GET /:id", "PUT /:id", "DELETE /:id"],
	},
	{
		path: "/api/users",
		methods: ["GET", "POST", "GET /:id", "PUT /:id", "DELETE /:id"],
	},
	{ path: "/api/analytics", methods: ["GET", "GET /users"] },
	{ path: "/api/transactions", methods: ["GET", "POST"] },
	{ path: "/api/mail", methods: ["POST"] },
];

const buildAllowedOrigins = () =>
	(process.env.CORS_ORIGINS || DEFAULT_FRONTEND_URL)
		.split(",")
		.map((origin) => origin.trim())
		.filter(Boolean);

const getDatabaseStatus = () => ({
	state: mongoose.connection.readyState,
	status: ["disconnected", "connected", "connecting", "disconnecting"][
		mongoose.connection.readyState
	] || "unknown",
});

const createApp = () => {
	const app = express();
	const allowedOrigins = buildAllowedOrigins();

	app.use(express.json());
	app.use(
		cors({
			origin(origin, callback) {
				if (!origin || allowedOrigins.includes(origin)) {
					return callback(null, true);
				}

				return callback(new Error(`Origin ${origin} is not allowed by CORS`));
			},
			credentials: true,
		}),
	);

	app.get("/", (req, res) => {
		res.status(200).json({
			ok: true,
			message: "App Dashboard API is running",
			health: "/health",
			database: getDatabaseStatus(),
			routes: apiRoutes,
		});
	});

	app.get("/health", (req, res) => {
		const database = getDatabaseStatus();

		res.status(database.state === 1 ? 200 : 503).json({
			ok: database.state === 1,
			message:
				database.state === 1 ?
					"Backend is running"
				: 	"Backend is running, but the database is not connected",
			database,
		});
	});

	// ✅ ROUTES
	app.use("/api/auth", authRoutes);
	app.use("/api/products", productRoutes);
	app.use("/api/users", userRoutes);
	app.use("/api/analytics", analyticsRoutes);
	app.use("/api/transactions", transactionRoutes);
	app.use("/api/mail", sendMail);

	app.use((req, res) => {
		res.status(404).json({
			ok: false,
			message: `Route ${req.method} ${req.originalUrl} was not found`,
			health: "/health",
			routes: apiRoutes,
		});
	});

	return app;
};

const configureSocket = (server, app) => {
	const io = new Server(server, {
		cors: { origin: buildAllowedOrigins(), credentials: true },
	});

	// ✅ make io accessible in routes
	app.set("io", io);

	// ✅ socket connection
	io.on("connection", (socket) => {
		console.log("user connected");

		socket.on("disconnect", () => {
			console.log("user disconnected");
		});
	});

	// simulate real-time transactions
	setInterval(() => {
		io.emit("newTransaction", {
			id: Date.now(),
			customer: "Live User",
			amount: Math.floor(Math.random() * 1000),
			status: ["Approved", "Pending", "Declined"][Math.floor(Math.random() * 3)],
			createdAt: new Date(),
		});
	}, 5000);

	return io;
};

const startServer = async () => {
	const app = createApp();
	const server = http.createServer(app);
	configureSocket(server, app);

	const PORT = process.env.PORT || 5000;
	server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

	try {
		await connectDB();
	} catch (error) {
		console.error("Server started without a database connection", error);
	}

	return server;
};

if (require.main === module) {
	startServer();
}

module.exports = { createApp, startServer };
