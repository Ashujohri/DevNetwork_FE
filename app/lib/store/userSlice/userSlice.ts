import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  _id: string;
  email?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  about?: string;
  age?: number | string;
  createdAt?: string;
  gender?: string;
  photoUrl?: string;
  skills?: string[];
  updatedAt?: string;
  __v?: string;
}

export const initialState: UserState = {
  _id: "",
  email: "",
  password: "",
  firstname: "",
  lastname: "",
  about: "",
  age: "",
  createdAt: "",
  gender: "",
  photoUrl: "",
  skills: [],
  updatedAt: "",
  __v: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserState>) => {
      Object.assign(state, action.payload);
    },
    removeUser: (state) => {
      Object.keys(state).forEach((key) => {
        //@ts-expect-error 
        state[key] = "";
      });
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
