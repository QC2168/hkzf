import HouseItem from '../../components/HouseItem';
import {useMount} from '../../utils';
import {useState} from 'react';
import {HousesItemType, HousesListType} from '../../network/types';
import Search from '../../components/Search';
import {getHousesList} from '../../network/api';
import {cityAtom} from '../../atom';
import {useAtom} from 'jotai';

export default () => {
    const [houses, setHouses] = useState<HousesListType>({
        count: 0,
        list: []
    });
    const [city, setCity] = useAtom(cityAtom);
    const getHouses = async () => {
        const res = await getHousesList(city.cityID);
        setHouses(res);
    };
    useMount(() => {
        getHouses();

    });

    function renderHousesItems(list: HousesItemType[] | []) {
        return (
            list.map((item:HousesItemType) => <HouseItem {...item} key={item.houseCode}/>)
        );
    }

    return (
        <div className="housesList">
            {/*<Search curCity={city!.cityName}/>*/}
            {
                renderHousesItems(houses.list)
            }

        </div>
    );
}
