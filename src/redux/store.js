import { configureStore } from "@reduxjs/toolkit";
import quesReducer from "../redux/quesSlice";
import catReducer from "../redux/catSlice";
import userReducer from "../redux/userSlice";
import ansReducer from "../redux/ansSlice";

export const store = configureStore({
    reducer: {
        ques: quesReducer,
        categories: catReducer,
        user: userReducer,
        ans: ansReducer,
    },
});
