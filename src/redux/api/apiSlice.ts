import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { JSON_PLACEHOLDER_BASE_URL } from "src/config/urls";
import { Post, PostComment, User } from "./apiTypes";

export const jsonPlaceholderApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: JSON_PLACEHOLDER_BASE_URL }),
  endpoints: (builder) => ({
    // Posts
    getAllPosts: builder.query<Post[], void>({
      query: () => "posts",
    }),
    getPostsByUserId: builder.query<Post[], number>({
      query: (userId) => `posts?userId=${userId}`,
    }),
    getPostById: builder.query<Post, number>({
      query: (postId) => `posts/${postId}`,
    }),
    getPostComments: builder.query<PostComment[], number>({
      query: (postId) => `posts/${postId}/comments`,
    }),

    // Users
    getAllUsers: builder.query<User[], void>({
      query: () => "users",
    }),
    getUserById: builder.query<User, number>({
      query: (userId) => `users/${userId}`,
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostsByUserIdQuery,
  useGetPostByIdQuery,
  useGetPostCommentsQuery,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
} = jsonPlaceholderApiSlice;
