import cookie from 'react-cookies'
import axios from 'axios'

//获取所有用户列表
export const UserList = async () => {
    // axios.get('http://localhost:9817/list').then(e => { console.log(e) })
    let result: any = await new Promise((resolve) => {
        axios.get('http://localhost:9817/list').then(res => {
            resolve(res.data)
        })
    })
    return result
}

// 获取当前用户cookie
export const LoginUser = () => {
    return cookie.load('userInfo')
}

// 用户登录，保存cookie
export const OnLogin = async (user: any) => {
    let result: any = await new Promise((resolve) => {
        axios.post('http://localhost:9817/login', `uname=${user.loginUsername}&upwd=${user.loginPassword}`).then(res => {
            resolve(res.data[0])
        })
    })
    if (result !== undefined) {
        cookie.save("userInfo", result, { path: '/' })
        return 1
    }
    return 0
}

//用户注册
export const OnReg = async (user: any) => {
    let result = await new Promise((resolve) => {
        axios.post('http://localhost:9817/reg', `uname=${user.signUsername}&upwd=${user.signPassword}&uemail=${user.signEmail}`).then(res => {
            resolve(res.data)
        })
    })
    return result
}

//用户修改头像
export const OnChangeAvatar = async (user: any) => {
    let result = await new Promise((resolve) => {
        axios.patch('http://localhost:9817/changeAvatar', `uid=${user.uid}&avatarName=${user.avatarName}`).then(res => {
            resolve(res.data)
        })
    })
    return result
}

// 用户登出，删除cookie
export const Logout = () => {
    cookie.remove('userInfo')
    window.location.href = '/'
}
