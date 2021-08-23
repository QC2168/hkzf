import React, {Component} from 'react';

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        // 初始化地图实例
        // react脚手架中全局对象需要使用window来访问
        const map = new window.BMap.Map("container");
    //
        // 获取地理位置信息
        navigator.geolocation.getCurrentPosition((position => {
            console.log(position.coords.latitude)
            console.log(position.coords.longitude)
            const point = new window.BMap.Point(position.coords.latitude, position.coords.longitude);
            map.centerAndZoom(point,15)
        }))

    }

    render() {
        return (
            <div className={"Map"}>
                <div className="container">

                </div>
            </div>
        )
    }
}
