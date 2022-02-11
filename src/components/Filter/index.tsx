import styles from './index.module.less';
import {DownOutline} from 'antd-mobile-icons';
import {useState} from 'react';
import {CascadePickerView} from 'antd-mobile';
import Footer from './Footer';
import {useMount} from 'react-use';
import {TitleListType, ColumnsType, SelectStatusType, SelectedStatusValType} from './types';

const titleList: TitleListType[] = [
    {title: '区域', type: 'area'},
    {title: '方式', type: 'rentType'},
    {title: '租金', type: 'price'},
    {title: '筛选', type: 'more'},
];

export default (FColumns: ColumnsType) => {
    const [selectStatus, setSelectStatus] = useState<SelectStatusType>({
        area: false,
        rentType: false,
        price: false,
        more: false,
    });
    const [selectedStatusVal, setSelectedStatusVal] = useState<SelectedStatusValType>({
        area: '',
        rentType: '',
        price: '',
        more: []
    });
    const changeSelectStatus = (type: keyof SelectStatusType) => {
        const newStatus: SelectStatusType = {
            area: false,
            rentType: false,
            price: false,
            more: false,
        };
        newStatus[type] = true;
        setSelectStatus(newStatus);
    };
    useMount(() => {
        console.log(FColumns.area);
    });

    // 控制filter
    const cancel = (): void => {
        setSelectStatus({
            area: false,
            rentType: false,
            price: false,
            more: false,
        });
    };

    //type:keyof SelectedStatusValType,value:string
    const confirm = (): void => {
        // const curData = selectedStatusVal;
        // if (type!=='more'){
        //     curData[type] = (value as unknown as string);
        //     setSelectedStatusVal(curData);
        // }else{
        //
        // }
        console.log('confirm');
        //    发送请求
        console.log(selectedStatusVal);
        //    保存数据
        cancel();
    };

    return (
        <>
            <div className={styles.wrap}>
                <div className={styles.filters}>
                    {
                        titleList.map(item => {
                            return (
                                <div key={item.type} onClick={() => changeSelectStatus(item.type)}
                                     className={styles.items}>
                                    {item.title}<DownOutline/>
                                </div>
                            );
                        })
                    }
                </div>
                {
                    selectStatus.area ? <div className={styles.drawerContent}>
                        <CascadePickerView options={FColumns.area}
                                           onChange={(val) => {
                                               const curData = selectedStatusVal;
                                               let areaVal = '';
                                               if (val[2] === 'null') {
                                                   console.log(`2`);
                                                   areaVal = val[1];
                                               } else if (val[1] === 'null') {
                                                   console.log(`1`);
                                                   areaVal = val[0];
                                               } else if (val[2] !== 'null') {
                                                   areaVal = val[2];
                                               }
                                               curData.area = areaVal;
                                               setSelectedStatusVal(curData);
                                           }}
                        />
                        <Footer confirm={confirm} cancel={cancel}/>
                    </div> : ''
                }
                {
                    selectStatus.rentType ? <div className={styles.drawerContent}>
                        <CascadePickerView options={FColumns.rentType}
                                           onChange={(val, extend) => {
                                               const curData = selectedStatusVal;
                                               curData.rentType = val[0];
                                               setSelectedStatusVal(curData);
                                           }}
                        />
                        <Footer confirm={confirm} cancel={cancel}/>
                    </div> : ''
                }
                {
                    selectStatus.price ? <div className={styles.drawerContent}>
                        <CascadePickerView options={FColumns.price}
                                           onChange={(val, extend) => {
                                               const curData = selectedStatusVal;
                                               curData.price = val[0];
                                               setSelectedStatusVal(curData);
                                           }}
                        />
                        <Footer confirm={confirm} cancel={cancel}/>
                    </div> : ''
                }

            </div>
        </>

    );
}
