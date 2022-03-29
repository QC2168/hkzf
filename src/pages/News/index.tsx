import styles from "../Home/index.module.less";
import {NewsDataType} from "../../network/types";
import {BASE_URL} from "../../utils";
import React, {useState} from "react";
import {getNews} from "../../network/api";
import {useMount} from "react-use";

export default ()=>{
    const [newsData, setNewsData] = useState<NewsDataType[] | []>([]);
    const getNewsData = async () => {
        const newsData: NewsDataType[] = await getNews();
        setNewsData(newsData);
    };
    useMount(() => {
        getNewsData();
    });
    {/*最新资讯*/}
    return (
    <div className={styles.news}>
        <h3>最新资讯</h3>
        {
            newsData.map((item:NewsDataType) => {
                return (
                    <div className={styles.newsItem} key={item.id}>
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
    )
}
