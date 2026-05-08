const assert = require("node:assert/strict");
const http = require("node:http");
const { describe, it, before, after } = require("node:test");
const { connectWithRetry, createApp } = require("./server");

const app = createApp();
const server = http.createServer(app);
let port;

const request = (path) =>
	new Promise((resolve, reject) => {
		http
			.get({ hostname: "127.0.0.1", port, path }, (res) => {
				let body = "";

				res.setEncoding("utf8");
				res.on("data", (chunk) => {
					body += chunk;
				});
				res.on("end", () => {
					resolve({ statusCode: res.statusCode, body: JSON.parse(body) });
				});
			})
			.on("error", reject);
	});

before(() => {
	server.listen(0);
	port = server.address().port;
});

after(() => {
	server.close();
});

describe("backend status routes", () => {
	it("returns API metadata at the root route", async () => {
		const response = await request("/");

		assert.equal(response.statusCode, 200);
		assert.equal(response.body.ok, true);
		assert.equal(response.body.health, "/health");
		assert.ok(response.body.routes.some((route) => route.path === "/api/products"));
	});

	it("returns a JSON 404 for unknown routes", async () => {
		const response = await request("/missing-route");

		assert.equal(response.statusCode, 404);
		assert.equal(response.body.ok, false);
		assert.equal(response.body.health, "/health");
		assert.ok(response.body.message.includes("/missing-route"));
	});

	it("retries the database connection after an initial failure", async () => {
		const retryDelays = [];
		let attempts = 0;
		const originalConsoleError = console.error;

		console.error = () => {};

		try {
			const connected = await connectWithRetry({
				connect: async () => {
					attempts += 1;

					if (attempts === 1) {
						throw new Error("temporary database outage");
					}
				},
				maxAttempts: 2,
				retryDelayMs: 25,
				sleep: async (delayMs) => {
					retryDelays.push(delayMs);
				},
			});

			assert.equal(connected, true);
			assert.equal(attempts, 2);
			assert.deepEqual(retryDelays, [25]);
		} finally {
			console.error = originalConsoleError;
		}
	});
});
