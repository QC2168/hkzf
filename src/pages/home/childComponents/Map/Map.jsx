import React, {Component} from 'react';
import "./Map.scss"
import NavHeader from "../../../../components/NavHeader/NavHeader";

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log(BMap)
        // 初始化地图实例
        // react脚手架中全局对象需要使用window来访问
        //
        // 获取地理位置信息
        navigator.geolocation.getCurrentPosition((position => {
            const map = new BMap.Map("container");
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude
            console.log(latitude, longitude)
            map.centerAndZoom((new BMap.Point(longitude, latitude)), 15);
            map.enableScrollWheelZoom(true)
        }))

    }

    render() {
        return (
            <div className="Map">
                <NavHeader>地址找房</NavHeader>
                <div id="container">

                </div>
            </div>
        )
    }
}
