import React, { useState } from 'react'
import { Menu, Layout, Button, Input } from 'antd'
import { stringify } from 'querystring';
import { parse } from 'path';
const { Sider, Content } = Layout
const { TextArea } = Input;
export default function WorkBench() {
    // const BasicsMenu = () => {
    //     return (
    //         <div></div>
    //     )
    // }
    const [initial, setInitial]: any = useState('initial-1')
    const BasicsContent = () => {
        const Content_1 = () => {
            const [inputVal, setInputVal]: any = useState()
            const [result, setResult]: any = useState()
            const runCode = () => {
                try {
                    const algorithm = Function(inputVal)
                    let res = algorithm()
                    console.log(res)
                    if (res === undefined) {
                        setResult(inputVal)
                    } else {
                        setResult(`${res}`)
                    }
                } catch (error: any) {
                    console.log(error)
                    setResult('输出错误')
                }
            }
            return (
                <div>
                    <TextArea placeholder='请在输出结果前+return，以保证能正确输出结果' rows={8} onChange={(e) => { setInputVal(e.target.value) }} />
                    <Button onClick={runCode} style={{ marginTop: '20px', marginBottom: '20px' }}>运行代码</Button>
                    <div>
                        输出结果：{result}
                    </div>
                </div >
            )
        }
        const Content_2 = () => {

            return (
                <div>
                    2222
                </div>
            )
        }
        const Content_3 = () => {

            return (
                <div>
                    33333
                </div>
            )
        }
        let ContentName = eval(`Content_${initial.split('-')[1]}`)
        return (
            <div>
                <ContentName />
            </div>
        )
    }
    return (
        <Layout>
            <Sider style={{ backgroundColor: 'white', height: 900 }}>
                <Menu mode="inline" onSelect={(e) => { setInitial(e.key) }} selectedKeys={[initial]}>
                    <Menu.Item key="initial-1">
                        算法
                    </Menu.Item>
                    <Menu.Item key="initial-2">
                        样式
                    </Menu.Item>
                    <Menu.Item key="initial-3">
                        Echarts
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Content style={{ padding: '20px' }}>
                    <BasicsContent />
                </Content>
            </Layout>
        </Layout>
    )
}
