import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import SearchHeader from '../../components/SearchHeader/SearchHeader';
import styles from './List.module.scss';
import Filter from '../../components/Filter/Filter';

// 获取当前定位
const { label } = JSON.parse(localStorage.getItem('hkzf_city'));
export default class list extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="List">
        <Flex className={styles.header}>
          <i className="iconfont icon-arrow-left" onClick={() => { this.props.history.go(-1); }} />
          <SearchHeader cityName={label} className={styles.searchHeader} />
        </Flex>
        {/* 选择器 */}
        <Filter />
      </div>
    );
  }
}
