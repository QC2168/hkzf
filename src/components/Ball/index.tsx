import {ReactNode} from 'react';
import outStyles from './index.module.less'
import {HeartOutline} from 'antd-mobile-icons';
export default ({children=<HeartOutline />,styles={},onClick=()=>{}})=>{
    return (
        <div style={styles} className={outStyles.ball} onClick={onClick} >
            {children}
        </div>
    )
}
