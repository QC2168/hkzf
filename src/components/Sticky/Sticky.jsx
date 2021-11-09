import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Sticky.module.scss';

export default class Sticky extends Component {
  // ref 对象
  placeholder=createRef()

  content=createRef()

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  // scroll事件的处理程序
  handleScroll=() => {
    const placeholderEl = this.placeholder.current;
    const contentEl = this.content.current;
    const { height } = this.props;
    const { top } = placeholderEl.getBoundingClientRect();
    if (top < 0) {
      //  吸顶
      contentEl.classList.add(styles.fixed);
      placeholderEl.style.height = `${height}px`;
    } else {
      //  取消吸顶
      contentEl.classList.remove(styles.fixed);
      placeholderEl.style.height = '0px';
    }
  }
  // () {
  //   window.addEventListener('scroll', this.handleScroll);
  // }

  render() {
    const { children } = this.props;
    return (
      <div>
        {/* 占位元素 */}
        <div ref={this.placeholder} />
        {/* 内容元素 */}
        <div ref={this.content}>{children}</div>
      </div>
    );
  }
}

Sticky.propTypes = {
  height: PropTypes.number.isRequired,
};
