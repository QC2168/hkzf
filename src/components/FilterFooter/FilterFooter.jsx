import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './FilterFooter.module.scss';

class FilterPicker extends Component {
    static propTypes = {
      cancelText: PropTypes.string,
      confirmText: PropTypes.string,
      className: PropTypes.string,
      onCancel: PropTypes.func,
      onSave: PropTypes.func,
    }

    static defaultProps = {
      cancelText: '取消',
      confirmText: '确定',
      onCancel: () => {},
      onSave: () => {},
    }

    render() {
      const {
        onCancel,
        onSave,
        cancelText,
        confirmText,
        className,
        style,
      } = this.props;
      return (
        <Flex
          className={classnames(styles['filter-footer'], className)}
          style={style}
        >
          {/* 取消按钮 */}
          <span className="btn cancel" onClick={onCancel}>
            {cancelText}
          </span>
          {/* 确定按钮 */}
          <span className="btn ok" onClick={onSave}>
            {confirmText}
          </span>
        </Flex>
      );
    }
}
export default FilterPicker;
