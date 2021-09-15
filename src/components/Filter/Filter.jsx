import React, { Component } from 'react';
import FilterTitle from '../FilterTitle/FilterTitle';
import styles from './Filter.module.scss';
import FilterPicker from '../FilterPicker/FilterPicker';

// 导入自定义axios
import { API } from '../../utils/api';

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 选中类型

      // 展示类型
      openType: '',
      // 高亮状态
      titleSelectedStatus: {
        area: false,
        mode: false,
        price: false,
        more: false,
      },
      filtersData: {},

      // 筛选条件的选中值
      selectedValues: {
        area: ['area', 'null'],
        mode: ['null'],
        price: ['null'],
        more: [],
      },
    };
  }

  // 获取所有筛选条件的方法
  async getFiltersData() {
    const { value } = JSON.parse(localStorage.getItem('hkzf_city'));
    const res = await API.get('/houses/condition', {
      params: {
        id: value,
      },
    });
    this.setState({
      filtersData: res,
    });
  }

  UNSAFE_componentWillMount() {
    this.getFiltersData();
  }

  // 点击标题菜单
  onTitleClick=(type) => {
    this.setState((p) => ({
      titleSelectedStatus: {
        ...p.titleSelectedStatus,
        [type]: true,
      },
      // 展示对话框
      openType: type,
    }));
  }

  // 取消 隐藏对话框
  onCancel=() => {
    this.setState({
      openType: '',
    });
  }

  onSave=(type, value) => {
    console.log(type, value);
    const { selectedValues } = this.state;
    //  隐藏对话框
    this.setState({
      openType: '',
      selectedValues: {
        ...selectedValues,
        [type]: value,
      },
    });
  }

  // 渲染FilterPicker组件方法
  renderFilterPicker() {
    const {
      openType, filtersData: {
        area, subway, rentType, price,
      }, selectedValues,
    } = this.state;
    if (openType !== 'area' && openType !== 'mode' && openType !== 'price') return null;

    // 根据openType 来拿到当前筛选条件的数据
    let data = [];
    let cols = 3;
    const defaultValue = selectedValues[openType];
    switch (openType) {
      case 'area':
        // 获取区域数据
        data = [area, subway];
        cols = 3;
        break;
      case 'mode':
        data = rentType;
        cols = 1;
        break;
      case 'price':
        data = price;
        cols = 1;
        break;
      default:
        break;
    }
    return <FilterPicker onCancel={this.onCancel} onSave={this.onSave} data={data} cols={cols} type={openType} defaultValue={defaultValue} />;
  }

  render() {
    const { titleSelectedStatus } = this.state;
    return (
      <div className={styles.filter}>
        <FilterTitle titleSelectedStatus={titleSelectedStatus} onClick={this.onTitleClick} />
        {/*  前三个菜单对于的内容 */}
        {
          this.renderFilterPicker()
        }
      </div>
    );
  }
}
