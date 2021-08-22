import React, {Component} from 'react';
import {Carousel, Flex} from 'antd-mobile';
import axios from "axios";
import "./Index.scss"
import Nav1 from "assets/images/nav-1.png"
import Nav2 from "assets/images/nav-2.png"
import Nav3 from "assets/images/nav-3.png"
import Nav4 from "assets/images/nav-4.png"

const navs = [
    {
        id: 1,
        img: Nav1,
        title: '整租',
        path: '/home/List'
    },
    {
        id: 2,
        img: Nav2,
        title: '合租',
        path: '/home/List'
    },
    {
        id: 3,
        img: Nav3,
        title: '地图找房',
        path: '/home/List'
    },
    {
        id: 4,
        img: Nav4,
        title: '去出租',
        path: '/home/List'
    },
]

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            swiperData: [],
        };
    }

    componentDidMount() {
        this.getSwiperData()

    }

    async getSwiperData() {
        const res = await axios.get('http://127.0.0.1:8009/home/swiper')
        this.setState({
            swiperData: res.data.body,
        })

    }

    // 渲染轮播图
    renderSwiper() {
        return (
            this.state.swiperData.map(item => (
                <img
                    key={item.id}
                    src={`http://127.0.0.1:8009${item.imgSrc}`}
                    alt=""
                    style={{width: '100%', verticalAlign: 'top'}}
                    onLoad={() => {
                        // fire window resize event to change height
                        window.dispatchEvent(new Event('resize'));
                    }}
                />
            ))
        )
    }

    // 渲染导航菜单
    renderNavs() {
        return navs.map(item =>
            <Flex.Item key={item.id} onClick={() => this.props.history.push(item.path)}>
                <img src={item.img} alt=""/>
                <h2>{item.title}</h2>
            </Flex.Item>)
    }

    render() {
        return (
            <div className={"Index"}>
                {/*轮播图*/}
                <div className="swiper">
                    {this.state.swiperData.length>0 ? (<Carousel
                        autoplay
                        infinite
                    >
                        {this.renderSwiper()}
                    </Carousel>) : ''}
                </div>


                {/*    导航菜单*/}
                <Flex className={"nav"}>
                    {
                        this.renderNavs()
                    }

                </Flex>
            </div>
        )
    }
}

