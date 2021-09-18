import React, { Component } from 'react';
import FilterTitle from '../FilterTitle/FilterTitle';
import styles from './Filter.module.scss';
import FilterPicker from '../FilterPicker/FilterPicker';

// 导入自定义axios
import { API } from '../../utils/api';
import FilterMore from '../FilterMore/FilterMore';

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

  UNSAFE_componentWillMount() {
    this.getFiltersData();
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

    // 点击标题菜单
    onTitleClick = (type) => {
      const { titleSelectedStatus, selectedValues } = this.state;
      // 创建新的标题选中对象
      const newTitleSelectedStatus = { ...titleSelectedStatus };
      // 遍历标题选中对象
      Object.keys(titleSelectedStatus).forEach((key) => {
        //  key 表示数组中的每一项，就是每个标签的type值
        if (key === type) {
          // 当前标题
          newTitleSelectedStatus[type] = true;
          return;
        }
        //  其他标题
        const selectVal = selectedValues[key];
        if (key === 'area' && (selectVal.length !== 2 || selectVal[0] !== 'area')) {
          // 高亮
          newTitleSelectedStatus[key] = true;
        } else if (key === 'mode' && selectVal[0] !== 'null') {
          // 高亮
          newTitleSelectedStatus[key] = true;
        } else if (key === 'price' && selectVal[0] !== 'null') {
          // 高亮
          newTitleSelectedStatus[key] = true;
        } else if (key === 'more' && selectVal.length !== 0) {
          //  更多
          newTitleSelectedStatus[key] = true;
        } else {
          //  其他
          newTitleSelectedStatus[key] = false;
        }
      });
      this.setState({
        openType: type,
        // 使用新的标题对象来更新
        titleSelectedStatus: newTitleSelectedStatus,
      });
      // this.setState((p) => ({
      //   titleSelectedStatus: {
      //     ...p.titleSelectedStatus,
      //     [type]: true,
      //   },
      //   // 展示对话框
      //   openType: type,
      // }));
    }

    // 取消 隐藏对话框
    onCancel = (type) => {
      console.log('onCancel', type);
      const { titleSelectedStatus, selectedValues } = this.state;
      // 创建新的标题选中对象
      const newTitleSelectedStatus = { ...titleSelectedStatus };
      const selectVal = selectedValues[type];
      if (type === 'area' && (selectVal.length !== 2 || selectVal[0] !== 'area')) {
        // 高亮
        newTitleSelectedStatus[type] = true;
      } else if (type === 'mode' && selectVal[0] !== 'null') {
        // 高亮
        newTitleSelectedStatus[type] = true;
      } else if (type === 'price' && selectVal[0] !== 'null') {
        // 高亮
        newTitleSelectedStatus[type] = true;
      } else if (type === 'more' && selectVal.length !== 0) {
        //  更多
        newTitleSelectedStatus[type] = true;
      } else {
        //  其他
        newTitleSelectedStatus[type] = false;
      }
      this.setState({
        openType: '',
        //  更新菜单高亮状态
        titleSelectedStatus: newTitleSelectedStatus,
      });
    }

    onSave = (type, value) => {
      const { selectedValues, titleSelectedStatus } = this.state;
      const { onFilter } = this.props;
      const newSelectedValues = {
        ...selectedValues,
        [type]: value,
      };
      console.log('最新选中的值', newSelectedValues);
      const {
        area, mode, price, more,
      } = newSelectedValues;
      // 筛选条件数据
      const filters = {};
      // 区域
      const areaKey = area[0];
      let areaValue = 'null';
      if (area.length === 3) {
        areaValue = area[2] !== 'null' ? area[2] : area[1];
      }
      filters[areaKey] = areaValue;
      // 方式和租金
      filters.mode = mode[0];
      filters.price = price[0];
      // 更多条件
      filters.more = more.join(',');
      // 调用父组件中的方法，来将筛选数据传递给父组件
      onFilter(filters);
      // 创建新的标题选中对象
      const newTitleSelectedStatus = { ...titleSelectedStatus };
      const selectVal = value;
      if (type === 'area' && (selectVal.length !== 2 || selectVal[0] !== 'area')) {
        // 高亮
        newTitleSelectedStatus[type] = true;
      } else if (type === 'mode' && selectVal[0] !== 'null') {
        // 高亮
        newTitleSelectedStatus[type] = true;
      } else if (type === 'price' && selectVal[0] !== 'null') {
        // 高亮
        newTitleSelectedStatus[type] = true;
      } else if (type === 'more' && selectVal.length !== 0) {
        //  更多
        newTitleSelectedStatus[type] = true;
      } else {
        //  其他
        newTitleSelectedStatus[type] = false;
      }
      //  隐藏对话框
      this.setState({
        openType: '',
        // 更新菜单高亮状态数据
        titleSelectedStatus: newTitleSelectedStatus,
        selectedValues: newSelectedValues,
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
      return (
        <FilterPicker
          key={openType}
          onCancel={this.onCancel}
          onSave={this.onSave}
          data={data}
          cols={cols}
          type={openType}
          defaultValue={defaultValue}
        />
      );
    }

    renderFilterMore() {
      const {
        openType, filtersData: {
          roomType, oriented, floor, characteristic,
        }, selectedValues,
      } = this.state;
      const data = {
        roomType, oriented, floor, characteristic,
      };
      const defaultValue = selectedValues.more;
      return openType === 'more' ? <FilterMore data={data} type={openType} onSave={this.onSave} onCancel={this.onCancel} defaultValue={defaultValue} /> : null;
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
          {/*  筛选 */}
          {this.renderFilterMore()}
        </div>
      );
    }
}
