import { beforeEach, describe, expect, it, vi } from "vitest";

describe("productApi", () => {
	beforeEach(() => {
		vi.resetModules();
	});

	it("builds product endpoint requests and tags", async () => {
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

		const { productApi } = await import("./productApi");
		const defs = productApi.definitions;

		expect(defs.getProducts.query()).toBe("/products");
		expect(defs.getProductById.query("p1")).toBe("/products/p1");
		expect(defs.createProduct.query({ title: "Desk" })).toEqual({
			url: "/products",
			method: "POST",
			body: { title: "Desk" },
		});
		expect(defs.updateProduct.query({ id: "p2", title: "Chair" })).toEqual({
			url: "/products/p2",
			method: "PUT",
			body: { title: "Chair" },
		});
		expect(defs.deleteProduct.query("p3")).toEqual({
			url: "/products/p3",
			method: "DELETE",
		});
		expect(defs.getProducts.providesTags([{ _id: "p1" }])).toEqual([
			{ type: "Products", id: "p1" },
			{ type: "Products", id: "LIST" },
		]);
		expect(defs.getProducts.providesTags(undefined)).toEqual([
			{ type: "Products", id: "LIST" },
		]);
		expect(defs.getProductById.providesTags(undefined, undefined, "p1")).toEqual([
			{ type: "Product", id: "p1" },
		]);
		expect(defs.updateProduct.invalidatesTags(undefined, undefined, { id: "p2" })).toEqual([
			{ type: "Product", id: "p2" },
		]);
		expect(defs.deleteProduct.invalidatesTags(undefined, undefined, "p3")).toEqual([
			{ type: "Products", id: "p3" },
			{ type: "Products", id: "LIST" },
		]);
	});
});
