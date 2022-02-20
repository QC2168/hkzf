import {useGeolocation, useMount} from 'react-use';
import styles from './index.module.less';
import NavBar from '../../components/NavBar';
import {getMapHouses} from '../../network/api';
import {useAtom} from 'jotai';
import {updateCityAtom} from '../../atom';
import {ReactPortal, useEffect, useRef, useState} from 'react';
import {HousesMapItemType} from '../../network/types';
import {Map, APILoader, useMap, useMarker, useCustomOverlay, CustomOverlay} from '@uiw/react-baidu-map';

type ModeType='region'|'town'|'community'


export default () => {
    // 获取当前城市
    const [{cityID}] = useAtom(updateCityAtom);
    // 地图数据
    const [mapData, setMapData] = useState<HousesMapItemType[]>([]);
    // 获取地图上每一个点
    const {latitude, longitude} = useGeolocation();
    const getMapHousesData = async (cityID: string) => {
        const res = await getMapHouses(cityID);
        setMapData(res);
    };
    const [zoom, setZoom] = useState(11); // 区 11  镇 13 小区 15
    const [curDisplayMode,setDisplayMode]=useState<ModeType>('region')
    const changeZoom=(zoom:number,value:string):void=>{
        setZoom(zoom)
        //    请求数据
        console.log(value);
    }

    useMount(() => {
        getMapHousesData(cityID);
    });

    return (
        <>
            <NavBar>地图找房</NavBar>

            <div style={{width: '100%', height: '100vh'}}>
                <APILoader akay="PrjHqT7EGEQtKhy2GiMY8VHgUI3FuahR">
                    <Map style={{height: '100vh'}} enableDoubleClickZoom={false} center={{lng: 113.261927, lat: 23.17599}} zoom={zoom}>
                        {
                            mapData.map(item => {
                                return (
                                    <CustomOverlay
                                        key={item.value}
                                        paneName="markerPane"
                                        position={{lng: Number(item.coord.longitude), lat: Number(item.coord.latitude)}}
                                        visiable={curDisplayMode==='region'}
                                    >
                                        <div className={styles.bubble} onClick={()=>changeZoom(13,item.value)}>
                                            <div className={styles.name}>{item.label}</div>
                                            <div className={styles.count}>{item.count} 套</div>
                                        </div>
                                    </CustomOverlay>
                                );
                            })
                        }

                    </Map>
                </APILoader>
            </div>
        </>
    );
}
