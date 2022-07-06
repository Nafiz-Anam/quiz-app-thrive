import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const userdata = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: userdata && userdata,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const setUser = createAsyncThunk("auth/login", async (data) => {
    await localStorage.setItem("user", JSON.stringify(data));
});
export const removeUser = createAsyncThunk("auth/logout", async () => {
    await localStorage.removeItem("user");
});

export const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(setUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(setUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.meta.arg;
            })
            .addCase(setUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(removeUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = [];
            });
    },
});

export default userSlice.reducer;
