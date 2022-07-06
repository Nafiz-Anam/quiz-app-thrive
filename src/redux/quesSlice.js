import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get user from localStorage
// const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    ques: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getQues = createAsyncThunk(
    "ques/getQues",
    async (data, thunkAPI) => {
        // console.log("state from thunkAPI => ", thunkAPI.getState());
        // console.log("data from slice =>", data);
        const uri = `https://opentdb.com/api.php?amount=${data.ques_amount}&category=${data.category}&difficulty=${data.difficulty}&type=${data.type}`;
        console.log(uri);
        try {
            const resp = await axios(uri);
            // console.log(resp);
            return resp.data.results;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            // console.log("message =>", message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const quesSlice = createSlice({
    name: "question",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getQues.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getQues.fulfilled, (state, action) => {
                // console.log(action);
                state.isLoading = false;
                state.isSuccess = true;
                state.ques = action.payload;
            })
            .addCase(getQues.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export default quesSlice.reducer;
