import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query";
import { LoginRequest, UserResponse } from "../../mocks/handlers";
import { RootState } from "../store";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authentication", `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials
      })
    }),
    protected: builder.mutation({
      query: () => "protected"
    })
  })
});

export const { useLoginMutation, useProtectedMutation } = api;
