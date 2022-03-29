import styles from './index.module.less';
import {BASE_URL} from '../../utils';
import {
    RightOutline,
    StarOutline,
    ReceiptOutline,
    TeamOutline,
    UserCircleOutline, FileOutline, CalendarOutline
} from 'antd-mobile-icons';
import classnames from 'classnames';
import {useMount} from 'react-use';
import {atom, useAtom} from 'jotai';
import {housesRecordsAtom, userStoreAtom} from '../../atom';
import {useNavigate} from "react-router-dom";
// 默认头像
const DEFAULT_AVATAR = `${BASE_URL}/img/profile/avatar.png`;
const menus = [
    {
        id: 1, name: '我的收藏', iconfont: <StarOutline fontSize={24}/>, to: '/record?query=favorite',
    },
    {
        id: 2, name: '我的出租', iconfont: <ReceiptOutline fontSize={24}/>, to: '/rent',
    },
    {id: 3, name: '看房记录', iconfont: <CalendarOutline fontSize={24}/>, to: '/record?query=view'},
    {
        id: 4,
        name: '发布房源',
        iconfont: <UserCircleOutline fontSize={24}/>, to: '/release'
    },
    {id: 5, name: '个人资料', iconfont: <FileOutline fontSize={24}/>,to: '/'},
];

export default () =>{
    const [housesRecord] = useAtom(housesRecordsAtom)
    const [{username}] = useAtom(userStoreAtom)
    const navigate = useNavigate();
    const to = (path: string) :void=> {
        navigate(path)
    }
    useMount(() => {
//    获取浏览记录数据
        console.log(housesRecord);
    })
    return (
        <div className={styles.Profile}>
            {/*头部 头像*/}
            <div className={styles.header}>
                <img
                    className={styles.bg}
                    src={`${BASE_URL}/img/profile/bg.png`}
                    alt="背景图"
                />
                <img className={styles.img} src={DEFAULT_AVATAR} alt=""/>
                <h3 className={styles.username}>{username ? username : "未登录"}</h3>
            </div>
            {/*数据显示*/}
            <div className={styles.dataCard}>
                <div className={[styles.dataCardItem, styles.fc].join(' ')}>
                    <div>{[].length}</div>
                    <div>我的收藏</div>
                </div>
                <div className={classnames(styles.dataCardItem, styles.fc)}>
                    <div className={styles.fc}>{housesRecord.length}</div>
                    <div className={styles.fc}>浏览记录</div>
                </div>

            </div>
            {/*选项*/}
            <div className={styles.listCard}>
                {
                    menus.map(item => {
                        return (<div className={styles.listItem} key={item.id} onClick={() => to(item.to)}>
                            <div className={[styles.listLIcon, styles.fc].join(' ')}>
                                {item.iconfont}
                            </div>
                            <div className={[styles.listText].join(' ')}>{item.name}
                            </div>
                            <div className={[styles.listRIcon, styles.fc].join(' ')}>
                                <RightOutline/>
                            </div>
                        </div>);
                    })
                }

            </div>
        </div>
    );
}
