import { Avatar, Badge, Button, Cascader, DatePicker, Descriptions, Form, Image, Input, message, Select, Upload } from 'antd'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { UserOutlined, InboxOutlined } from '@ant-design/icons';
import { LoginUser } from '../cookie/cookie';
import Modal from 'antd/lib/modal/Modal';
import axios from 'axios';
import { stringify } from 'querystring';
import ImgCrop from 'antd-img-crop';
import { addInfor, changeInfor, getAllUsers, initPageSlice } from './page.slice'
import pageSelect from './page.selector'
import { useAppDispatch, useAppSelector } from '../cookie/hooks';
import moment from 'moment';
const { TextArea } = Input;
const { Option } = Select;
const { Dragger } = Upload
export default function OWN() {
    const cookie = LoginUser()
    const dispatch = useAppDispatch()
    const [changeAvatar, setChangeAvatar] = useState(false)     //上传头像弹框
    useEffect(() => {
        dispatch(initPageSlice())
    }, [changeAvatar])
    const avatarName = useAppSelector(pageSelect.selectAvatarList).filter((e: any) => {
        if (e.uid === cookie.uid) return e
    })
    // console.log(avatarName[avatarName.length - 1]?.filename)
    const userAvatar = avatarName[avatarName.length - 1]?.filename

    //基本信息
    const [isEdit, setIsEdit] = useState(false)
    const china = require('../china/china.json')    //引入省市区json文件
    const information = useAppSelector(pageSelect.selectInforList).filter((e: any) => {
        if (e.uid === cookie.uid) return e
    })
    console.log(information)
    const formValue = information.map((e: any) => {
        return { nickname: e.nickname, Gender: e.Gender, introduce: e.introduce, location: e.location.split('/'), birth: moment(e.birth) }
    })
    const finshEdit = (e: any) => {
        if (!cookie.uid) { return }
        if (information.length == 0) {
            let result = {
                uid: Number(cookie.uid),
                Gender: e.Gender ? e.Gender : "",
                birth: e.birth ? moment(e.birth).format('YYYY-MM-DD') : "",
                introduce: e.introduce ? e.introduce : "",
                location: e.location ? e.location.join('/') : "",
                nickname: e.nickname ? e.nickname : ""
            }
            dispatch(addInfor(result))
        } else {
            let result = {
                id: information[0]?.id,
                uid: Number(cookie.uid),
                Gender: e.Gender,
                birth: e.birth !== null ? moment(e.birth).format('YYYY-MM-DD') : information[0].birth,
                introduce: e.introduce !== '' ? e.introduce : information[0].introduce,
                location: e.location.length !== 0 ? e.location.join('/') : information[0].location,
                nickname: e.nickname !== '' ? e.nickname : information[0].nickname
            }
            dispatch(changeInfor(result))
        }
        dispatch(initPageSlice())
        setIsEdit(false)
    }

    return (
        <div style={{ width: '100%', backgroundColor: 'rgb(242 242 242)' }}>
            <div style={{ width: 1000, height: '100%', margin: '0 auto', backgroundColor: 'rgb(242 242 242)', padding: '50px', paddingTop: 10 }}>
                <div style={{ height: 208, backgroundColor: 'rgb(255 255 255)', padding: '40px 40px' }}>
                    <div style={{ width: 128, height: '100%', float: 'left' }}>
                        <Badge.Ribbon text={cookie?.utype == 'root' ? '管理员' : '普通用户'} placement='start' color={cookie?.utype == 'root' ? 'red' : ''} style={{ display: 'inline-block' }}>
                            {userAvatar === undefined ? <Avatar size={128} icon={<UserOutlined />} /> : <Image src={`http://localhost:9817/avatar/${userAvatar}`} style={{ height: 128, width: 128, borderRadius: '50%' }} preview={false} />}
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
                                <Button type='primary' style={{ width: 100 }} onClick={() => setChangeAvatar(false)}>
                                    取消
                                </Button>
                            </div>
                        </Modal>
                    </div>
                </div>
                <Descriptions title="基本信息" style={{ marginTop: 10, backgroundColor: 'rgb(255 255 255)', padding: '40px 40px' }} labelStyle={{ width: 150, textAlign: 'center' }} bordered extra={<Button type="primary" onClick={() => setIsEdit(true)}>修改</Button>}>
                    <Descriptions.Item label="用户昵称" span={3}>{information[0]?.nickname}</Descriptions.Item>
                    <Descriptions.Item label="用&nbsp;户&nbsp;I&nbsp;D" span={3}>{cookie.uname}</Descriptions.Item>
                    <Descriptions.Item label="性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别" span={3}>{information[0]?.Gender}</Descriptions.Item>
                    <Descriptions.Item label="出生日期" span={3}>{information[0]?.birth}</Descriptions.Item>
                    <Descriptions.Item label="所在地区" span={3}>{information[0]?.location}</Descriptions.Item>
                    <Descriptions.Item label="个人简介" span={3}>{information[0]?.introduce}</Descriptions.Item>
                </Descriptions>
                <Modal
                    visible={isEdit}
                    footer={null}
                    onCancel={() => setIsEdit(false)}
                >
                    <Form name='infor' style={{ marginTop: 20 }} labelCol={{ span: 5 }} onFinish={finshEdit} initialValues={formValue[0]}>
                        <Form.Item label='用户昵称' name='nickname'>
                            <Input placeholder='请输入昵称' />
                        </Form.Item>
                        <Form.Item label='性别' name="Gender">
                            <Select style={{ width: 80 }}>
                                <Option value="男">男</Option>
                                <Option value="女">女</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label='出生日期' name="birth">
                            <DatePicker />
                        </Form.Item>
                        <Form.Item label='所在地区' name="location">
                            <Cascader options={china} placeholder='请选择所在地区' />
                        </Form.Item>
                        <Form.Item label='个人简介' name="introduce">
                            <TextArea placeholder='简单介绍自己，让更多人了解你' />
                        </Form.Item>
                        <Form.Item style={{ textAlign: 'center' }}>
                            <Button type="primary" htmlType="submit" style={{ marginRight: '20px' }}>
                                确定
                            </Button>
                            <Button onClick={() => setIsEdit(false)}>
                                取消
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Descriptions title="账号设置（功能暂未开发）" style={{ marginTop: 10, backgroundColor: 'rgb(255 255 255)', padding: '40px 40px' }} labelStyle={{ width: 150, textAlign: 'center' }} bordered contentStyle={{ textAlign: 'right' }} extra={<Button type="primary" onClick={() => console.log('账号设置')}>修改</Button>}>
                    <Descriptions.Item label="密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码" span={3}><a>修改密码</a></Descriptions.Item>
                    <Descriptions.Item label="邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱" span={3}>{cookie.uemail}<a style={{ marginLeft: 20 }}>修改邮箱</a></Descriptions.Item>
                    <Descriptions.Item label="账号注销" span={3}><a>立即注销</a></Descriptions.Item>
                </Descriptions>

            </div >
        </div >
    )
}
