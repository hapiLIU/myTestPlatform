import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import qs from 'querystring'

export interface PageState {
    userList: any
    avatarList: any
    inforList: any
}

const initialState: PageState = {
    userList: [],
    avatarList: [],
    inforList: []
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

//获取个人基本信息
export const getAllInfor = createAsyncThunk(
    'page/get-infor',
    async () => {
        const response = await axios.get('http://localhost:9817/inforList')
        return response.data
    }
)

//新增个人基本信息
export const addInfor = createAsyncThunk(
    'page/add-infor',
    async (infor: {
        uid: number
        nickname: string
        Gender: string
        birth: string
        location: string
        introduce: string
    }) => {
        const response = await axios.post('http://localhost:9817/addInfor', qs.stringify(infor), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        return response.data
    }
)

//修改个人基本信息
export const changeInfor = createAsyncThunk(
    'page/change-infor',
    async (infor: {
        id: number
        uid: number
        nickname: string
        Gender: string
        birth: string
        location: string
        introduce: string
    }) => {
        const response = await axios.put('http://localhost:9817/changeInfor', qs.stringify(infor), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        return response.data
    }
)

export const initPageSlice = createAsyncThunk(
    'page/slice-init',
    async (args, thunkApi) => {
        thunkApi.dispatch(getAllUsers())
        thunkApi.dispatch(getAllAvatars())
        thunkApi.dispatch(getAllInfor())
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
            .addCase(getAllInfor.fulfilled, (state, action) => {
                state.inforList = action.payload
            })
            .addCase(initPageSlice.fulfilled, (state, action) => {
                console.log('initPageSlice start')
            })
    },
})

export default pageSlice.reducer
