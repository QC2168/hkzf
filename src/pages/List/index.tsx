import HouseItem from '../../components/HouseItem';
import {useMount} from '../../utils';
import {useState} from 'react';
import {HousesItemType, HousesListType} from '../../network/types';
import {getCondition, getHousesList} from '../../network/api';
import {updateCityAtom} from '../../atom';
import {useAtom} from 'jotai';
import {List, AutoSizer, WindowScroller, ListRowProps} from 'react-virtualized';
import Filter from '../../components/Filter';
import {ColumnsType} from '../../components/Filter/types';
import {Empty} from 'antd-mobile';


export default () => {
    const [city, updateCity] = useAtom(updateCityAtom);
    const [houses, setHouses] = useState<HousesListType>({
        count: 0,
        list: []
    });
    const [condition, setCondition] = useState<ColumnsType | null>(null);
    // 渲染所选值
    const getConditionData = async () => {
        const res = await getCondition(city.cityID);
        const {
            area,
            rentType,
            price,
            characteristic,
        } = res;
        const obj: ColumnsType = {
            area: area.children,
            rentType,
            price,
            more: characteristic,
        };
        setCondition(obj);
    };

    const getHouses = async () => {
        const res = await getHousesList(city.cityID);
        setHouses(res);
    };

    useMount(() => {
        getHouses();
        getConditionData();
    });

    function _noRowsRenderer() {
        return <Empty
            style={{padding: '64px 0'}}
            imageStyle={{width: 128}}
            description="暂无数据"
        />;
    }

    function _rowRenderer({key, index, style}: ListRowProps) {
        const house: HousesItemType = houses.list[index];
        return (
            <HouseItem key={key} title={house.title} houseImg={house.houseImg} tags={house.tags} desc={house.desc}
                       price={house.price} houseCode={house.houseCode}/>
        );

    }

    return (
        <div className="housesList">
            {
                condition !== null ? <Filter {...condition} /> : ''
            }
            <WindowScroller>
                {
                    ({height}) => (
                        <AutoSizer>
                            {({width}) => (
                                <List
                                    height={height}
                                    rowCount={houses.list.length}
                                    rowHeight={110}
                                    noRowsRenderer={_noRowsRenderer}
                                    rowRenderer={_rowRenderer}
                                    width={width}
                                />
                            )}
                        </AutoSizer>
                    )
                }
            </WindowScroller>

        </div>
    );
}
