import {useMount} from "react-use";
import {favoritesHouses} from "../../network/api";
import {useState} from "react";
import {HousesItemType} from "../../network/types";
import {List} from "antd-mobile";
import HouseItem from "../../components/HouseItem";
import {useNavigate, useSearchParams} from "react-router-dom";
import NavBar from "../../components/NavBar";
import styles from './index.module.css'
type ListType='favorite'|'view'
export default () => {
    let navigate = useNavigate();
    const [houses, setHouses] = useState<HousesItemType[]>([])
    let [searchParams] = useSearchParams();
    let [listType,setListType]=useState<ListType>('favorite')
    useMount(() => {
        // 读取路由参数
       const type:ListType=searchParams.get('query') as ListType
        setListType(type)
        getFavoritesHouses()
    })
    const getFavoritesHouses = async () => {
        const res: HousesItemType[] = await favoritesHouses()
        console.log(res)
        setHouses(res)
    }
    const toDetail = (code: string): void => {
        navigate(`/detail/${code}`);
    };
    return (
        <>
            <NavBar>{listType==='favorite'?'收藏记录':'浏览记录'}</NavBar>
            <List className={styles.list}>
                {houses.map(house => (
                    <List.Item  key={house.houseCode}>
                        <HouseItem
                            title={house.title} houseImg={house.houseImg} tags={house.tags}
                            desc={house.desc}
                            price={house.price} houseCode={house.houseCode} onClick={() => toDetail(house.houseCode)}/>
                    </List.Item>
                ))}
            </List>
        </>
    )
}
