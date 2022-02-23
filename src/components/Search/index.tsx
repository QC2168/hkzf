import React, {FC, ReactNode, useRef, useState} from 'react';
import {SearchBar} from 'antd-mobile';
import styles from './index.module.less';
import {EnvironmentOutline} from 'antd-mobile-icons';

export default function Index({
                                  placeholder = '请输入你想要的内容',
                                  curCity = '未定义'
                              }): JSX.Element {

    return (
        <div className={styles.searchBarWrap}>
            <SearchBar placeholder={placeholder}/>
            <EnvironmentOutline color={'#00ae60'} fontSize={25}/>
        </div>
    );
}
