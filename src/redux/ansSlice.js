import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    score: 0,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const scoreSlice = createSlice({
    name: "score",
    initialState,
    reducers: {
        addScore: (state) => {
            state.score = state.score + 1;
        },
        resetScore: (state) => {
            state.score = 0;
        },
    },
});

export const { addScore, resetScore } = scoreSlice.actions;
export default scoreSlice.reducer;
