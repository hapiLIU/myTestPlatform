import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface TaskState {

}

const initialState: TaskState = {

}

export const initTaskSlice = createAsyncThunk(
    'task/slice-init',
    async (args, thunkApi) => {

    }
)

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {


    },
    extraReducers: (builder) => {
        builder

    },
})

export default taskSlice.reducer
