import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface PageState {
    userList: any
    avatarList: any
}

const initialState: PageState = {
    userList: [],
    avatarList: []
}

//获取用户列表
export const getAllUsers = createAsyncThunk(
    'page/users',
    async () => {
        const response = await axios.get('http://localhost:9817/list')
        console.log(response)
        return response.data
    }
)

export const initPageSlice = createAsyncThunk(
    'page/slice-init',
    async (args, thunkApi) => {
        thunkApi.dispatch(getAllUsers())
    }
)

export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.userList = action.payload
            })
            .addCase(initPageSlice.fulfilled, (state, action) => {
                console.log('initPageSlice start')
            })
    },
})

export default pageSlice.reducer
