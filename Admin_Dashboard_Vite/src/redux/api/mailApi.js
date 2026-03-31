import { apiSlice } from "./apiSlice";

export const mailApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		sendMail: builder.mutation({
			query: (data) => ({
				url: "/mail",
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const { useSendMailMutation } = mailApi;
