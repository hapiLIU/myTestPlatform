// import axios from 'axios'
import React, { useState } from 'react'
import { OnLogin, OnReg, UserList } from '../cookie/cookie'
import './login.css'
import { Button, Form, Input } from 'antd'
import { useHistory } from "react-router-dom";

export default function Login() {
    const history = useHistory()
    const [currentViewVal, setCurrentViewVal] = useState('signUp')
    // const [rootName, setRootName]: any = useState([])
    const changeView = (view: any) => {
        setCurrentViewVal(view)
    }
    const finish = async (e: any) => {
        switch (currentViewVal) {
            case 'signUp':
                console.log('注册')
                console.log(`用户名：${e.signUsername}，密码：${e.signPassword}，邮箱：${e.signEmail}`)
                console.log(await OnReg(e))
                // if (await OnReg(e) == 1) { changeView('logIn') }
                // if (await OnReg(e) === '0') {
                //     console.log('12323')
                // }
                break;
            case 'logIn':
                // console.log('登录')
                // console.log(`用户名：${e.loginUsername}，密码：${e.loginPassword}`)
                if (await OnLogin(e) === 1) {
                    history.push('/index')
                }
                break;
            case 'PWReset':
                console.log('重置密码')
                console.log(`邮箱：${e.resetEmail}`)
                break;
        }
    }
    //注册判断用户名是否已存在
    const [inpStatu, setInpStatu]: any = useState({ statu: 'success', message: '' })
    const inputBlur = async (e: any) => {
        let val = e.target.value
        let userList = await UserList()
        // eslint-disable-next-line
        let filter = userList.filter((e: any) => {
            if (e.uname === val) return e
        })
        if (filter.length > 0) {
            setInpStatu({ statu: 'error', message: '用户名重复' })
        } else {
            setInpStatu({ statu: 'success', message: '' })
        }
    }
    const CurrentView = () => {
        switch (currentViewVal) {
            case "signUp":
                return (
                    <Form
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        name='signUp'
                        onFinish={finish}
                    >
                        <h2>注 册 !</h2>
                        <Form.Item label='用户名' name='signUsername' rules={[{ required: true, message: '请输入需要注册的用户名！' }]} validateStatus={inpStatu.statu} help={inpStatu.message}>
                            <Input placeholder='请输入用户名' onBlur={inputBlur} />
                        </Form.Item>
                        <Form.Item label='邮箱' name='signEmail' rules={[{ required: true, message: '请输入邮箱！' }, { type: 'email', message: '请输入正确的邮箱！' }]}>
                            <Input placeholder='请输入邮箱' />
                        </Form.Item>
                        <Form.Item label='密码' name='signPassword' rules={[{ required: true, message: '请输入密码！' }]}>
                            <Input.Password placeholder='请输入密码' />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'center' }}>
                            <Button style={{ width: 360 }} htmlType="submit">注册</Button>
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'center' }}>
                            <Button onClick={() => changeView("logIn")} style={{ width: 360 }}>已有账号? 登录</Button>
                        </Form.Item>
                    </Form>
                )
            case "logIn":
                return (
                    <Form
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        name='logIn'
                        onFinish={finish}
                    >
                        <h2>欢迎使用自测自学小平台 !</h2>
                        <Form.Item label='用户名' name='loginUsername' rules={[{ required: true, message: '请输入用户名！' }]}>
                            <Input placeholder='请输入用户名' />
                        </Form.Item>
                        <Form.Item label='密码' name='loginPassword' rules={[{ required: true, message: '请输入密码！' }]}>
                            <Input.Password placeholder='请输入密码' />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'center' }}>
                            {/* eslint-disable-next-line */}
                            <a onClick={() => changeView("PWReset")}>忘 记 密 码 ?</a>
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'center' }}>
                            <Button style={{ width: 360 }} htmlType="submit">登录</Button>
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'center' }}>
                            <Button onClick={() => changeView("signUp")} style={{ width: 360 }}>创建账号</Button>
                        </Form.Item>
                    </Form>
                )
            case "PWReset":
                return (
                    <Form
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        name='PWDReset'
                        onFinish={finish}
                    >
                        <h2>重 置 密 码</h2>
                        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'center' }}>
                            <em>重 置 链 接 将 发 送 至 您 的 邮 箱 !</em>
                        </Form.Item>
                        <Form.Item label='邮箱' name='resetEmail' rules={[{ required: true, message: '请输入邮箱！' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'center' }}>
                            <Button style={{ width: 360 }} htmlType="submit">发送重置链接</Button>
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'center' }}>
                            <Button onClick={() => changeView("logIn")} style={{ width: 360 }}>返回</Button>
                        </Form.Item>
                    </Form>
                )
        }
    }
    return (
        <div id="entry-page">
            {CurrentView()}
        </div>
    )
}
