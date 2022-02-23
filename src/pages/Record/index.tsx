import {useMount} from "react-use";
import {favoritesHouses} from "../../network/api";
import {useState} from "react";
import {HousesItemType} from "../../network/types";
import {List} from "antd-mobile";
import HouseItem from "../../components/HouseItem";
import {useNavigate} from "react-router-dom";
import NavBar from "../../components/NavBar";
import styles from './index.module.css'
export default () => {
    let navigate = useNavigate();
    const [houses, setHouses] = useState<HousesItemType[] | []>([])
    useMount(() => {
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
            <NavBar>收藏记录</NavBar>
            <List className={styles.list}>
                {houses.map(house => (
                    <List.Item>
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
