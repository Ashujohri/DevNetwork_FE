import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice/userSlice";
import feedReducer from "./feedSlice/feedSlice";
import connectionReducer from "./connectionSlice/connectionSlice";
import requestReducer from "./RequestSlice/RequestSlice";

export const store = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      feed: feedReducer,
      connection: connectionReducer,
      requests: requestReducer,
    },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
