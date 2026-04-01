import { beforeEach, describe, expect, it, vi } from "vitest";

describe("userApi", () => {
	beforeEach(() => {
		vi.resetModules();
	});

	it("builds user endpoint requests and tags", async () => {
		const injectEndpoints = vi.fn(({ endpoints }) => {
			const definitions = endpoints({
				query: (config) => config,
				mutation: (config) => config,
			});
			return { definitions };
		});

		vi.doMock("./apiSlice", () => ({
			apiSlice: {
				injectEndpoints,
			},
		}));

		const { userApi } = await import("./userApi");
		const defs = userApi.definitions;

		expect(defs.getUsers.query()).toBe("/users");
		expect(defs.getUserById.query("u1")).toBe("/users/u1");
		expect(defs.deleteUser.query("u2")).toEqual({
			url: "/users/u2",
			method: "DELETE",
		});
		expect(defs.updateUser.query({ id: "u3", email: "u3@example.com" })).toEqual({
			url: "/users/u3",
			method: "PUT",
			body: { email: "u3@example.com" },
		});
		expect(defs.createUser.query({ username: "Sam" })).toEqual({
			url: "/users",
			method: "POST",
			body: { username: "Sam" },
		});
		expect(defs.getUsers.providesTags([{ _id: "u1" }])).toEqual([
			{ type: "Users", id: "u1" },
			{ type: "Users", id: "LIST" },
		]);
		expect(defs.getUsers.providesTags(undefined)).toEqual([
			{ type: "Users", id: "LIST" },
		]);
		expect(defs.deleteUser.invalidatesTags(undefined, undefined, "u2")).toEqual([
			{ type: "Users", id: "u2" },
			{ type: "Users", id: "LIST" },
		]);
		expect(defs.createUser.invalidatesTags).toEqual(["User"]);
	});
});
