import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
    id: number
}

const initialState: Todo = {
    id: 0
}

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setId: (state, action: PayloadAction<number>) => {
            state.id = action.payload
        },
    },
})

export const {setId} = globalSlice.actions
export default globalSlice.reducer