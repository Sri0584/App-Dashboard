import { useEffect, useState } from "react";
import "./SalesInput.css";

const monthsList = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

const SalesInput = ({ sales = [], onChange }) => {
	const [data, setData] = useState([]);
	useEffect(() => {
		setData(sales || []);
	}, [sales]);

	const handleChange = (index, field, value) => {
		const updated = structuredClone(data);
		updated[index][field] = field === "sales" ? Number(value) : value;

		setData(updated);
		onChange(updated, "sales");
	};

	const addRow = () => {
		const updated = structuredClone(data);
		updated.push({ month: "Jan", sales: 0 });
		setData(updated);
	};

	const removeRow = (index) => {
		const updated = structuredClone(data);
		updated.splice(index, 1);
		setData(updated);
	};

	return (
		<div className='salesInput'>
			<h3>Sales Data</h3>

			{data.map((item, index) => (
				<div className='salesRow' key={index}>
					<select
						value={item.month}
						onChange={(e) => handleChange(index, "month", e.target.value)}
					>
						{monthsList.map((m) => (
							<option key={m} value={m}>
								{m}
							</option>
						))}
					</select>

					<input
						type='number'
						value={item.sales}
						onChange={(e) => handleChange(index, "sales", e.target.value)}
						placeholder='Sales'
					/>

					<button onClick={() => removeRow(index)} type='button'>
						❌
					</button>
				</div>
			))}

			<button className='addBtn' type='button' onClick={addRow}>
				+ Add Month
			</button>
		</div>
	);
};

export default SalesInput;
