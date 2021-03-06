import {useMount} from 'react-use';
import {useLocation} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import NavBar from '../../components/NavBar';
import Ball from '../../components/Ball';
import {favorites, getHousesDetail} from '../../network/api';
import {HousesItemDetailType, SwiperDataType} from '../../network/types';
import {Divider, Grid, Rate, Skeleton, Swiper, Tag, Toast} from 'antd-mobile';
import styles from './index.module.less';
import {BASE_URL, GetToken} from '../../utils';
import {tagColorType} from '../../components/HouseItem';
import {addHousesRecordsAtom} from '../../atom';
import {HousesRecordType} from '../../atom/types';
import {useAtom} from 'jotai';
import {HeartFill, HeartOutline} from 'antd-mobile-icons';
import {Map, APILoader, Marker} from '@uiw/react-baidu-map';

const mapFC = (lng: number, lat: number) => {
    return (
        <div style={{width: '100%', height: '200px'}}>
            <APILoader akay="PrjHqT7EGEQtKhy2GiMY8VHgUI3FuahR">
                <Map center={{lng, lat}}>
                    <Marker position={{lng, lat}}/>
                </Map>
            </APILoader>
        </div>)

}


export const tagColor: tagColorType[] = ['default', 'primary', 'success', 'warning', 'danger'];
const getHouseCode = (url: string): string => {
    return url.split('/').at(-1) as string;
};
const swiperFC = (swiperData: string[]) => {
    if (swiperData.length === 1) {
        return (
            <img className={styles.swiperImg} src={BASE_URL + swiperData[0]} alt={swiperData[0]}/>
        );
    } else {
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
    const [housesData, setHousesData] = useState<HousesItemDetailType>();
    const [housesRecord, setHousesRecord] = useState<HousesRecordType>();
    const [favoriteStatus, setFavoriteStatus] = useState<boolean>(false);
    const [, addHousesRecord] = useAtom(addHousesRecordsAtom);
    const getHousesData = async (HouseCode: string) => {
        const housesData = await getHousesDetail(HouseCode);
        setHousesData(housesData);
    };
    const collect = async (housesCode: string) => {
        // ???????????????????????????
        const res = await favorites(housesCode)
        const housesRecord: HousesRecordType = {
            value: housesCode,
            time: Date.now()
        };
        Toast.show({
            content: '?????????',
            icon: <HeartFill style={{'color': 'pink'}}/>,
        })
    }
    const isCollect = async (housesCode: string) => {
        // @ts-ignore
        const {isFavorite} = await favorites(housesCode, true)
        setFavoriteStatus(isFavorite)
    }
    const record = (housesCode: string) => {
        const housesRecord: HousesRecordType = {
            value: housesCode,
            time: Date.now()
        };
        addHousesRecord(housesRecord);
    }
    useMount(() => {
        const code = getHouseCode(location.pathname);
        setHousesRecord(housesRecord)
        // ?????????????????????
        getHousesData(code);
        record(code)
        // ????????????????????????
          if(GetToken()){
            isCollect(code)
        }
    });



    const isFavorite = (houseCode: string) => {

        return favoriteStatus ? <HeartFill style={{'color': 'pink'}}/> : <HeartOutline style={{'color': 'pink'}}/>
    }
    if (housesData) {
        return (
            <>
                <Ball styles={{'left': '80%', 'top': '88%'}} onClick={() => collect(housesData.houseCode)}>
                    {isFavorite(housesData.houseCode)}
                </Ball>
                <NavBar>????????????</NavBar>
                {/*?????????*/}

                {housesData ? swiperFC(housesData.houseImg as string[]) : ''}

                {/*????????????*/}
                <div className={styles.housesDataView}>
                    <div className={styles.housesTitle}>{housesData?.title}</div>
                    {/*??????tag*/}
                    <div className={styles.tags}>
                        {
                            housesData ? housesData.tags.map((item, index) => <Tag key={index}
                                                                                   color={tagColor[index]}>{item}</Tag>) : ''
                        }
                    </div>
                    <Grid columns={3} gap={4}>
                        <Grid.Item>
                            <div className={styles.dataItem}>
                                <div>{housesData.price}</div>
                                <div>??????</div>
                            </div>
                        </Grid.Item>
                        <Grid.Item>
                            <div className={styles.dataItem}>
                                <div>{housesData.roomType}</div>
                                <div>??????</div>
                            </div>
                        </Grid.Item>
                        <Grid.Item>
                            <div className={styles.dataItem}>
                                <div>{housesData.size}</div>
                                <div>??????</div>
                            </div>
                        </Grid.Item>
                    </Grid>
                    {/*??????*/}
                    <Divider>????????????</Divider>
                    <div>{housesData.community}</div>
                    <Divider>????????????</Divider>
                    <div>
                        <Grid columns={3} gap={8}>
                            {housesData.supporting.map((item) => {
                                return <Grid.Item>
                                    <div className={styles['grid-demo-item-block']}
                                         style={{textAlign: 'center', margin: '5px 0'}}>{item}</div>
                                </Grid.Item>
                            })}
                        </Grid>
                    </div>
                    <Divider>????????????</Divider>
                    <div>{housesData.description}</div>
                    <Divider>????????????</Divider>
                    <div>{mapFC(housesData.coord.longitude, housesData.coord.latitude)}</div>
                    <Divider>??????????????????</Divider>
                    <div><Rate readOnly value={5}/></div>
                </div>

            </>
        );
    } else {
        return (
            <>
                <Skeleton.Title animated/>
                <Skeleton.Paragraph lineCount={5} animated/>
            </>

        );
    }

}
