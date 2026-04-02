import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import RouteList from "./RouteList";

// Mock the lazy imports
vi.mock("../pages/login/Login", () => ({
	default: () => <div>Login Page</div>,
}));
vi.mock("../pages/register/Register", () => ({
	default: () => <div>Register Page</div>,
}));
vi.mock("../pages/logout/Logout", () => ({
	default: () => <div>Logout Page</div>,
}));
vi.mock("../pages/mail/Mail", () => ({ default: () => <div>Mail Page</div> }));
vi.mock("../pages/products/Product", () => ({
	default: () => <div>Product Page</div>,
}));
vi.mock("../pages/productList/ProductList", () => ({
	default: () => <div>ProductList Page</div>,
}));
vi.mock("../pages/userList/UserList", () => ({
	default: () => <div>UserList Page</div>,
}));
vi.mock("../pages/user/User", () => ({ default: () => <div>User Page</div> }));
vi.mock("../pages/newProduct/NewProduct", () => ({
	default: () => <div>NewProduct Page</div>,
}));
vi.mock("../pages/newUser/NewUser", () => ({
	default: () => <div>NewUser Page</div>,
}));

// Mock analytics API
vi.mock("../redux/api/analyticsApi", () => ({
	useGetAnalyticsQuery: () => ({
		data: {
			users: 100,
			revenue: 1500,
			sales: 250,
			revenueChange: 16,
			salesChange: 8,
			userChange: 5,
		},
		isLoading: false,
	}),
	useGetUserStatsQuery: () => ({
		data: [{ name: "Jan", users: 10 }],
		isLoading: false,
	}),
}));

describe("RouteList", () => {
	it("renders the home route", () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<RouteList />
				</MemoryRouter>
			</Provider>,
		);
		expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
	});

	it("renders the logout route", async () => {
		render(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/logout"]}>
					<RouteList />
				</MemoryRouter>
			</Provider>,
		);

		expect(await screen.findByText(/logout page/i)).toBeInTheDocument();
	});
});
