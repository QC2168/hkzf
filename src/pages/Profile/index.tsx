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
// 默认头像
const DEFAULT_AVATAR = `${BASE_URL}/img/profile/avatar.png`;
const menus = [
    {
        id: 1, name: '我的收藏', iconfont: <StarOutline fontSize={24}/>, to: '/favorite',
    },
    {
        id: 2, name: '我的出租', iconfont: <ReceiptOutline fontSize={24}/>, to: '/rent',
    },
    {id: 3, name: '看房记录', iconfont: <CalendarOutline fontSize={24}/>},
    {
        id: 4,
        name: '成为房主',
        iconfont: <UserCircleOutline fontSize={24}/>,
    },
    {id: 5, name: '个人资料', iconfont: <FileOutline fontSize={24}/>},
    {id: 6, name: '联系我们', iconfont: <TeamOutline fontSize={24}/>},
];
export default () => {

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
                <h3 className={styles.username}>新泓</h3>
            </div>
            {/*数据显示*/}
            <div className={styles.dataCard}>
                <div className={[styles.dataCardItem, styles.fc].join(' ')}>
                    <div>0</div>
                    <div>我的收藏</div>
                </div>
                <div className={classnames(styles.dataCardItem, styles.fc)}>
                    <div className={styles.fc}>0</div>
                    <div className={styles.fc}>浏览记录</div>

                </div>

            </div>
            {/*选项*/}
            <div className={styles.listCard}>
                {
                    menus.map(item => {
                        return (<div className={styles.listItem} key={item.id}>
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
