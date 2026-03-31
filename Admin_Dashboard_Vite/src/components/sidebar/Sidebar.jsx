import "./Sidebar.css";
import { Link } from "react-router-dom";
import LineStyle from "@mui/icons-material/LineStyle";
import Timeline from "@mui/icons-material/Timeline";
import TrendingUp from "@mui/icons-material/TrendingUp";
import PermIdentity from "@mui/icons-material/PermIdentity";
import Storefront from "@mui/icons-material/Storefront";
import AttachMoney from "@mui/icons-material/AttachMoney";
import BarChart from "@mui/icons-material/BarChart";
import MailOutline from "@mui/icons-material/MailOutline";
import DynamicFeed from "@mui/icons-material/DynamicFeed";
import ChatBubbleOutline from "@mui/icons-material/ChatBubbleOutline";
import WorkOutline from "@mui/icons-material/WorkOutline";
import Report from "@mui/icons-material/Report";

const Sidebar = () => {
	return (
		<div className='sidebar'>
			<div className='sidebar-wrapper'>
				<div className='sidebar-menu'>
					<h3 className='sidebar-title'>Dashboard</h3>
					<ul>
						<Link to='/'>
							<li className='sidebar-icons'>
								<LineStyle className='sidebar-icon' />
								Home
							</li>
						</Link>
						<li className='sidebar-icons'>
							<Timeline className='sidebar-icon' />
							Analytics
						</li>
						<li className='sidebar-icons'>
							<TrendingUp className='sidebar-icon' />
							Sales
						</li>
					</ul>
				</div>
				<div className='sidebar-menu'>
					<h3 className='sidebar-title'>Quick Menu</h3>
					<ul>
						<Link to='/users'>
							<li className='sidebar-icons'>
								<PermIdentity className='sidebar-icon' />
								Users
							</li>
						</Link>
						<Link to='/products'>
							<li className='sidebar-icons'>
								<Storefront className='sidebar-icon' />
								Products
							</li>
						</Link>
						<li className='sidebar-icons'>
							<AttachMoney className='sidebar-icon' />
							Transactions
						</li>
						<li className='sidebar-icons'>
							<BarChart className='sidebar-icon' />
							Reports
						</li>
					</ul>
				</div>
				<div className='sidebar-menu'>
					<h3 className='sidebar-title'>Notifications</h3>
					<ul>
						<Link to='/mail'>
							<li className='sidebar-icons'>
								<MailOutline className='sidebar-icon' />
								Mail
							</li>
						</Link>
						<li className='sidebar-icons'>
							<DynamicFeed className='sidebar-icon' />
							Feedback
						</li>
						<li className='sidebar-icons'>
							<ChatBubbleOutline className='sidebar-icon' />
							Messages
						</li>
					</ul>
				</div>
				<div className='sidebar-menu'>
					<h3 className='sidebar-title'>Staff</h3>
					<ul>
						<li className='sidebar-icons'>
							<WorkOutline className='sidebar-icon' />
							Manage
						</li>
						<li className='sidebar-icons'>
							<Timeline className='sidebar-icon' />
							Analytics
						</li>
						<li className='sidebar-icons'>
							<Report className='sidebar-icon' />
							Reports
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
