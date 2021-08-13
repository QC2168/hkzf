import React from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
// 导入页面组件
import home from "./pages/home/home";
import cityList from "./pages/cityList/cityList";

function App() {
    return (
        <Router>
            <div className="App">
                {/*匹配导航菜单*/}
                <Link to={"/home"}>首页</Link>
                <Link to={"/cityList"}>城市列表</Link>
                <Route path={"/home"} component={home}/>
                <Route path={"/cityList"} component={cityList}/>
            </div>
        </Router>

    )
}

export default App
