import { configureStore } from "@reduxjs/toolkit";
import quesReducer from "../redux/quesSlice";
import catReducer from "../redux/catSlice";
import userReducer from "../redux/userSlice";

export const store = configureStore({
    reducer: {
        ques: quesReducer,
        categories: catReducer,
        user: userReducer,
    },
});
