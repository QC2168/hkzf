import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import { List } from 'react-virtualized';
import SearchHeader from '../../components/SearchHeader/SearchHeader';
import styles from './List.module.scss';
import Filter from '../../components/Filter/Filter';
import { API } from '../../utils/api';
import { BASE_URL } from '../../utils/url';
import HouseItem from '../../components/HouseItem/HouseItem';

// 获取当前定位
const { label, value } = JSON.parse(localStorage.getItem('hkzf_city'));
export default class list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //  房屋列表
      list: [],
      // 总条数
      count: 0,
    };
    this.filters = {};
  }

  // 用于获取房屋数据
  async searchHouseList() {
    const res = await API.get('/houses', {
      params: {
        cityId: value,
        ...this.filters,
        start: 1,
        end: 20,
      },
    });
    const { list, count } = res;
    this.setState({
      list,
      count,
    });
  }

  // 函数返回值代表最终渲染页面的内容
  renderHouseList = ({
    key, // Unique key within array of rows
    index, // FilterPicker of row within collection
    // eslint-disable-next-line no-shadow
    style, // Style object to be applied to row (to position it)
  }) => {
    // 根据索引号获取当前这一行的房屋数据
    const { list } = this.state;
    const house = list[index];
    console.log(house);
    return (
      <HouseItem
        key={key}
        style={style}
        src={BASE_URL + house.houseImg}
        title={house.title}
        desc={house.desc}
        tags={house.tags}
        price={house.price}
      />
    );
  }

  // 接收filter 组件中筛选条件数据
  onFilter=(filters) => {
    this.filters = filters;
    console.log('houseList', this.filters);
    this.searchHouseList();
  }

  UNSAFE_componentWillMount() {
    this.searchHouseList();
  }

  render() {
    const { count } = this.state;
    return (
      <div className="List">
        <Flex className={styles.header}>
          <i className="iconfont icon-arrow-left" onClick={() => { this.props.history.go(-1); }} />
          <SearchHeader cityName={label} className={styles.searchHeader} />
        </Flex>
        {/* 选择器 */}
        <Filter onFilter={this.onFilter} />
        {/*  房屋列表 */}
        <div className={styles.houseItems}>
          <List
            width={300}
            height={300}
            rowCount={count}
            rowHeight={120}
            rowRenderer={this.renderHouseList}

          />
        </div>
      </div>
    );
  }
}
