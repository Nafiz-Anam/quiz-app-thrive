import { configureStore } from "@reduxjs/toolkit";
import quesReducer from "../redux/quesSlice";
import catReducer from "../redux/catSlice";

export const store = configureStore({
    reducer: {
        ques: quesReducer,
        categories: catReducer,
    },
});
