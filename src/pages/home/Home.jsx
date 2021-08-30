import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import './home.scss';
import Index from './childComponents/Index/Index';
import List from './childComponents/List/List';
import News from './childComponents/News/News';
import Profile from './childComponents/Profile/Profile';

const tabItems = [
  {
    title: '首页',
    icon: 'icon-shouye2',
    path: '/home',
  },
  {
    title: '找房',
    icon: 'icon-zhaofang',
    path: '/home/List',
  },
  {
    title: '资讯',
    icon: 'icon-zixun',
    path: '/home/News',
  },
  {
    title: '我的',
    icon: 'icon-wode1',
    path: '/home/Profile',
  },
];
export default class Home extends Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    this.state = {
      selectedTab: location.pathname,
    };
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const { setState } = this;
    if (prevProps.location.pathname !== location.pathname) {
      // 路由发生切换
      setState({
        selectedTab: location.pathname,
      });
    }
  }

  renderTabBarItem() {
    const { selectedTab } = this.state;
    const { history } = this.props;
    return tabItems.map((item) => (
      <TabBar.Item
        title={item.title}
        key={item.title}
        icon={
          <i className={`iconfont ${item.icon}`} />
            }
        selectedIcon={
          <i className={`iconfont ${item.icon}`} />
            }
        selected={selectedTab === item.path}
        onPress={() => {
          this.setState({
            selectedTab: item.path,
          });
          //    路由切换
          history.push(item.path);
        }}
      />
    ));
  }

  render() {
    const { hidden } = this.state;
    return (
      <div className="home">
        <Route exact path="/home" component={Index} />
        <Route path="/home/News" component={News} />
        <Route path="/home/List" component={List} />
        <Route path="/home/Profile" component={Profile} />

        {/* tabBar */}
        <TabBar
          tintColor="#21ba7a"
          barTintColor="white"
          hidden={hidden}
          noRenderContent
        >
          {
                        this.renderTabBarItem()
                    }
        </TabBar>
      </div>

    );
  }
}
