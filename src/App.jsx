import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
// 导入页面组件
import Home from './pages/Home/Home';
import CityList from './pages/CityList/CityList';
import Map from './pages/Home/childComponents/Map/Map';

function App() {
  return (
    <Router>
      <div className="App">
        {/* 默认路由 */}
        <Route path="/" render={() => <Redirect to="/home" />} />
        {/* 路由匹配 */}
        <Route path="/home" component={Home} />
        <Route path="/CityList" component={CityList} />
        <Route path="/Map" component={Map} />
      </div>
    </Router>

  );
}

export default App;
