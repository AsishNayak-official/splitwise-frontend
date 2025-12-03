import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  email: string;
  name: string;
  upiId: string;
  id: string;
}

type AuthState = {
  user: User | null;
};

const initialState: AuthState = {
  user : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuth: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    clearAuth: (state) => {
      state.user = null;
    },
  },
});
export const { updateAuth, clearAuth } =
  authSlice.actions;
export default authSlice.reducer;
