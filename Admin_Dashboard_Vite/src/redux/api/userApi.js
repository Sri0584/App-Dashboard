import { apiSlice } from "./apiSlice";

export const userApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query({
			query: () => "/users",
			providesTags: (result) =>
				result ?
					[
						...result.map(({ _id }) => ({ type: "Users", id: _id })),
						{ type: "Users", id: "LIST" },
					]
				:	[{ type: "Users", id: "LIST" }], // ✅ provides cache
		}),
		getUserById: builder.query({
			query: (id) => `/users/${id}`,
		}),
		deleteUser: builder.mutation({
			query: (id) => ({
				url: `/users/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: (result, error, id) => [
				{ type: "Users", id },
				{ type: "Users", id: "LIST" },
			], // ✅ triggers refetch
		}),
		updateUser: builder.mutation({
			query: ({ id, ...data }) => ({
				url: `/users/${id}`,
				method: "PUT",
				body: data,
			}),
		}),
		createUser: builder.mutation({
			query: (data) => ({
				url: "/users",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["User"],
		}),
	}),
});

export const {
	useGetUsersQuery,
	useDeleteUserMutation,
	useUpdateUserMutation,
	useCreateUserMutation,
	useGetUserByIdQuery,
} = userApi;
