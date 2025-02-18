import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./usersState";

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export default usersSlice.reducer;
