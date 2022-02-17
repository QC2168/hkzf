import {Tag} from 'antd-mobile';
import styles from './index.module.less';
import {useState} from 'react';
import {BASE_URL} from '../../utils';
import {HousesItemType} from '../../network/types';

export type tagColorType = 'default' | 'primary' | 'success' | 'warning' | 'danger'
const tagColor:tagColorType[]=['default', 'primary', 'success', 'warning', 'danger']
export default function index({
                                  desc,
                                  houseImg,
                                  price,
                                  tags,
                                  title,
                                    style,
    onClick
                              }: HousesItemType) {
    return (
        <div className={styles.HouseItem} style={style} onClick={onClick}>
            <div className={styles.left}>
                <img src={BASE_URL + houseImg} alt=""/>
            </div>
            <div className={styles.right}>
                <div className={styles.title}>
                    {title}
                </div>
                <div className={styles.desc}>
                    {desc}
                </div>
                <div className={styles.tags}>
                    {
                        tags.map((item, index) => <Tag key={index} color={tagColor[index]}>{item}</Tag>)
                    }
                </div>
                <div className={styles.price}>
                    {price}元/月
                </div>
            </div>
        </div>
    );
}
