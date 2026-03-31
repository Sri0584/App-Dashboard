import { apiSlice } from "./apiSlice";

export const transactionApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTransactions: builder.query({
			query: () => "/transactions",
		}),
	}),
});

export const { useGetTransactionsQuery } = transactionApi;
