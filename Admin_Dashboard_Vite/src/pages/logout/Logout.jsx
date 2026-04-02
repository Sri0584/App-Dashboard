import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authslice";
import "./logout.css";

export default function Logout() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(logout());

		const timeoutId = window.setTimeout(() => {
			navigate("/login");
		}, 1200);

		return () => window.clearTimeout(timeoutId);
	}, [dispatch, navigate]);

	return (
		<div className='logoutPage'>
			<div className='logoutCard'>
				<p className='logoutEyebrow'>Session update</p>
				<h1 className='logoutTitle'>Signing you out</h1>
				<p className='logoutCopy'>
					Your admin session is being cleared securely. Redirecting to login.
				</p>
			</div>
		</div>
	);
}
