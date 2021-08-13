import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
//antd-mobile 样式文件
import 'antd-mobile/dist/antd-mobile.css';
import './index.css'
//导入字体
import 'assets/font/iconfont.css'
ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
)
