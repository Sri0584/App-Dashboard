import "./newUser.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useCreateUserMutation } from "../../redux/api/userApi"; // adjust path if needed
import { useNavigate } from "react-router-dom";

export default function NewUser() {
	const navigate = useNavigate();
	const [createUser, { isLoading }] = useCreateUserMutation();

	const formik = useFormik({
		initialValues: {
			username: "",
			fullName: "",
			email: "",
			password: "",
			phone: "",
			address: "",
			gender: "male",
			active: "yes",
		},

		validationSchema: Yup.object({
			username: Yup.string().required("Required"),
			fullName: Yup.string().required("Required"),
			email: Yup.string().email("Invalid email").required("Required"),
			password: Yup.string().min(6, "Min 6 chars").required("Required"),
			phone: Yup.string().required("Required"),
		}),

		onSubmit: async (values, { resetForm }) => {
			try {
				await createUser(values).unwrap();
				toast.success("User created successfully 🚀");
				resetForm();
				navigate("/users");
			} catch (err) {
				toast.error(err?.data?.message || "Failed to create user ❌");
			}
		},
	});

	return (
		<div className='newUser'>
			<h1 className='newUserTitle'>New User</h1>

			<form className='newUserForm' onSubmit={formik.handleSubmit}>
				<div className='newUserItem'>
					<label>Username</label>
					<input
						type='text'
						name='username'
						placeholder='john'
						value={formik.values.username}
						onChange={formik.handleChange}
					/>
					{formik.errors.username && <span>{formik.errors.username}</span>}
				</div>

				<div className='newUserItem'>
					<label>Full Name</label>
					<input
						type='text'
						name='fullName'
						placeholder='John Smith'
						value={formik.values.fullName}
						onChange={formik.handleChange}
					/>
				</div>

				<div className='newUserItem'>
					<label>Email</label>
					<input
						type='email'
						name='email'
						placeholder='john@gmail.com'
						value={formik.values.email}
						onChange={formik.handleChange}
					/>
				</div>

				<div className='newUserItem'>
					<label>Password</label>
					<input
						type='password'
						name='password'
						placeholder='password'
						value={formik.values.password}
						onChange={formik.handleChange}
					/>
				</div>

				<div className='newUserItem'>
					<label>Phone</label>
					<input
						type='text'
						name='phone'
						placeholder='+1 123 456 78'
						value={formik.values.phone}
						onChange={formik.handleChange}
					/>
				</div>

				<div className='newUserItem'>
					<label>Address</label>
					<input
						type='text'
						name='address'
						placeholder='New York | USA'
						value={formik.values.address}
						onChange={formik.handleChange}
					/>
				</div>

				<div className='newUserItem'>
					<label>Gender</label>
					<div className='newUserGender'>
						{["male", "female", "other"].map((g) => (
							<label key={g}>
								<input
									type='radio'
									name='gender'
									value={g}
									checked={formik.values.gender === g}
									onChange={formik.handleChange}
								/>
								{g}
							</label>
						))}
					</div>
				</div>

				<div className='newUserItem'>
					<label>Active</label>
					<select
						className='newUserSelect'
						name='active'
						value={formik.values.active}
						onChange={formik.handleChange}
					>
						<option value='yes'>Yes</option>
						<option value='no'>No</option>
					</select>
				</div>

				<button type='submit' className='newUserButton' disabled={isLoading}>
					{isLoading ? "Creating..." : "Create"}
				</button>
			</form>
		</div>
	);
}
