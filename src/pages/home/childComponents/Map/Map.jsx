import React, { Component } from 'react';
import axios from 'axios';
import style from './Map.module.css';
import NavHeader from '../../../../components/NavHeader/NavHeader';
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
    this.state = {};
  }

  componentDidMount() {
    this.initMap();
  }

  initMap() {
    // 获取当前定位城市
    const { label, value } = JSON.parse(localStorage.getItem('hkzf_city'));
    // 获取地理位置信息
    const map = new BMap.Map('container');
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
      }
      // 获取房源信息
      const res = await axios.get('http://127.0.0.1:8009/area/map', {
        params: {
          id: value,
        },
      });
      res.data.body.forEach((item) => {
      // 每个数据创建一个覆盖物
        const {
          coord: { longitude, latitude }, label: areaName, count, value: uValue,
        } = item;
        console.log(longitude, latitude);
        //  创建label
        const areaPoint = new BMap.Point(longitude, latitude);
        // 设置setContent后第一个参数中设置的文本内容就失效了
        const label1 = new BMap.Label('', {
          position: areaPoint,
          offset: new BMap.Size(-35, -35),
        });
        // 给label对象添加唯一标识
        label1.id = uValue;
        // 设置房源覆盖物内容
        label1.setContent(`
        <div class="${style.bubble}">
          <p class="${style.name}">${areaName}</p>
          <p>${count}套</p>
        </div>
      `);
        //  设置样式
        label1.setStyle(labelStyle);
        map.addOverlay(label1);
        // 添加点击时间
        label1.addEventListener('click', () => {
          console.log('click', label1.id);
          // 放大地图 以中心放大
          //   添加到地图中
          //  第一个参数 坐标对象
          //  第二个参数  放大级别
          map.centerAndZoom(areaPoint, 13);
          // 清除当前覆盖物
          setTimeout(() => { map.clearOverlays(); }, 0);
        });
      });
    },

    label);
  }

  render() {
    return (
      <div className={style.Map}>
        <NavHeader>地址找房</NavHeader>
        <div id="container" className={style.container} />
      </div>
    );
  }
}
