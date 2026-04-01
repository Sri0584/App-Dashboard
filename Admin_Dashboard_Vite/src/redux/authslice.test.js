import { beforeEach, describe, expect, it, vi } from "vitest";
import authReducer, { loginSuccess, logout } from "./authslice";

// Mock localStorage
const localStorageMock = {
	getItem: vi.fn(),
	setItem: vi.fn(),
	removeItem: vi.fn(),
};
Object.defineProperty(window, "localStorage", {
	value: localStorageMock,
});

describe("authSlice", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should return the initial state", () => {
		localStorageMock.getItem.mockReturnValue(null);
		expect(authReducer(undefined, { type: undefined })).toEqual({ user: null });
	});

	it("should hydrate the initial state from localStorage", async () => {
		vi.resetModules();
		localStorageMock.getItem.mockReturnValue(JSON.stringify({ username: "Pat" }));
		const { default: hydratedReducer } = await import("./authslice");
		expect(hydratedReducer(undefined, { type: undefined })).toEqual({
			user: { username: "Pat" },
		});
	});

	it("should handle loginSuccess", () => {
		const user = { id: 1, name: "John" };
		const action = loginSuccess(user);
		const result = authReducer({ user: null }, action);
		expect(result.user).toEqual(user);
	});

	it("should handle logout", () => {
		localStorageMock.removeItem.mockReturnValue(undefined);
		const initialState = { user: { id: 1, name: "John" } };
		const action = logout();
		const result = authReducer(initialState, action);
		expect(result.user).toBeNull();
		expect(localStorageMock.removeItem).toHaveBeenCalledWith("user");
	});
});
