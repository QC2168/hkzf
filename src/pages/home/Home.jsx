import React, {Component} from 'react';
import {Route} from "react-router-dom";
import {TabBar} from 'antd-mobile';
import "./home.scss"
import Index from "./childComponents/Index/Index";
import List from "./childComponents/List/List";
import News from "./childComponents/News/News";
import Profile from "./childComponents/Profile/Profile";

const tabItems = [
    {
        title: "首页",
        icon: "icon-shouye2",
        path: "/home",
    },
    {
        title: "找房",
        icon: "icon-zhaofang",
        path: "/home/List",
    },
    {
        title: "资讯",
        icon: "icon-zixun",
        path: "/home/News",
    },
    {
        title: "我的",
        icon: "icon-wode1",
        path: "/home/Profile",
    },
]
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: this.props.location.pathname,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            // 路由发生切换
            this.setState({
                selectedTab: this.props.location.pathname
            });
        }
    }

    renderTabBarItem() {
        return tabItems.map(item => <TabBar.Item
            title={item.title}
            key={item.title}
            icon={
                <i className={`iconfont ${item.icon}`}/>
            }
            selectedIcon={
                <i className={`iconfont ${item.icon}`}/>
            }
            selected={this.state.selectedTab === item.path}
            onPress={() => {
                this.setState({
                    selectedTab: item.path,
                });
                //    路由切换
                this.props.history.push(item.path)
            }}
        />)
    }

    render() {
        return (
            <div className={"home"}>
                <Route exact path={"/home"} component={Index}/>
                <Route path={"/home/News"} component={News}/>
                <Route path={"/home/List"} component={List}/>
                <Route path={"/home/Profile"} component={Profile}/>


                {/*tabBar*/}
                <TabBar
                    tintColor="#21ba7a"
                    barTintColor="white"
                    hidden={this.state.hidden}
                    noRenderContent
                >
                    {
                        this.renderTabBarItem()
                    }
                </TabBar>
            </div>

        )
    }
}
