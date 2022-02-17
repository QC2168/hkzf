import {useMount} from 'react-use';
import {useLocation} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import NavBar from '../../components/NavBar';
import {getHousesDetail} from '../../network/api';
import {HousesItemDetailType, SwiperDataType} from '../../network/types';
import {Divider, Grid, Swiper, Tag} from 'antd-mobile';
import styles from './index.module.less';
import {BASE_URL} from '../../utils';
import {tagColorType} from '../../components/HouseItem';
export const tagColor:tagColorType[]=['default', 'primary', 'success', 'warning', 'danger']
const getHouseCode = (url: string): string => {
    return url.split('/').at(-1) as string;
};
const swiperFC = (swiperData: string[]) => {
    if (swiperData.length===1){
        return (
        <img className={styles.swiperImg} src={BASE_URL + swiperData[0]} alt={swiperData[0]}/>
    )
    }else{
        const items = swiperData.map((item, index) => (
            <Swiper.Item key={index}>
                <img className={styles.swiperImg} src={BASE_URL + item} alt={item}/>
            </Swiper.Item>
        ));
        return (
            <Swiper style={{
                '--height': '212px',
                '--width': 'auto',

            }}>{items}</Swiper>
        );
    }

};
export default () => {
    let location = useLocation();
    const [HouseCode, setHouseCode] = useState<string>('');
    const [housesData, setHousesData] = useState<HousesItemDetailType>();

    const getHousesData = async (HouseCode: string) => {
        const housesData = await getHousesDetail(HouseCode);
        setHousesData(housesData);
    };
    useMount(() => {
        const code = getHouseCode(location.pathname);
        setHouseCode(code);
        //    请求对于房屋的数据
        getHousesData(code);
    });

    return (
        <>
            <NavBar>房屋详情</NavBar>
            {/*轮播图*/}
            {housesData ? swiperFC(housesData.houseImg as string[]) : ''}

            {/*房屋数据*/}
            <div className={styles.housesDataView}>
                <div className={styles.housesTitle}>{housesData?.title}</div>
                {/*遍历tag*/}
                <div className={styles.tags}>
                    {
                        housesData? housesData.tags.map((item, index) => <Tag key={index} color={tagColor[index]}>{item}</Tag>):''
                    }
                </div>
                <Grid columns={3} gap={4}>
                    <Grid.Item>
                        <div className={styles.dataItem}>
                            <div>{housesData?.price}</div>
                            <div>租金</div>
                        </div>
                    </Grid.Item>
                    <Grid.Item>
                        <div className={styles.dataItem}>
                            <div>{housesData?.roomType}</div>
                            <div>房型</div>
                        </div>
                    </Grid.Item>
                    <Grid.Item>
                        <div className={styles.dataItem}>
                            <div>{housesData?.size}</div>
                            <div>面积</div>
                        </div>
                    </Grid.Item>
                </Grid>
                {/*小区*/}
                <Divider>所在小区</Divider>
                <div>{housesData?.community}</div>
                <Divider>房间配套</Divider>
                <div>{housesData?.description}</div>
                <Divider>房屋概况</Divider>
                <div>{housesData?.description}</div>
                <Divider>地图位置</Divider>
                <div>{housesData?.description}</div>
            </div>

        </>
    );
}
