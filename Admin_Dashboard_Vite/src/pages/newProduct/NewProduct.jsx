import "./newProduct.css";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useCreateProductMutation } from "../../redux/api/productApi";

const options = [
	"electronics",
	"shoes",
	"furniture",
	"fashion",
	"gaming",
	"fitness",
];
export default function NewProduct() {
	const navigate = useNavigate();
	const [createProduct, { isLoading }] = useCreateProductMutation();

	// ✅ validation schema
	const validationSchema = Yup.object({
		title: Yup.string()
			.min(3, "Too short")
			.required("Product title is required"),

		price: Yup.number()
			.typeError("Price must be a number")
			.positive("Must be positive")
			.required("Price is required"),

		inStock: Yup.string().required(),
		active: Yup.string().required(),
		img: Yup.string().required(),
		categories: Yup.array().min(1, "Select at least one category"),
	});

	// ✅ formik setup
	const formik = useFormik({
		initialValues: {
			title: "",
			price: "",
			inStock: "yes",
			active: "yes",
			img: "",
			categories: ["electronics"],
			sales: [],
		},

		validationSchema,

		onSubmit: async (values) => {
			try {
				const payload = {
					title: values.title,
					price: Number(values.price),
					inStock: values.inStock === "yes",
					active: values.active === "yes",
					img: values.img,
					categories: values.categories,
					sales: values.sales || [],
				};

				await createProduct(payload).unwrap();

				toast.success("✅ Product created successfully!");
				formik.resetForm();
				navigate("/products");
			} catch (err) {
				toast.error(err?.data?.message || "❌ Failed to create product");
			}
		},
	});

	return (
		<div className='newProduct'>
			<h1 className='addProductTitle'>New Product</h1>

			<form className='addProductForm' onSubmit={formik.handleSubmit}>
				{/* NAME */}
				<div className='addProductItem'>
					<label>Name</label>
					<input
						type='text'
						name='title'
						placeholder='Apple AirPods'
						{...formik.getFieldProps("title")}
					/>
					{formik.touched.title && formik.errors.title && (
						<span className='error'>{formik.errors.title}</span>
					)}
				</div>
				<div className='addProductItem'>
					<label>Image</label>
					<input
						type='text'
						name='img'
						placeholder='https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=500&q=80&fm=webp'
						{...formik.getFieldProps("img")}
					/>
					{formik.touched.img && formik.errors.img && (
						<span className='error'>{formik.errors.img}</span>
					)}
				</div>

				{/* PRICE */}
				<div className='addProductItem'>
					<label>Price</label>
					<input
						type='number'
						name='price'
						placeholder='999'
						{...formik.getFieldProps("price")}
					/>
					{formik.touched.price && formik.errors.price && (
						<span className='error'>{formik.errors.price}</span>
					)}
				</div>

				{/* STOCK */}
				<div className='addProductItem'>
					<label>In Stock</label>
					<select {...formik.getFieldProps("inStock")}>
						<option value='yes'>Yes</option>
						<option value='no'>No</option>
					</select>
				</div>

				{/* ACTIVE */}
				<div className='addProductItem'>
					<label>Active</label>
					<select {...formik.getFieldProps("active")}>
						<option value='yes'>Yes</option>
						<option value='no'>No</option>
					</select>
				</div>
				<div className='addProductItem'>
					<label>Category</label>
					<select
						value={formik.values.categories}
						onChange={(e) =>
							formik.setFieldValue(
								"categories",
								Array.from(e.target.selectedOptions, (opt) => opt.value),
							)
						}
					>
						{options.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>
				</div>

				{/* BUTTON */}
				<button className='addProductButton' type='submit' disabled={isLoading}>
					{isLoading ? "Creating..." : "Create"}
				</button>
			</form>
		</div>
	);
}
