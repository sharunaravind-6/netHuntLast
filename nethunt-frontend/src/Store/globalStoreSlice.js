import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice(
    {
        name:"global",
        initialState:{
            theme:"dark",
        },
        reducers: {
            changeTheme : (state)=>{
                state.theme = state.theme === "light" ? "dark" : "light";
            }
        }
    }
)
export const {changeTheme} = globalSlice.actions;
export const globalReducer = globalSlice.reducer 