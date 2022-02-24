import React, {FC, useEffect, useState} from 'react'
import {
    Form,
    Input,
    Button,
    Dialog,
    Selector,
    CascadePickerView, ImageUploader,
} from 'antd-mobile'
import NavBar from "../../components/NavBar";
import {useMount} from "react-use";
import {getCondition} from "../../network/api";
import {useAtom} from "jotai";
import {cityAtom} from "../../atom";
import {ConditionType} from "../../network/types";
import styles from './index.module.less'
import {ImageUploadItem} from "antd-mobile/es/components/image-uploader";

async function uploadImage() {
    console.log('调用的图片上次')
}

// 上传状态
const UploadStatus = () => {
    const [fileList, setFileList] = useState<ImageUploadItem[]>([])

    return (
        <ImageUploader
            value={fileList}
            onChange={setFileList}
            upload={uploadImage as any}
        />
    )
}
export default () => {
    const [{cityID}] = useAtom(cityAtom)
    const [condition, setCondition] = useState<ConditionType | undefined>()
    useMount(() => {
        getCondition(cityID).then(res => setCondition(res))
    })

    const onFinish = (values: any) => {
        console.log(values)

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
                        <Form.Item name='address' label='房屋描述'>
                            <Input placeholder='请输入地址'/>
                        </Form.Item>
                        <Form.Item name='characteristic' label='设备提供'>
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
                        <Form.Item name='area' label='房屋所在位置'>
                            <CascadePickerView options={condition.area.children}/>
                        </Form.Item>
                        <Form.Item name='square' label='平方'>
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