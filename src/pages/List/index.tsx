import HouseItem from '../../components/HouseItem';
import {useMount} from 'react-use';
import {useState} from 'react';
import {HousesItemType, HousesListType} from '../../network/types';
import {getCondition, getHousesList} from '../../network/api';
import {updateCityAtom} from '../../atom';
import {useAtom} from 'jotai';
import {List, AutoSizer, WindowScroller, ListRowProps} from 'react-virtualized';
import Filter from '../../components/Filter';
import {ColumnsType} from '../../components/Filter/types';
import {Empty} from 'antd-mobile';
import {useNavigate} from 'react-router-dom';


export default () => {
    let navigate = useNavigate();
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
    useMount(() => {
        getHouses();
        getConditionData();
    });

    const getHouses = async () => {
        const res = await getHousesList(city.cityID);
        setHouses(res);
    };

const toDetail=(code:string):void=>{
    console.log(code);
    navigate(`/detail/${code}`)
    }
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
            house?
            <HouseItem
                key={key} style={style} title={house.title} houseImg={house.houseImg} tags={house.tags} desc={house.desc}
                       price={house.price} houseCode={house.houseCode}  onClick={()=>toDetail(house.houseCode)}/>:<div>加载中</div>
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
                                // 高度减去90是筛选框的高度+tabbar高度
                                <List
                                    height={height-90}
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
