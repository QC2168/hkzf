import React, { Component } from 'react';
import {
  List, AutoSizer, WindowScroller, InfiniteLoader,
} from 'react-virtualized';
import { API, BASE_URL } from '../../utils';
import HouseItem from '../../components/HouseItem/HouseItem';
import styles from '../List/List.module.scss';

export default class Favorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //  收藏的房屋列表
      favoriteHousesList: [],
    };
  }

  UNSAFE_componentWillMount() {
    this.getFavoriteHouseList();
  }

  async getFavoriteHouseList() {
    const res = await API.get('/user/favorites');
    this.setState({
      favoriteHousesList: res.body,
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
    const { favoriteHousesList } = this.state;
    const house = favoriteHousesList[index];
    const { history } = this.props;
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
        onClick={() => history.push(`/detail/${house.houseCode}`)}
        src={BASE_URL + house.houseImg}
        title={house.title}
        desc={house.desc}
        tags={house.tags}
        price={house.price}
      />
    );
  }

  render() {
    const { favoriteHousesList } = this.state;
    return (
      <div className="Favorite">
        <AutoSizer>
          {
           ({ height, width }) => (
             <List
               height={height}
               onRowsRendered={this.onRowsRendered}
               rowCount={favoriteHousesList.length}
               rowHeight={120}
               rowRenderer={this.renderHouseList}
               width={width}
             />
           )
         }
        </AutoSizer>
      </div>
    );
  }
}
