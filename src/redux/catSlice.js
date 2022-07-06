import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    categories: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getCategories = createAsyncThunk(
    "categories/getCategories",
    async (_, thunkAPI) => {
        const uri = `https://opentdb.com/api_category.php`;
        try {
            const resp = await axios(uri);
            // console.log(resp);
            return resp.data.trivia_categories;
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

export const catSlice = createSlice({
    name: "categories",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.categories = action.payload;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export default catSlice.reducer;
