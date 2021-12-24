import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './cookie/store';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN' // 引入语言包
import moment from 'moment';
import 'moment/locale/zh-cn'
moment.locale('zh-cn') // 注意这里设置 moment 必须放在有 import 的后面。


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ConfigProvider locale={zhCN}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ConfigProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
