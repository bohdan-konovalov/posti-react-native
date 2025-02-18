import { PostsStateInterface } from "../postsTypes";

export const initialState: PostsStateInterface = {
  posts: [],
  filteredPosts: [],
  selectedPostWithDetails: null,
  filter: null,
};
