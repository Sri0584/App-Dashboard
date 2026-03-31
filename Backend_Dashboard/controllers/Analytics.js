const getUsers = (req, res) => {
	res.json({
		users: 1200,
		sales: 5400,
		revenue: 23000,
	});
};
const getAllUsers = (req, res) => {
	res.json([
		{ name: "Jan", users: 400 },
		{ name: "Feb", users: 300 },
		{ name: "Mar", users: 500 },
	]);
};
module.exports = { getAllUsers, getUsers };
