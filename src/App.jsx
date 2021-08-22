import React from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
// 导入页面组件
import Home from "./pages/home/Home";
import CityList from "./pages/CityList/CityList";

function App() {
    return (
        <Router>
            <div className="App">
                {/*默认路由*/}
                <Route path={"/"}  render={() => <Redirect to={"/home"}/>} />
                {/*路由匹配*/}
                <Route path={"/home"} component={Home}/>
                <Route path={"/CityList"} component={CityList}/>
            </div>
        </Router>

    )
}

export default App
