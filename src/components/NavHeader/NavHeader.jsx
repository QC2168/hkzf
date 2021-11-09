import React, { Component } from 'react';
import { NavBar } from 'antd-mobile';
import './NavHeader.scss';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './NavHeader.module.css';

class NavHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      onLeftClick, children, rightContent, history,
    } = this.props;
    // 默认点击行为
    const defaultHandler = () => history.go(-1);

    return (
      <NavBar
        className={style.navBar}
        mode="light"
        icon={<i className="iconfont icon-arrow-left" />}
        onLeftClick={onLeftClick || defaultHandler}
        rightContent={rightContent}
      >
        {children}
      </NavBar>
    );
  }
}

// 校验属性
NavHeader.propTypes = {
  children: PropTypes.string.isRequired,
  onLeftClick: PropTypes.func,
  className: PropTypes.string,
  rightContent: PropTypes.array,
};
NavHeader.defaultProps = {
  onLeftClick: null,
};

// 也是返回一个组件
export default withRouter(NavHeader);
