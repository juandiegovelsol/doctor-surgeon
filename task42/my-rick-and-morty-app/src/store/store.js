// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./apiSlice";
import characterReducer from "./characterSlice";
import locationReducer from "./locationSlice";
import episodeReducer from "./episodeSlice";

const store = configureStore({
  reducer: {
    api: apiReducer,
    characters: characterReducer,
    locations: locationReducer,
    episodes: episodeReducer,
  },
});

export default store;
