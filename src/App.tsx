import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home'
import List from './pages/List'
import News from './pages/News'
import Profile from './pages/Profile'
import TabBar from './components/TabBar'
import './App.less'
import { atom } from 'jotai'
import {
    PieOutline ,
    SearchOutline,
    FileOutline,
    UserOutline,
} from 'antd-mobile-icons'
import {useMount} from './utils';
import {useAtom} from 'jotai';
import {cityAtom,countAtom} from './atom';
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
export default ()=>{
    const [city, setCity] = useAtom(cityAtom);
    const [count, setCount] = useAtom(countAtom);
    useMount(()=>{

    })
  return (
      <div id="app">
          <Router>
              {/* 所有路由都嵌套在其中 */}
                  <Routes>
                      <Route path='/' element={<Home/>} />
                      <Route path='/Home' element={<Home/>} />
                      <Route path='/List' element={<List/>} />
                      <Route path='/News' element={<News/>} />
                      <Route path='/Profile' element={<Profile/>} />
                  </Routes>
              <TabBar tabs={navs}/>
          </Router>

      </div>

  )
}

