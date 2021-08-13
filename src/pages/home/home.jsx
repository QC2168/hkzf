import React, {Component} from 'react';
import news from "./childComponents/news";
import {Route} from "react-router-dom";
import {TabBar} from 'antd-mobile';
import "./home.scss"
import index from "../index";
import list from "../list/list";
import profile from "../profile/profile";

const tabItems = [
    {
        title: "首页",
        icon: "icon-shouye2",
        path: "/home/index",
    },
    {
        title: "找房",
        icon: "icon-zhaofang",
        path: "/home/list",
    },
    {
        title: "资讯",
        icon: "icon-zixun",
        path: "/home/news",
    },
    {
        title: "我的",
        icon: "icon-wode1",
        path: "/home/profile",
    },
]
export default class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: this.props.location.pathname,
        };
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
        console.log(this.props.location.pathname)
        return (
            <div className={"home"}>
                <Route path={"/home/news"} component={news}/>
                <Route path={"/home/index"} component={index}/>
                <Route path={"/home/list"} component={list}/>
                <Route path={"/home/profile"} component={profile}/>

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
