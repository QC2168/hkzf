import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
// 导入页面组件
import Home from './pages/Home/Home';
import CityList from './pages/CityList/CityList';
import Map from './pages/Map/Map';
import HouseDetail from './pages/HouseDetail/HouseDetail';
import Login from './pages/Login/Login';
import AutoRoute from './components/AuthRoute/AuthRoute';
import Favorite from './pages/Favorite/Favorite';

function App() {
  return (
    <Router>
      <div className="App">
        {/* 默认路由 */}
        <Route path="/" render={() => <Redirect to="/home" />} />
        <Route path="/login" component={Login} />
        {/* 路由匹配 */}
        {/* Home组件的父路由内容 */}
        <Route path="/home" component={Home} />
        <Route path="/CityList" component={CityList} />
        <Route path="/Map" component={Map} />
        {/* <AutoRoute path="/Map" component={Map} /> */}
        {/* 房源详情路由规则 */}
        <Route path="/detail/:id" component={HouseDetail} />
        <Route path="/favorite" component={Favorite} />

      </div>
    </Router>

  );
}

export default App;
