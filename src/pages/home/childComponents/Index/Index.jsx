import React, { Component } from 'react';
import {
  Carousel, Flex, Grid, WingBlank,
} from 'antd-mobile';
import axios from 'axios';
import './Index.scss';
import Nav1 from 'assets/images/nav-1.png';
import Nav2 from 'assets/images/nav-2.png';
import Nav3 from 'assets/images/nav-3.png';
import Nav4 from 'assets/images/nav-4.png';
import { getCurrentCity } from '../../../../utils';

const navs = [
  {
    id: 1,
    img: Nav1,
    title: '整租',
    path: '/home/List',
  },
  {
    id: 2,
    img: Nav2,
    title: '合租',
    path: '/home/List',
  },
  {
    id: 3,
    img: Nav3,
    title: '地图找房',
    path: '/home/List',
  },
  {
    id: 4,
    img: Nav4,
    title: '去出租',
    path: '/home/List',
  },
];

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swiperData: [],
      // 租房小组
      groups: [],
      // 新闻资讯
      news: [],
      // 当前城市名称
      curCityName: '北京',
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    this.getSwiperData();
    this.getGroups();
    this.getNews();
    this.getCenterLocation();
  }

  async getCenterLocation() {
    const res = await getCurrentCity();
    this.setState({
      curCityName: res.label,
    });
  }

  async getSwiperData() {
    const res = await axios.get('http://127.0.0.1:8009/home/swiper');
    this.setState({
      swiperData: res.data.body,
    });
  }

  async getGroups() {
    const res = await axios.get('http://127.0.0.1:8009/home/groups', {
      params: {
        area: 'AREA%7C88cff55c-aaa4-e2e0',
      },
    });
    this.setState({
      groups: res.data.body,
    });
  }

  async getNews() {
    const res = await axios.get('http://127.0.0.1:8009/home/news', {
      params: {
        area: 'AREA%7C88cff55c-aaa4-e2e0',
      },
    });
    this.setState({
      news: res.data.body,
    });
  }

  // 渲染轮播图
  renderSwiper() {
    const { swiperData } = this.state;
    return (
      swiperData.map((item) => (
        <img
          key={item.id}
          src={`http://127.0.0.1:8009${item.imgSrc}`}
          alt=""
          style={{ width: '100%', verticalAlign: 'top' }}
          onLoad={() => {
            // fire window resize event to change height
            window.dispatchEvent(new Event('resize'));
          }}
        />
      ))
    );
  }

  // 渲染导航菜单
  renderNavs() {
    const { history } = this.props;
    return navs.map((item) => (
      <Flex.Item key={item.id} onClick={() => history.push(item.path)}>
        <img src={item.img} alt="" />
        <h2>{item.title}</h2>
      </Flex.Item>
    ));
  }

  renderNews() {
    const { news } = this.state;
    return news.map((item) => (
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img
            className="img"
            src={`http://localhost:8009${item.imgSrc}`}
            alt=""
          />
        </div>
        <Flex className="content" direction="column" justify="between">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    ));
  }

  render() {
    const { swiperData, curCityName, groups } = this.state;
    const { history } = this.props;
    return (
      <div className="Index">
        {/* 轮播图 */}
        <div className="swiper">
          {swiperData.length > 0 ? (
            <Carousel
              autoplay
              infinite
            >
              {this.renderSwiper()}
            </Carousel>
          ) : ''}
        </div>

        {/* 搜索 */}
        <Flex className="search-box">
          <Flex className="search">
            <div className="location" onClick={() => history.push('/CityList')}>
              <span className="name">{curCityName}</span>
              <i className="iconfont icon-arrow-bottom" />
            </div>
            <div className="form" onClick={() => history.push('/search')}>
              <i className="iconfont icon-search" />
              <span className="text">请输入小区/地址</span>
            </div>
          </Flex>
          <i className="iconfont icon-map" onClick={() => history.push('/Map')} />
        </Flex>
        {/*    导航菜单 */}
        <Flex className="nav">
          {
                        this.renderNavs()
                    }
        </Flex>

        {/* 租房小组 */}
        <div className="group">
          <h3 className="group-title">
            租房小组
            <span className="more">更多</span>
          </h3>
          <Grid
            data={groups}
            columnNum={2}
            hasLine={false}
            square={false}
            renderItem={(item) => (
              <Flex className="group-item" justify="around" key={item.id}>
                <div className="desc">
                  <p className="title">{item.title}</p>
                  <span className="info">
                    {item.desc}
                  </span>
                </div>
                <img src={`http://127.0.0.1:8009${item.imgSrc}`} alt="" />
              </Flex>
            )}
          />
        </div>

        {/* 最新资讯 */}
        <div className="news">
          <h3 className="groupTitle">
            最新资讯
          </h3>
          <WingBlank size="md">
            {this.renderNews()}
          </WingBlank>
        </div>
      </div>
    );
  }
}
