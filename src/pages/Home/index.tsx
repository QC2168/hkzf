import React, {useState, useEffect, useContext, FC} from 'react';
import {SwiperRef} from 'antd-mobile/es/components/swiper';
import {Button, Space, Swiper, Toast} from 'antd-mobile';
import styles from './index.module.less';
import {getGroups, getNews, getSwiper} from '../../network/api';
import {BASE_URL, useMount} from '../../utils';
import {GroupDataType, NewsDataType, SwiperDataType} from '../../network/types';
import Nav1 from 'assets/images/nav-1.png';
import Nav2 from 'assets/images/nav-2.png';
import Nav3 from 'assets/images/nav-3.png';
import Nav4 from 'assets/images/nav-4.png';
import Search from '../../components/Search';

const navs = [
    {
        id: 1,
        img: Nav1,
        title: '整租',
        path: '/home/List',
    },
    {
        id: 2,
        img: Nav2,
        title: '合租',
        path: '/home/List',
    },
    {
        id: 3,
        img: Nav3,
        title: '地图找房',
        path: '/home/List',
    },
    {
        id: 4,
        img: Nav4,
        title: '去出租',
        path: '/home/List',
    },
];


const swiperFC = (swiperData: SwiperDataType[]) => {

    const items = swiperData.map((item) => (
        <Swiper.Item key={item.id}>
            <div
                className={styles.swiper}
            >
                <img src={BASE_URL + item.imgSrc} alt={item.alt}/>
            </div>
        </Swiper.Item>
    ));
    return (
        <Swiper>{items}</Swiper>
    );
};
export default function Index() {
    const [swiperData, setSwiperData] = useState<SwiperDataType[] | []>([]);
    const [groupsData, setGroupsData] = useState<GroupDataType[] | []>([]);
    const [newsData, setNewsData] = useState<NewsDataType[] | []>([]);
    const getSwiperData = async () => {
        const swiperData: SwiperDataType[] = await getSwiper();
        setSwiperData(swiperData);
    };
    const getGourpsData = async () => {
        const groupsData: GroupDataType[] = await getGroups();
        setGroupsData(groupsData);
    };
    const getNewsData = async () => {
        const newsData: NewsDataType[] = await getNews();
        setNewsData(newsData);
    };
    useMount(() => {
        getSwiperData();
        getGourpsData();
        getNewsData();
    });


    return (
        <div>
            {/*搜索框*/}
            {<Search/>}
            {/*轮播图*/}
            {swiperFC(swiperData)}
            {/*导航栏*/}
            <div className={styles.navs}>
                {
                    navs.map(item => {
                        return (
                            <div>
                                <img src={item.img} alt={item.title}/>
                                <h2>{item.title}</h2>
                            </div>
                        );
                    })
                }
            </div>
            {/*租房小组*/}
            <div className={styles.Groups}>
                <div className={styles.GroupsHeader}>
                    <div className={styles.GroupsHeaderTitle}>租房小组</div>
                    <div className={styles.GroupsHeaderMore}>更多</div>
                </div>
                <div className={styles.GroupsCards}>
                    {
                        groupsData.map((item:GroupDataType) => {
                            return (
                                <div className={styles.GroupCardsCard} key={item.id}>
                                    <div>
                                        <div className={styles.GroupCardTitle}>{item.title}</div>
                                        <div className={styles.GroupCardInfo}>{item.desc}</div>
                                    </div>
                                    <img src={BASE_URL + item.imgSrc} alt={item.title}/>
                                </div>
                            );
                        })
                    }


                </div>

            </div>
            {/*最新资讯*/}
            <div className={styles.news}>
                <h3>最新资讯</h3>
                {
                    newsData.map((item:NewsDataType) => {
                        return (
                            <div className={styles.newsItem}>
                                <div className={styles.newsImgWrap}>
                                    <img
                                        className={styles.newsItemImg}
                                        src={BASE_URL + item.imgSrc}
                                        alt={item.title}
                                    />
                                </div>
                                <div className={styles.newsItenContent}>
                                    <div className={styles.newsItemTitle}>{item.title}</div>
                                    <div className={styles.newsItemInfo}>
                                        <div>{item.from}</div>
                                        <div>{item.date}</div>
                                    </div>
                                </div>
                            </div>

                        );

                    })

                }
            </div>
        </div>

    );
}
