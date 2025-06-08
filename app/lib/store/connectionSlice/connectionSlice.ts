import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeedItem } from "../feedSlice/feedSlice";

interface ConnectionState {
  items: FeedItem[];
}

const initialState: ConnectionState = {
  items: [],
};

const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
    addConnections: (state, action: PayloadAction<FeedItem[]>) => {
      state.items = action.payload;
    },
    removeConnections: (state) => {
      state.items = [];
    },
  },
});

export const { addConnections, removeConnections } = connectionSlice.actions;
export default connectionSlice.reducer;
