import React from 'react';
import ReactDOM from 'react-dom';
// antd-mobile 样式文件
import 'antd-mobile/dist/antd-mobile.css';
// react-virtualized
import 'react-virtualized/styles.css';
import './index.css';
// 导入字体
import 'assets/font/iconfont.css';

// 避免css样式覆盖
import App from './App';

import './utils/url';

ReactDOM.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
  document.getElementById('root'),
);
