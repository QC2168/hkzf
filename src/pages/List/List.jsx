import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import {
  List, AutoSizer, WindowScroller, InfiniteLoader,
} from 'react-virtualized';
import SearchHeader from '../../components/SearchHeader/SearchHeader';
import styles from './List.module.scss';
import Filter from '../../components/Filter/Filter';
import { API } from '../../utils/api';
import { BASE_URL } from '../../utils/url';
import HouseItem from '../../components/HouseItem/HouseItem';
import Sticky from '../../components/Sticky/Sticky';

// 获取当前定位
const { label, value } = JSON.parse(localStorage.getItem('hkzf_city'));
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //  房屋列表
      housesList: [],
      // 总条数
      count: 0,
    };
    this.filters = {};
  }

  // eslint-disable-next-line camelcase
  componentDidMount() {
    this.searchHouseList();
  }

    // 函数返回值代表最终渲染页面的内容
    renderHouseList = ({
      key, // Unique key within array of rows
      index, // FilterPicker of row within collection
      // eslint-disable-next-line no-shadow
      style, // Style object to be applied to row (to position it)
    }) => {
      // 根据索引号获取当前这一行的房屋数据
      const { housesList } = this.state;
      const house = housesList[index];
      console.log(house);
      if (!house) {
        return (
          <div key={key} style={style}>
            <p className={styles.loading} />
          </div>
        );
      }
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
    onFilter = (filters) => {
      this.filters = filters;
      this.searchHouseList();
    }

  //  判断列表中每一行是否加载完成
  isRowLoaded=({ index }) => {
    const { housesList } = this.state;
    return !!housesList[index]; //
  }

  // 用来获取更多房屋列表数据
  loadMoreRows=({ startIndex, stopIndex }) => {
    console.log(startIndex, stopIndex);
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve) => {
      //  数据加载完成时，调用res
      API.get('/houses', {
        params: {
          cityId: value,
          ...this.filters,
          start: startIndex,
          end: stopIndex,
        },
      }).then((res) => {
        console.log(res);
        const { housesList } = this.state;
        const { list } = res;
        this.setState({
          housesList: [...housesList, ...list],
        });
        console.log(housesList);
        // 调用resolve
        resolve();
      });
    });
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
      housesList: list,
      count,
    });
  }

  render() {
    const { count } = this.state;
    const { history } = this.props;
    return (
      <div className="List">
        <Flex className={styles.header}>
          <i
            className="iconfont icon-arrow-left"
            onClick={() => {
              history.go(-1);
            }}
          />
          <SearchHeader cityName={label} className={styles.searchHeader} />
        </Flex>
        {/* 选择器 */}
        <Sticky height={40}>
          <Filter onFilter={this.onFilter} />
        </Sticky>

        {/*  房屋列表 */}
        <div className={styles.houseItems}>
          <InfiniteLoader
            isRowLoaded={this.isRowLoaded}
            loadMoreRows={this.loadMoreRows}
            rowCount={count}
          >
            {
                ({ onRowsRendered, registerChild }) => (
                  <WindowScroller>
                    {({ height, isSrcolling, scrollTop }) => (
                      <AutoSizer>
                        {
                              ({ width }) => (
                                <List
                                      // 设置高度为windowScroller最终渲染的列表高度
                                  autoHeight
                                      // 视口的宽度
                                  width={width}
                                      // 视口的高度
                                  height={height}
                                      // 列表的行数
                                  rowCount={count}
                                      // 每一行的高度
                                  rowHeight={120}
                                  rowRenderer={this.renderHouseList}
                                  isScrolling={isSrcolling}
                                  scrllTop={scrollTop}
                                  ref={registerChild}
                                  onRowsRendered={onRowsRendered}
                                />
                              )
                            }
                      </AutoSizer>
                    )}
                  </WindowScroller>
                )
              }
          </InfiniteLoader>

        </div>
      </div>
    );
  }
}
