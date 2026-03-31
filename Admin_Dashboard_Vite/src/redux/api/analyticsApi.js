import { apiSlice } from "./apiSlice";

export const analyticsApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAnalytics: builder.query({
			query: () => "/analytics",
		}),
		getUserStats: builder.query({
			query: () => "/analytics/users", // create this in backend
		}),
	}),
});

export const { useGetAnalyticsQuery, useGetUserStatsQuery } = analyticsApi;
