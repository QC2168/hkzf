import React, {Component} from 'react';
import news from "./childComponents/news";
import {Route} from "react-router-dom";
import {TabBar} from 'antd-mobile';
import "./home.scss"
import index from "../index";
import list from "../list/list";
import profile from "../profile/profile";

export default class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: this.props.location.pathname,
        };
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
                    <TabBar.Item
                        title="首页"
                        key="Life"
                        icon={
                            <i className={'iconfont icon-shouye2'}></i>
                        }
                        selectedIcon={
                            <i className={'iconfont icon-shouye2 selected'}></i>
                        }
                        selected={this.state.selectedTab === '/home/index'}
                        onPress={() => {
                            this.setState({
                                selectedTab: '/home/index',
                            });
                            //    路由切换
                            this.props.history.push('/home/index')
                        }}
                        data-seed="logId"
                    >

                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <i className={'iconfont icon-zhaofang'}></i>
                        }
                        selectedIcon={
                            <i className={'iconfont icon-zhaofang selected'}></i>
                        }
                        title="找房"
                        key="Koubei"
                        selected={this.state.selectedTab === '/home/list'}
                        onPress={() => {
                            this.setState({
                                selectedTab: '/home/list',
                            });
                            //    路由切换
                            this.props.history.push('/home/list')
                        }}
                        data-seed="logId1"
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <i className={'iconfont icon-zixun'}></i>
                        }
                        selectedIcon={
                            <i className={'iconfont icon-zixun selected'}></i>
                        }
                        title="资讯"
                        key="Friend"
                        selected={this.state.selectedTab === '/home/news'}
                        onPress={() => {
                            this.setState({
                                selectedTab: '/home/news',
                            });
                            //    路由切换
                            this.props.history.push('/home/news')
                        }}
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <i className={'iconfont icon-wode1'}></i>
                        }
                        selectedIcon={
                            <i className={'iconfont icon-wode1 selected'}></i>
                        }
                        title="我的"
                        key="my"
                        selected={this.state.selectedTab === '/home/profile'}
                        onPress={() => {
                            this.setState({
                                selectedTab: '/home/profile',
                            });
                            //    路由切换
                            this.props.history.push('/home/profile')
                        }}
                    >
                    </TabBar.Item>
                </TabBar>


            </div>

        )
    }
}
