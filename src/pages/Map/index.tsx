import {useGeolocation, useMount} from 'react-use';
import styles from './index.module.less'
import NavBar from '../../components/NavBar';
import {getMapHouses} from '../../network/api';
import {useAtom} from 'jotai';
import {updateCityAtom} from '../../atom';
import {useState} from 'react';
import {HousesMapItemType} from '../../network/types';
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

export default ()=>{
    // 获取当前城市
    const [{cityID}] = useAtom(updateCityAtom);
    // 地图数据
    const [map,setMap] = useState()
    const [mapData,setMapData]=useState<HousesMapItemType[]>([])
    // 获取地图上每一个点
    const {latitude,longitude} = useGeolocation();
    const getMapHousesData=async (cityID:string)=>{
        const res=await getMapHouses(cityID)
        res.forEach(item=>createRect(new BMap.Point(item.longitude, item.latitude),item.label,item.count,item.value))
    }
    const createRect=(point, name, count, id)=>{
        //创建标注
        const label=new BMap.Label('',{
            position: point,
            offset: new BMap.Size(-50, -28),
        })
        label.id=id
        label.setStyle(labelStyle)
        map.addOverlay(label);
        console.log(cityID);
        // 设置房源覆盖物内容
        label.setContent(`
  <div class="${styles.bubble}">
          <p class="${styles.name}">${name}</p>
          <p>${count}套</p>
        </div>
      `);
    }
    useMount(()=>{
        const map = new BMap.Map("container");          // 创建地图实例
        setMap(map)
        const point = new BMap.Point(113.274016,23.137463);  // 创建点坐标
        map.centerAndZoom(point, 12);                 // 初始化地图，设置中心点坐标和地图级别
        getMapHousesData(cityID)
    })

    return (
        <>
            <NavBar>地图找房</NavBar>
            <div id='container' className={styles.container}>Map</div>
        </>
    )
}
