import React from 'react';
import classnames from 'classnames';
import styles from './FilterMore.module.scss';
import FilterFooter from '../FilterFooter/FilterFooter';

class FilterMore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 记录所有的选中的标签的value值
      selectedValues: props.defaultValue,
      // selectedValues: [],
    };
  }

  handleClick(value) {
    let newSelectedValues = this.state.selectedValues.slice();
    // 判断selectedValues中是否存在value
    // 如果存在，就应该移除这个
    // 如果不存在，就需要添加这个值
    if (newSelectedValues.includes(value)) {
      newSelectedValues = newSelectedValues.filter((item) => item !== value);
    } else {
      newSelectedValues.push(value);
    }
    this.setState({
      selectedValues: newSelectedValues,
    });
  }

  renderItem(data) {
    const { selectedValues } = this.state;
    return data.map((item) => (
      <span
        className={classnames('tag', {
          'tag-active': selectedValues.includes(item.value),
        })}
        key={item.value}
        onClick={this.handleClick.bind(this, item.value)}
      >
        {item.label}
      </span>
    ));
  }

  // 确定按钮的事件处理程序
  onOk=() => {
    const { selectedValues } = this.state;
    const { onSave } = this.props;
    onSave('more', selectedValues);
  }

  render() {
    const {
      data: {
        characteristic = [],
        floor = [],
        oriented = [],
        roomType = [],
      },
      onCancel,
      type,
    } = this.props;
    const { selectedValues } = this.state;
    return (
      <div className={styles.filterMore}>
        <div className="mask" onClick={() => onCancel(type)} />
        {/* 遮罩层 */}
        {/* <Spring to={{ opacity: openType === 'more' ? 1 : 0 }}> */}
        {/*  {(props) => { */}
        {/*    if (props.opacity === 0) { */}
        {/*      return null; */}
        {/*    } */}
        {/*    return <div style={props} className="mask" onClick={onCancel} />; */}
        {/*  }} */}
        {/* </Spring> */}
        {/* 条件内容 */}
        <div className="tags">
          {/* <div className="tags" style={props}> */}
          <dl className="dl">
            <dt className="dt">户型</dt>
            <dd className="dd">{this.renderItem(roomType)}</dd>

            <dt className="dt">朝向</dt>
            <dd className="dd">{this.renderItem(oriented)}</dd>

            <dt className="dt">楼层</dt>
            <dd className="dd">{this.renderItem(floor)}</dd>

            <dt className="dt">房屋亮点</dt>
            <dd className="dd">{this.renderItem(characteristic)}</dd>
          </dl>

          <FilterFooter
            // style={props}
            className={styles.footer}
            cancelText="清除"
            onCancel={() => this.setState({
              selectedValues: [],
            })}
            onSave={() => this.onOk(selectedValues)}
          />
        </div>

      </div>
    );
  }
}
export default FilterMore;
