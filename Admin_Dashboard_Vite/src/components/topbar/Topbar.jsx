import "./Topbar.scss";
import {
	DarkMode,
	Language,
	LightMode,
	NotificationsNone,
	Settings,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../theme/ThemeProvider";

const Topbar = () => {
	const { user } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const { isDark, toggleTheme } = useTheme();

	const handleLogout = () => {
		navigate("/logout");
	};

	return (
		<div className='topbar'>
			<div className='topbarWrapper'>
				<div className='topLeft'>
					<div className='logo'>SSAdmin</div>
				</div>

				<div className='topRight'>
					<div className='topbarIconContainer'>
						<NotificationsNone />
						<span className='topbarIconBadge'>1</span>
					</div>

					<div className='topbarIconContainer'>
						<Language />
						<span className='topbarIconBadge'>3</span>
					</div>

					<div className='topbarIconContainer'>
						<Settings />
					</div>

					<button
						type='button'
						className='themeToggleBtn'
						onClick={toggleTheme}
						aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
					>
						{isDark ?
							<>
								<LightMode fontSize='small' />
								<span>Light</span>
							</>
						:	<>
								<DarkMode fontSize='small' />
								<span>Dark</span>
							</>
						}
					</button>

					{user ?
						<>
							<span className='topbarUsername'>
								{user.username || user.email}
							</span>

							<img
								src={
									user.profilePic ||
									"https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg"
								}
								alt='profile'
								className='topAvatar'
								loading='lazy'
								height={100}
								width={100}
							/>

							<button
								className='logoutBtn'
								onClick={handleLogout}
								aria-label='logout'
							>
								Logout
							</button>
						</>
					:	<button
							className='loginBtn'
							onClick={() => navigate("/login")}
							aria-label='login'
						>
							Login
						</button>
					}
				</div>
			</div>
		</div>
	);
};

export default Topbar;
