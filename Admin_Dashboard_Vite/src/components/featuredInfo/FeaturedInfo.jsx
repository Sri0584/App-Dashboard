import "./featuredinfo.css";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import ArrowUpward from "@mui/icons-material/ArrowUpward";

const FeaturedInfo = ({ data }) => {
	if (!data) return <p>Loading...</p>;
	const items = [
		{
			title: "Revenue",
			value: data.revenue,
			change: data.revenueChange || 0,
			isCurrency: true,
		},
		{
			title: "Sales",
			value: data.sales,
			change: data.salesChange || 0,
			isCurrency: false,
		},
		{
			title: "Users",
			value: data.users,
			change: data.userChange || 0,
			isCurrency: false,
		},
	];

	return (
		<div className='featuredInfo'>
			{items.map((item, index) => {
				const isPositive = item.change >= 0;

				return (
					<div className='featuredItem' key={index}>
						<h1 className='featured-title'>{item.title}</h1>

						<div className='money'>
							<p>
								{item.isCurrency ? `$${item.value}` : item.value}

								<span>
									{item.change}

									{isPositive ?
										<ArrowUpward className='upward' />
									:	<ArrowDownward className='downward' />}
								</span>
							</p>
						</div>

						<p className='featured-info'>Compared to last month</p>
					</div>
				);
			})}
		</div>
	);
};

export default FeaturedInfo;
