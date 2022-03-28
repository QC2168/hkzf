import React, {useState} from 'react'
import {
    Form,
    Input,
    Button,
    Dialog,
    Selector,
    CascadePickerView, ImageUploader, Toast,
} from 'antd-mobile'
import NavBar from "../../components/NavBar";
import {useMount} from "react-use";
import {getCondition, housesImageUpload, releaseHouses} from "../../network/api";
import {useAtom} from "jotai";
import {cityAtom} from "../../atom";
import {ConditionType, HousesItemReleaseType} from "../../network/types";
import styles from './index.module.less'
import {ImageUploadItem} from "antd-mobile/es/components/image-uploader";
import {BASE_URL} from "../../utils";
import {useNavigate} from "react-router-dom";


export default () => {
    let navigate = useNavigate();
    const [{cityID}] = useAtom(cityAtom)
    const [condition, setCondition] = useState<ConditionType | undefined>()
    const [fileList, setFileList] = useState<ImageUploadItem[]>([])
    const [imgUrlList, setImgUrlList] = useState<string[]>([])
    // 上传状态
    const UploadStatus = () => {
        return (
            <ImageUploader
                value={fileList}
                onChange={setFileList}
                upload={uploadImage as any}
            />
        )
    }

    async function uploadImage(file: File) {
        console.log('调用的图片上床')
        const res = await housesImageUpload(file)
        let url = BASE_URL + res[0]
        setImgUrlList([...imgUrlList, url])
        return {
            url
        }
    }

    useMount(() => {
        getCondition(cityID).then(res => setCondition(res))
    })
    const getLastPar = (arr: string[]): string => {
        let areaVal: string = '';
        if (arr[2] === 'null') {
            areaVal = arr[1];
        } else if (arr[1] === 'null') {
            areaVal = arr[0];
        } else if (arr[2] !== 'null') {
            areaVal = arr[2];
        }
        return areaVal
    }
    const onFinish = async ({
                                title,
                                description,
                                supporting, floor,

                                oriented,
                                roomType,

                                size,
                                price,
                                community
                            }: any) => {

        let data: HousesItemReleaseType = {
            title,
            description,
            supporting: supporting[0], floor: floor[0],

            oriented: oriented[0],
            roomType: roomType[0],

            size,
            price,
            community: getLastPar(community),
            houseImg: imgUrlList.join('|')

        }
        // 发布房源
        const res = await releaseHouses(data)
        if (res === null) {
            Toast.show({
                icon: 'success',
                content: '发布成功',
            })
            navigate('/List')

        }

    }
    return (
        <div className={styles.release}>
            <NavBar>发布房屋</NavBar>
            <div className={styles.uploadImageBox}>
                {UploadStatus()}
            </div>

            {
                condition !== undefined ? (
                    <Form
                        mode={'card'}
                        onFinish={onFinish}
                        footer={
                            <Button block type='submit' color='primary' size='large'>
                                提交
                            </Button>
                        }
                    >
                        <Form.Item
                            name='title'
                            label='标题'
                            rules={[{required: true, message: '标题不能为空'}]}
                        >
                            <Input placeholder='请输入标题'/>
                        </Form.Item>
                        <Form.Item name='description' label='房屋描述'>
                            <Input placeholder='请输入房屋描述'/>
                        </Form.Item>
                        <Form.Item name='supporting' label='设备提供'>
                            <Selector
                                columns={3}
                                multiple
                                options={condition.characteristic}
                            />
                        </Form.Item>
                        <Form.Item name='floor' label='楼层选择'>
                            <Selector
                                columns={3}
                                options={condition.floor}
                            />
                        </Form.Item>
                        <Form.Item name='rentType' label='租房方式'>
                            <Selector
                                columns={3}
                                options={condition.rentType}
                            />
                        </Form.Item>
                        <Form.Item name='oriented' label='房屋朝向'>
                            <Selector
                                columns={3}
                                options={condition.oriented}
                            />
                        </Form.Item>
                        <Form.Item name='roomType' label='房屋类型'>
                            <Selector
                                columns={3}
                                options={condition.roomType}
                            />
                        </Form.Item>
                        <Form.Item name='community' label='房屋所在位置'>
                            <CascadePickerView options={condition.area.children}/>
                        </Form.Item>
                        <Form.Item name='size' label='平方'>
                            <Input placeholder='请输入平方'/>
                        </Form.Item>
                        <Form.Item name='price' label='租金'>
                            <Input placeholder='请输入租金'/>
                        </Form.Item>
                        <Form.Item name='community' label='小区'>
                            <Input placeholder='请输入所在小区'/>
                        </Form.Item>
                    </Form>
                ) : ''
            }

        </div>
    )
}
