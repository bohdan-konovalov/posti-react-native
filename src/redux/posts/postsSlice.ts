import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./postsState";

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

export default postsSlice.reducer;
