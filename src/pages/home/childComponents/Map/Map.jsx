import React, { Component } from 'react';
import style from './Map.module.css';
import NavHeader from '../../../../components/NavHeader/NavHeader';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // 获取当前定位城市
    const { label } = JSON.parse(localStorage.getItem('hkzf_city'));
    // 获取地理位置信息
    const map = new BMap.Map('container');
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
    // 创建地址解析器实例
    const myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(label, (point) => {
      if (point) {
        // 初始化地图
        map.centerAndZoom(point, 11);
        map.addOverlay(new BMap.Marker(point));
      }
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
