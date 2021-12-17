import { Avatar, Badge, Form, Image, Upload } from 'antd'
import React, { useState } from 'react'
import { UserOutlined, InboxOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import { LoginUser } from '../cookie/cookie';
import Modal from 'antd/lib/modal/Modal';
import axios from 'axios';
const { Dragger } = Upload
export default function OWN() {
    const cookie = LoginUser()
    console.log(cookie)
    const [changeAvatar, setChangeAvatar] = useState(false)     //上传头像弹框

    return (
        <div style={{ width: '100%', height: '100%', backgroundColor: 'rgb(219 219 219)' }}>
            {/* <h1 style={{ textAlign: "center", lineHeight: '100px' }}><b>这里是Share</b></h1> */}
            <div style={{ width: 1000, height: '100%', margin: '0 auto', backgroundColor: 'rgb(255 255 255)', padding: '50px' }}>
                <div style={{ height: 128 }}>
                    <div style={{ width: 128, height: '100%', float: 'left' }}>
                        <Badge.Ribbon text={cookie?.utype == 'root' ? '管理员' : '普通用户'} placement='start' color={cookie?.utype == 'root' ? 'red' : ''} style={{ display: 'inline-block' }}>
                            {/* <Avatar size={128} icon={<UserOutlined />} /> */}
                            <Image src='https://img0.baidu.com/it/u=2211870254,3716611573&fm=26&fmt=auto' style={{ height: 128, width: 128, borderRadius: '50%' }} preview={false} onClick={(e) => { console.log(e) }} />
                        </Badge.Ribbon>
                    </div>
                    <div style={{ width: 200, height: '100%', float: 'left' }}>
                        <span style={{ fontSize: '30px', marginLeft: '30px', lineHeight: '100px' }}>{cookie?.uname}</span><br />
                        <a style={{ marginLeft: '30px', lineHeight: '28px' }} onClick={() => { setChangeAvatar(true) }}>更换头像 {'>'}</a>
                        <Modal
                            visible={changeAvatar}
                            onCancel={() => { setChangeAvatar(false) }}
                            footer={null}
                        >
                            <Dragger
                                name='file'
                                listType='picture'
                                accept='.png,.gif,.jpg,.svg,.webp'
                                action='http://localhost:9817/upload'
                                maxCount={1}
                                onChange={(info) => { console.log(info) }}
                                withCredentials={true}
                                progress={{
                                    strokeColor: {
                                        '0%': '#108ee9',
                                        '100%': '#87d068',
                                    },
                                    strokeWidth: 3,
                                    format: (percent: any) => `${parseFloat(percent?.toFixed(2))}%`,
                                }}
                                customRequest={(option) => {
                                    const { action, file, onError, onSuccess } = option;
                                    const formData = new FormData();
                                    console.log(option)
                                    console.log(file)
                                    formData.append('file', file);
                                    console.log(formData)
                                    axios
                                        .post(action, formData)
                                        .then((resp) => {
                                            onSuccess && onSuccess(resp.data, resp.request);
                                        })
                                        .catch(onError);
                                }}
                            >
                                <p> <InboxOutlined /></p>
                                <p >点击或拖动图片至此</p>
                            </Dragger>
                        </Modal>
                    </div>
                </div>

                {/* <h1><b>基本信息</b></h1>
                <Form
                    name='info'

                >
                    <Form.Item name='portrait'>

                    </Form.Item>
                    <Form.Item name='nickName' label='昵称'>

                    </Form.Item>
                    <Form.Item name='userName' label='账号'>

                    </Form.Item>
                    <Form.Item name='setUserPwd' label='修改密码'>

                    </Form.Item>
                    <Form.Item name='intro' label='个人简介'>

                    </Form.Item>
                </Form> */}
            </div>
        </div>
    )
}
