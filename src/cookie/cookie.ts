import cookie from 'react-cookies'

// 获取当前用户cookie
export const loginUser = () => {
    return cookie.load('userInfo')
}

// 用户登录，保存cookie
export const onLogin = (user: any) => {
    if (user.loginUsername === 'liuyuan' && user.loginPassword === '123') {
        cookie.save("userInfo", user, { path: '/' })
        return 1
    }
    return 0
}

// 用户登出，删除cookie
export const logout = () => {
    cookie.remove('userInfo')
    window.location.href = '/'
}
