import React, {Component} from 'react';
import {Icon, NavBar} from "antd-mobile";
import "./CityList.scss"
import {getCurrentCity} from "../../utils";
import axios from "axios";

const formatCityData = (list) => {
    const cityList = {}
    // 遍历list
    list.forEach(item => {
        // 获取每一个城市的首字母
        const first = item.short.substr(0, 1)
        // 判断cityList中是否有分类
        if (cityList[first]) {
            // 有就push
            cityList[first].push(item)
        } else {
            // 没有就创建数组，再push
            cityList[first] = [item]
        }
    })
    // 获取索引数据
    const cityIndex = Object.keys(cityList).sort()
    return {
        cityList,
        cityIndex
    }
}

export default class cityList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.getCityList()

    }

    // 获取城市列表数据
    async getCityList() {
        const res = await axios.get('http://127.0.0.1:8009/area/city?level=1')
        const {cityList, cityIndex} = formatCityData(res.data.body)
        // 获取热门城市数据
        // 将数据添加到cityList中
        // 将数据添加到cityIndex中
        const hotRes = await axios.get('http://127.0.0.1:8009/area/hot')
        cityList['hot'] = hotRes.data.body
        cityIndex.unshift('hot')

        // 获取当前定位的城市
        const curCity = await getCurrentCity()
        // 将当前定位的城市放到cityList、cityIndex
        cityList['#'] = [curCity]
        cityIndex.unshift('#')
    }

    render() {
        return (
            <div className="CityList">
                <NavBar
                    className={"navBar"}
                    mode="light"
                    icon={<i className="iconfont icon-arrow-left"/>}
                    onLeftClick={() => this.props.history.go(-1)}
                >城市选择</NavBar>

                <div></div>
            </div>

        )
    }
}
