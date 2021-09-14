import React, { Component } from 'react';
import FilterTitle from '../FilterTitle/FilterTitle';
import styles from './Filter.module.scss';

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 高亮状态
      titleSelectedStatus: {
        area: false,
        mode: false,
        price: false,
        more: false,
      },
    };
  }

  // 点击标题菜单
  onTitleClick=(type) => {
    this.setState((p) => ({
      titleSelectedStatus: {
        ...p.titleSelectedStatus,
        [type]: true,
      },
    }));
  }

  render() {
    const { titleSelectedStatus } = this.state;
    return (
      <div className={styles.filter}>
        <FilterTitle titleSelectedStatus={titleSelectedStatus} onClick={this.onTitleClick} />
      </div>
    );
  }
}
