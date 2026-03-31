import { apiSlice } from "./apiSlice";

export const productApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: () => "/products",
			providesTags: (result) =>
				result ?
					[
						...result.map(({ _id }) => ({ type: "Products", id: _id })),
						{ type: "Products", id: "LIST" },
					]
				:	[{ type: "Products", id: "LIST" }], // ✅ provides cache
		}),
		getProductById: builder.query({
			query: (id) => `/products/${id}`,
			providesTags: (result, error, id) => [{ type: "Product", id }],
		}),
		createProduct: builder.mutation({
			query: (data) => ({
				url: "/products",
				method: "POST",
				body: data,
			}),
		}),
		updateProduct: builder.mutation({
			query: ({ id, ...data }) => ({
				url: `/products/${id}`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
		}),
		deleteProduct: builder.mutation({
			query: (id) => ({
				url: `/products/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: (result, error, id) => [
				{ type: "Products", id },
				{ type: "Products", id: "LIST" },
			], // ✅ triggers refetch
		}),
	}),
});

export const {
	useGetProductsQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useDeleteProductMutation,
	useGetProductByIdQuery,
} = productApi;
