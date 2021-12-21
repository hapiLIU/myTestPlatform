import { Avatar, Badge, Button, Image, message, Upload } from 'antd'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { UserOutlined, InboxOutlined } from '@ant-design/icons';
import { LoginUser } from '../cookie/cookie';
import Modal from 'antd/lib/modal/Modal';
import axios from 'axios';
import { stringify } from 'querystring';
import ImgCrop from 'antd-img-crop';
import { OnChangeAvatar } from '../cookie/cookie';
import { getAllUsers, initPageSlice } from './page.slice'
import pageSelect from './page.selector'
import { useAppDispatch, useAppSelector } from '../cookie/hooks';


const { Dragger } = Upload
export default function OWN() {
    const cookie = LoginUser()
    const dispatch = useAppDispatch()
    const [changeAvatar, setChangeAvatar] = useState(false)     //上传头像弹框
    const [avatarList, setAvatarList]: any = useState([])       //获取头像列表
    useEffect(() => {
        dispatch(initPageSlice())
    }, [])
    const userAvatar = useAppSelector(pageSelect.selectUserList).filter((e: any) => {
        if (e.uid === cookie.uid) return e
    })[0]?.avatarName
    console.log(userAvatar)
    //确认头像更换
    const finshChange = () => {
        axios.get('http://localhost:9817/getAvatar').then(e => {
            setAvatarList(e.data)
        })
        setChangeAvatar(false)
    }
    useEffect(() => {
        let img = avatarList?.filter((e: any) => {
            if (e.uid === cookie.uid) return e
        })
        let ava = img[img.length - 1]?.filename
        if (ava !== undefined && ava !== '') {
            OnChangeAvatar({ uid: cookie.uid, avatarName: ava })
        }
        return
    }, [avatarList])
    return (
        <div style={{ width: '100%', height: '100%', backgroundColor: 'rgb(219 219 219)' }}>
            {/* <h1 style={{ textAlign: "center", lineHeight: '100px' }}><b>这里是Share</b></h1> */}
            <div style={{ width: 1000, height: '100%', margin: '0 auto', backgroundColor: 'rgb(255 255 255)', padding: '50px' }}>
                <div style={{ height: 128 }}>
                    <div style={{ width: 128, height: '100%', float: 'left' }}>
                        <Badge.Ribbon text={cookie?.utype == 'root' ? '管理员' : '普通用户'} placement='start' color={cookie?.utype == 'root' ? 'red' : ''} style={{ display: 'inline-block' }}>
                            {/* <Avatar size={128} icon={<UserOutlined />} /> */}
                            <Image src={userAvatar === undefined ? cookie.avatarName === '' ? 'https://img0.baidu.com/it/u=2211870254,3716611573&fm=26&fmt=auto' : `http://localhost:9817/avatar/${cookie.avatarName}` : `http://localhost:9817/avatar/${userAvatar}`} style={{ height: 128, width: 128, borderRadius: '50%' }} preview={false} onClick={(e) => { console.log(e) }} />
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
                            <ImgCrop rotate
                                modalTitle='裁剪图片'
                                modalOk='完成'
                                modalCancel='取消'
                                shape='round'
                            >
                                <Dragger
                                    style={{ marginTop: 20 }}
                                    name='file'
                                    listType='picture'
                                    accept='.png,.gif,.jpg,.svg,.webp'
                                    action='http://localhost:9817/upload'
                                    maxCount={1}
                                    withCredentials={true}
                                    beforeUpload={(e) => {
                                        const isLt2M = e.size / 1024 / 1024 < 2;
                                        if (!isLt2M) {
                                            message.error('Image must smaller than 2MB!');
                                        }
                                        return isLt2M;
                                    }}
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
                                        formData.append('file', file);
                                        console.log(formData)
                                        axios
                                            .post(action, formData)
                                            .then((resp) => {
                                                onSuccess && onSuccess(resp.data, resp.request);
                                                let ava = resp.data[0]
                                                ava['uid'] = cookie.uid
                                                axios.post('http://localhost:9817/storeAvatar', stringify(ava))
                                            })
                                            .catch(onError);
                                    }}
                                >
                                    <p> <InboxOutlined /></p>
                                    <p >点击或拖动图片至此</p>
                                </Dragger>
                            </ImgCrop>
                            <div style={{ textAlign: 'center', marginTop: 20 }}>
                                <Button type="primary" style={{ marginRight: '20px' }} onClick={finshChange}>
                                    确定
                                </Button>
                                <Button onClick={() => { setChangeAvatar(false) }}>
                                    取消
                                </Button>
                            </div>
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
            </div >
        </div >
    )
}
