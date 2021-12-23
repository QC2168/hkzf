import React, {FC, ReactNode} from 'react';
import { NavBar, TabBar } from 'antd-mobile'
import styles from './index.module.less'
import {
    useNavigate,
    useLocation,
} from 'react-router-dom'

export interface ItemType{
    key: string,
    title: string,
    icon: ReactNode|string,
}
interface props{
    tabs:ItemType[]
}
export default ({tabs}:props)=> {
    const navigate  = useNavigate()
    const location = useLocation()
    const { pathname } = location
    const setRouteActive = (value: string) => {
        console.log(pathname);
        navigate(value)
    }
    return (
        <div className={styles.tabBarPosition}>
            <TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
                {tabs.map(item => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                ))}
            </TabBar>
        </div>

    )
}
