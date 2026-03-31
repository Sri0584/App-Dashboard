import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React from "react";
import "./category.css";
const options = [
	"electronics",
	"shoes",
	"furniture",
	"fashion",
	"gaming",
	"fitness",
];
const Category = ({ value, handleChange }) => {
	return (
		<Select
			onChange={handleChange}
			name='categories'
			value={value || ""}
			displayEmpty
			fullWidth
		>
			<MenuItem value=''>
				<em>Select Category</em>
			</MenuItem>
			{options.map((option) => (
				<MenuItem key={option} value={option}>
					{option}
				</MenuItem>
			))}
		</Select>
	);
};

export default Category;
