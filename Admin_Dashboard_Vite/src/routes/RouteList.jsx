import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import NewProduct from "../pages/newProduct/NewProduct";
import NewUser from "../pages/newUser/NewUser";
import User from "../pages/user/User";
import UserList from "../pages/userList/UserList";
import ProductList from "../pages/productList/ProductList";
import Product from "../pages/products/Product";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Mail from "../pages/mail/Mail";

const RouteList = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />

			{/* USERS */}
			<Route path='/users' element={<UserList />} />
			<Route path='/user/:id' element={<User />} />
			<Route path='/newuser' element={<NewUser />} />

			{/* PRODUCTS */}
			<Route path='/products' element={<ProductList />} />
			<Route path='/product/:id' element={<Product />} />
			<Route path='/newproduct' element={<NewProduct />} />

			{/* AUTH */}
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />

			<Route path='/mail' element={<Mail />} />
		</Routes>
	);
};

export default RouteList;
