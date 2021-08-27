import React, {Component} from 'react';
import {NavBar, Toast} from "antd-mobile";
import "./CityList.scss"
import {getCurrentCity} from "../../utils";
import axios from "axios";
import {AutoSizer, List} from 'react-virtualized';
import NavHeader from "../../components/NavHeader/NavHeader";


// 索引 ab 高度
const TITLE_HEIGHT = 36
// 每次城市名称的高度
const NAME_HEIGHT = 50
// 有房源的城市
const HOUSE_CITY = ['北京', '上海', '广州', '深圳']


// 处理字母索引
const formatCityIndex = (letter) => {
    switch (letter) {
        case '#':
            return '当前定位'
        case 'hot':
            return '热门城市'
        default:
            return letter.toUpperCase()
    }
}

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
        this.state = {
            cityList: {},
            cityIndex: [],
            // 指定索引高亮号
            activeIndex: 0
        };
        this.cityListComponent = React.createRef()
    }

    async componentDidMount() {
        await this.getCityList()
        //     调用 ，调前计算list中每一行的高度，实现scrolltoRow的精确跳转
        //     this.cityListComponent.current.measureAllRows()
        console.log(this.cityListComponent.current)
    }

    changeCity({label, value}) {
        if (HOUSE_CITY.indexOf(label) > -1) {
            localStorage.setItem('hkzf_city', JSON.stringify(label, value))
            this.props.history.go(-1)
        } else {
            Toast.info('暂无房源数据', 1, null, false)
        }

    }

    // 函数返回值代表最终渲染页面的内容
    rowRenderer = ({
                       key, // Unique key within array of rows
                       index, // Index of row within collection
                       style, // Style object to be applied to row (to position it)
                   }) => {
        // 获取每一行的字母索引
        const {
            cityIndex, cityList
        }
            = this.state
        const letter = cityIndex[index]
        // 获取指定字母索引下的数据
        return (
            <div key={key} style={style} className={'city'}>
                <div className="title">{formatCityIndex(letter)}</div>

                {
                    cityList[letter].map(item => <div key={item.value} className="name" onClick={() => {
                        this.changeCity(item)
                    }
                    }>{item.label}</div>)
                }

            </div>
        );
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

        this.setState({
            cityList,
            cityIndex
        })
    }

    // 动态计算每一行高度的方法
    getRowHeight = ({index}) => {
        // 索引标题高度+城市数量*城市名称高度
        const {cityList, cityIndex} = this.state
        return TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT
    }

    renderCityIndex() {
        const {cityIndex, activeIndex} = this.state
        return cityIndex.map((item, index) => <li key={item} className="cityIndexItem" onClick={() => {
            this.cityListComponent.current.scrollToRow(index)
        }
        }>
                        <span className={activeIndex === index ? 'indexActive' : ''}>
                            {item === 'hot' ? 'HOT' : item.toUpperCase()}
                        </span>
        </li>)
    }

    // 用于获取list组件中渲染行的信息
    onRowsRendered = ({startIndex}) => {
        if (this.state.activeIndex !== startIndex) {
            this.setState({
                activeIndex: startIndex
            })
        }

    }

    render() {
        return (
            <div className="CityList">
                <NavHeader>城市选择</NavHeader>

                {/*   城市列表*/}
                <AutoSizer>
                    {
                        ({height, width}) => {
                            return <List
                                ref={this.cityListComponent}
                                width={width}
                                height={height}
                                rowCount={this.state.cityIndex.length}
                                rowHeight={this.getRowHeight}
                                rowRenderer={this.rowRenderer}
                                onRowsRendered={this.onRowsRendered}
                                scrollToRow={this.scrollToRow}
                                scrollToAlignment={'start'}
                            />
                        }
                    }
                </AutoSizer>
                {/*右侧索引列表*/}
                <ul className="cityIndex">
                    {this.renderCityIndex()}
                </ul>
            </div>

        )
    }
}
