import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import classnames from 'classnames';
import styles from './FilterTitle.module.scss';

const titleList = [
  { title: '区域', type: 'area' },
  { title: '方式', type: 'mode' },
  { title: '租金', type: 'price' },
  { title: '筛选', type: 'more' },
];
export default class FilterTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { titleSelectedStatus, onClick } = this.props;
    return (
      <Flex align="center" className={styles.filterTitle}>
        {
                    titleList.map((item) => {
                      const isSelected = titleSelectedStatus[item.type];
                      return (
                        <Flex.Item key={item.type}>
                          {/*    选中类名 */}

                          <span onClick={() => onClick(item.type)} className={classnames('dropdown', { selected: isSelected })}>
                            <span>{item.title}</span>
                            <i className={classnames('iconfont', 'icon-arrow-bottom')} />
                          </span>
                        </Flex.Item>
                      );
                    })
                }
      </Flex>
    );
  }
}
