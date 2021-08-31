import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Toast } from 'antd-mobile';
import styles from './Map.module.css';
import NavHeader from '../../../../components/NavHeader/NavHeader';
import HouseItem from '../../../../components/HouseItem/HouseItem';
import { BASE_URL } from '../../../../utils/url';
// 覆盖物样式
const labelStyle = {
  cursor: 'pointer',
  border: '0px solid rgb(255, 0, 0)',
  padding: '0px',
  whiteSpace: 'nowrap',
  fontSize: '12px',
  color: 'rgb(255, 255, 255)',
  textAlign: 'center',
};

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      housesList: [],
      isShowList: false,
    };
  }

  componentDidMount() {
    this.initMap();
  }

  initMap() {
    // 获取当前定位城市
    const { label, value } = JSON.parse(localStorage.getItem('hkzf_city'));
    // 获取地理位置信息
    const map = new BMap.Map('container');
    // 在其他方法中可以使用
    this.map = map;

    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
    // 创建地址解析器实例
    const myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(label, async (point) => {
      if (point) {
        // 初始化地图
        map.centerAndZoom(point, 11);
        map.addOverlay(new BMap.Marker(point));
        //  添加组件
        map.addControl(new BMap.NavigationControl());
        map.addControl(new BMap.ScaleControl());
        this.renderOverlays(value);
      }
    },

    label);

    //  给地图绑定移动事件
    map.addEventListener('movestart', () => {
      const { isShowList } = this.state;
      if (isShowList) {
        this.setState({
          isShowList: false,
        });
      }
    });
  }

  async renderOverlays(id) {
    // 加载loading
    Toast.loading('加载中', 0, null, false);
    // 获取房源信息
    const res = await axios.get('http://127.0.0.1:8009/area/map', {
      params: {
        id,
      },
    });
    Toast.hide();
    // 调用 getTypeAndZoom 方法获取级别和类型
    const { nextZoom, type } = this.getTypeAndZoom();
    res.data.body.forEach((item) => {
      this.createOverlays(item, nextZoom, type);
    });
  }

  // 区 11  镇 13 小区 15
  getTypeAndZoom() {
    // 调用地图
    const zoom = this.map.getZoom();
    let nextZoom;
    let type;
    if (zoom >= 10 && zoom < 12) {
    //  区
    //  下一个缩放级别
      nextZoom = 13;
      // circle 表示绘制圆形覆盖物（区、镇）
      type = 'circle';
    } else if (zoom >= 12 && zoom < 14) {
    //  镇
      nextZoom = 15;
      type = 'circle';
    } else if (zoom >= 14 && zoom < 16) {
    //  小区
      type = 'rect';
    }
    return {
      nextZoom, type,
    };
  }

  createOverlays(data, zoom, type) {
    const {
      coord: { longitude, latitude }, label: areaName, count, value,
    } = data;
    const areaPoint = new BMap.Point(longitude, latitude);
    if (type === 'circle') {
      this.createCricle(areaPoint, areaName, count, value, zoom);
    } else if (type === 'rect') {
      this.createRect(areaPoint, areaName, count, value);
    }
  }

  // 创建区、镇覆盖物
  createCricle(point, name, count, id, zoom) {
    // 设置setContent后第一个参数中设置的文本内容就失效了
    const label1 = new BMap.Label('', {
      position: point,
      offset: new BMap.Size(-35, -35),
    });
    // 给label对象添加唯一标识
    label1.id = id;
    // 设置房源覆盖物内容
    label1.setContent(`
        <div class="${styles.bubble}">
          <p class="${styles.name}">${name}</p>
          <p>${count}套</p>
        </div>
      `);
    //  设置样式
    label1.setStyle(labelStyle);
    this.map.addOverlay(label1);
    // 添加点击时间
    label1.addEventListener('click', () => {
      // 调用renderOverlays方法，获取该区域下的房源数据
      this.renderOverlays(id);
      // 放大地图 以中心放大
      //   添加到地图中
      //  第一个参数 坐标对象
      //  第二个参数  放大级别
      this.map.centerAndZoom(point, zoom);
      // 清除当前覆盖物
      setTimeout(() => { this.map.clearOverlays(); }, 0);
    });
  }

  // 创建小区覆盖物
  createRect(point, name, count, id) {
    // 设置setContent后第一个参数中设置的文本内容就失效了
    const label1 = new BMap.Label('', {
      position: point,
      offset: new BMap.Size(-50, -28),
    });
    // 给label对象添加唯一标识
    label1.id = id;
    // 设置房源覆盖物内容
    label1.setContent(`
        <div class="${styles.rect}">
          <span class="${styles.housename}">${name}</span>
          <span class="${styles.housenum}">${count}套</span>
          <i class="${styles.arrow}"></i>
        </div>

      `);
    //  设置样式
    label1.setStyle(labelStyle);
    this.map.addOverlay(label1);
    // 添加点击时间
    label1.addEventListener('click', (e) => {
      this.getHouseList(id);
      // 计算中心点
      // 获取当前点击项
      const target = e.changedTouches[0];
      const x = window.innerWidth / 2 - target.clientX;
      const y = (window.innerHeight - 330) / 2 - target.clientY;
      this.map.panBy(x, y);
    });
  }

  async getHouseList(id) {
    // 加载loading
    Toast.loading('加载中', 0, null, false);
    // 获取小区房源数据
    const res = await axios.get('http://127.0.0.1:8009/houses', {
      params: {
        cityId: id,
      },
    });
    Toast.hide();
    this.setState({
      housesList: res.data.body.list,
      isShowList: true,
    });
  }

  // 封装渲染房屋列表的方法
  renderHousesList() {
    const { history } = this.props;
    const { housesList } = this.state;
    console.log(housesList);
    return housesList.map((item) => (
      <HouseItem
        onClick={() => history.push(`/detail/${item.houseCode}`)}
        key={item.houseCode}
        src={BASE_URL + item.houseImg}
        title={item.title}
        desc={item.desc}
        tags={item.tags}
        price={item.price}
      />
    ));
  }

  render() {
    const { isShowList } = this.state;
    return (
      <div className={styles.Map}>
        <NavHeader>地址找房</NavHeader>
        <div id="container" className={styles.container} />
        {/* 房源列表 */}
        {/* 添加 styles.show 展示房屋列表 */}
        <div
          className={[
            styles.houseList,
            isShowList ? styles.show : '',
          ].join(' ')}
        >
          <div className={styles.titleWrap}>
            <h1 className={styles.listTitle}>房屋列表</h1>
            <Link className={styles.titleMore} to="/home/list">
              更多房源
            </Link>
          </div>

          <div className={styles.houseItems}>
            {/* 房屋结构 */}
            {this.renderHousesList()}
          </div>
        </div>

      </div>
    );
  }
}
