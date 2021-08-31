import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './SearchHeader.module.css';

class SearchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { history, cityName, className } = this.props;
    return (
      <Flex className={[styles.searchBox, className || ''].join(' ')}>
        <Flex className={styles.search}>
          <div className={styles.location} onClick={() => history.push('/CityList')}>
            <span className={styles.name}>{cityName}</span>
            <i className="iconfont icon-arrow-bottom" />
          </div>
          <div className={styles.form} onClick={() => history.push('/search')}>
            <i className={`${styles.iconfont} ${styles['icon-search']}`} />
            <span className="text">请输入小区/地址</span>
          </div>
        </Flex>
        <i className="iconfont icon-map" onClick={() => history.push('/Map')} />
      </Flex>
    );
  }
}

SearchHeader.propTypes = {
  cityName: PropTypes.string.isRequired,
};

export default withRouter(SearchHeader);
