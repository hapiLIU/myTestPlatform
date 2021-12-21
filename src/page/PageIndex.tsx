import React, { useEffect, useState } from 'react'
import HomePage from './HomePage';
import ChatRoom from './ChatRoom';
import WorkBench from './WorkBench';
import Share from './Share';
import OWN from './OWN';
import { LoginUser } from '../cookie/cookie'
import { Layout, Menu } from 'antd';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
const { Header } = Layout;

export default function PageIndex() {
    const cookie = LoginUser()
    // console.log(cookie)
    const [keys, setKeys]: any = useState('homePage')
    const location = useLocation()
    let menuKey = location.pathname.split('/')
    useEffect(() => {
        setKeys(menuKey.length === 3 ? menuKey[2] : 'homePage')
        // eslint-disable-next-line
    }, [location])
    const BasicsLayout = () => {
        return (
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div style={{ color: 'white', float: 'left' }}>这里是个LOGO</div>
                    {/* eslint-disable-next-line */}
                    <a href='/index/own' style={{ color: 'white', float: 'right', marginLeft: 100 }}>欢迎您！ {cookie.uname}</a>
                    <Menu theme="dark" mode="horizontal" style={{ justifyContent: 'center' }} selectedKeys={[keys]}>
                        <Menu.Item key="homePage">
                            <Link to='/index'>首页简介</Link>
                        </Menu.Item>
                        <Menu.Item key="workbench">
                            <Link to='/index/workbench'>个人工作台</Link>
                        </Menu.Item>
                        <Menu.Item key="chatRoom">
                            <Link to='/index/chatRoom'>聊天讨论室</Link>
                        </Menu.Item>
                        <Menu.Item key="share">
                            <Link to='/index/share'>分享</Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Layout style={{ height: 910, marginTop: '64px' }}>
                    <Switch>
                        <Route exact path='/index'>
                            <HomePage />
                        </Route>
                        <Route exact path='/index/workbench'>
                            <WorkBench />
                        </Route>
                        <Route exact path='/index/chatRoom'>
                            <ChatRoom />
                        </Route>
                        <Route exact path='/index/share'>
                            <Share />
                        </Route>
                        <Route exact path='/index/own'>
                            <OWN />
                        </Route>
                    </Switch>
                </Layout>
            </Layout >
        )
    }

    return (
        <div>
            <BasicsLayout />
        </div>
    )
}
