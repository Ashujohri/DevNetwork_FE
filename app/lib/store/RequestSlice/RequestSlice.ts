import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeedItem } from "../feedSlice/feedSlice";

export interface RequestItems {
  _id: string;
  fromUserId: FeedItem;
  toUserId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface RequestState {
  items: RequestItems[];
}

const initialState: RequestState = {
  items: [],
};

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    addRequests: (state, action: PayloadAction<RequestItems[]>) => {
      state.items = action.payload;
    },
    removeRequest: (state, action: PayloadAction<{ _id: string }>) => {
      state.items = state.items.filter((req) => req._id !== action.payload._id);
    },
  },
});

export const { addRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
