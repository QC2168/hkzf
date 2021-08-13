import React, {Component} from 'react';
import news from "./childComponents/news";
import {Route} from "react-router-dom";
import { TabBar } from 'antd-mobile';
import "./home.scss"
export default class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'redTab',
        };
    }
    renderContent(pageText) {
        return (
            <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
                <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
                <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
                   onClick={(e) => {
                       e.preventDefault();
                       this.setState({
                           hidden: !this.state.hidden,
                       });
                   }}
                >
                    Click to show/hide tab-bar
                </a>
                <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
                   onClick={(e) => {
                       e.preventDefault();
                       this.setState({
                           fullScreen: !this.state.fullScreen,
                       });
                   }}
                >
                    Click to switch fullscreen
                </a>
            </div>
        );
    }
    render() {
        return (
            <div className={"home"}>
                <Route path={"/home/news"} component={news}/>

            {/*tabBar*/}

                    <TabBar
                        tintColor="#21ba7a"
                        barTintColor="white"
                        hidden={this.state.hidden}
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
                            selected={this.state.selectedTab === 'blueTab'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'blueTab',
                                });
                            }}
                            data-seed="logId"
                        >
                            {this.renderContent('Life')}
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
                            selected={this.state.selectedTab === 'redTab'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'redTab',
                                });
                            }}
                            data-seed="logId1"
                        >
                            {this.renderContent('Koubei')}
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
                            selected={this.state.selectedTab === 'greenTab'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'greenTab',
                                });
                            }}
                        >
                            {this.renderContent('Friend')}
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
                            selected={this.state.selectedTab === 'yellowTab'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'yellowTab',
                                });
                            }}
                        >
                            {this.renderContent('My')}
                        </TabBar.Item>
                    </TabBar>


            </div>

        )
    }
}
