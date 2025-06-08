import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FeedItem {
  _id: string;
  firstname: string;
  lastname: string;
  about: string;
  skills: string[];
  age: string;
  gender: string;
  photoUrl: string;
}

interface FeedState {
  items: FeedItem[];
}

const initialState: FeedState = {
  items: [],
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setFeed: (state, action: PayloadAction<FeedItem[]>) => {
      state.items = action.payload;
    },
    addFeedItem: (state, action: PayloadAction<FeedItem>) => {
      state.items.unshift(action.payload);
    },
    clearFeed: (state) => {
      state.items = [];
    },
    notNowUser: (state) => {
      if (state.items.length > 0) {
        const first = state.items.shift();
        if (first) state.items.push(first);
      }
    },
    removeUserFromFeed: (state, action: PayloadAction<FeedItem>) => {
      state.items = state.items.filter(
        (user) => user?._id !== action.payload._id
      );
    },
  },
});

export const { setFeed, addFeedItem, clearFeed, notNowUser, removeUserFromFeed } =
  feedSlice.actions;
export default feedSlice.reducer;
