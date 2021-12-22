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
        return response.data
    }
)

//获取头像列表
export const getAllAvatars = createAsyncThunk(
    'page/avatars',
    async () => {
        const response = await axios.get('http://localhost:9817/getAvatar')
        return response.data
    }
)

export const initPageSlice = createAsyncThunk(
    'page/slice-init',
    async (args, thunkApi) => {
        thunkApi.dispatch(getAllUsers())
        thunkApi.dispatch(getAllAvatars())
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
            .addCase(getAllAvatars.fulfilled, (state, action) => {
                state.avatarList = action.payload
            })
            .addCase(initPageSlice.fulfilled, (state, action) => {
                console.log('initPageSlice start')
            })
    },
})

export default pageSlice.reducer
