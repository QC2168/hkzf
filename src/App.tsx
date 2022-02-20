import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';
import News from './pages/News';
import Map from './pages/Map';
import Detail from './pages/Detail';
import Profile from './pages/Profile';
import TabBar from './components/TabBar';
import Login from './pages/Login';
import './App.less';
import {
    PieOutline,
    SearchOutline,
    FileOutline,
    UserOutline,
} from 'antd-mobile-icons';
import {useMount} from 'react-use';

const navs = [
    {
        icon: PieOutline,
        title: '首页',
        key: '/Home',
    },
    {
        icon: SearchOutline,
        title: '找房',
        key: '/List',
    },
    {
        icon: FileOutline,
        title: '资讯',
        key: '/News',
    },
    {
        icon: UserOutline,
        title: '我的',
        key: '/Profile',
    },
];
const showTabbarPages = ['/Home',
    '/List',
    '/News', '/Profile', '/'];
export default () => {
    let location = useLocation();
    useMount(() => {
    });
    useEffect(() => {
        console.log(location.pathname);
    }, [location]);
    return (
        <div id="app">
            {/* 所有路由都嵌套在其中 */}
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/Home" element={<Home/>}/>
                <Route path="/List" element={<List/>}/>
                <Route path="/News" element={<News/>}/>
                <Route path="/Profile" element={<Profile/>}/>
                <Route path="/Login" element={<Login/>}/>
                <Route path="/Map" element={<Map/>}/>
                <Route path="/Detail/:id" element={<Detail/>}/>
            </Routes>
            {showTabbarPages.includes(location.pathname) ? <TabBar tabs={navs}/> : ''}
        </div>
    );
}

