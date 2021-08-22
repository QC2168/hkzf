import React, {Component} from 'react';
import { Carousel } from 'antd-mobile';
import axios from "axios";
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
    async getSwiperData(){
        const res = await axios.get('http://127.0.0.1:8009/home/swiper')
        console.log(res)
        this.setState({
            swiperData:res.data.body
        })
    }
    // 渲染轮播图
    renderSwiper(){
        return (
            this.state.swiperData.map(item => (
                        <img
                            src={`http://127.0.0.1:8009${item.imgSrc}`}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' }}
                            onLoad={() => {
                                // fire window resize event to change height
                                window.dispatchEvent(new Event('resize'));
                            }}
                        />
                ))
        )
    }
    render() {
        return (
            <div>
                <Carousel
                    autoplay
                    infinite
                >
                    {this.renderSwiper()}
                </Carousel>
            </div>
        )
    }
}

