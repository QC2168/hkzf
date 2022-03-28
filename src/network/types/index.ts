import React from 'react';

export interface ResponseDataType<Data = any> {
    body: Data,
    description: string,
    status: number
}

export interface SwiperDataType {
    alt: string
    id: number
    imgSrc: string
}

export interface GroupDataType {
    desc: string,
    id: number,
    imgSrc: string,
    title: string
}

export interface NewsDataType {
    date: string,
    from: string,
    id: number,
    imgSrc: string,
    title: string
}

export interface HousesItemType {
    desc: string
    houseCode: string
    houseImg: string|string[]
    price: number
    tags: string[]
    title: string,
    style?: React.CSSProperties
    onClick?: () => void
}

export interface HousesItemDetailType extends HousesItemType {
    community: string
    coord: { latitude: number, longitude: number }
    description: string
    floor: string
    oriented: string[]
    roomType:string
    size: number
    supporting: string[]
}

export interface HousesListType {
    count: number;
    list: HousesItemType[] | [];
}


// 查找房屋条件
interface areaType {
    children: {
        label: string,
        value: string
    }[],
    label: string,
    value: string
}

interface characteristicType {
    label: string,
    value: string
}

interface floorType {
    label: string,
    value: string
}

interface orienteType {
    label: string,
    value: string
}

interface priceType {
    label: string,
    value: string
}

interface rentType {
    label: string,
    value: string
}

interface roomType {
    label: string,
    value: string
}

interface subwayType {
    children: {
        label: string,
        value: string
    }[],
    label: string,
    value: string
}

export interface ConditionType {
    area: areaType,
    characteristic: characteristicType[],
    floor: floorType[],
    oriented: orienteType[],
    price: priceType[],
    rentType: rentType[],
    roomType: roomType[],
    subway: subwayType,
}

//地图找房
export interface HousesMapItemType{
    coord: { latitude: string, longitude: string }
    count:number
    label:string
    value:string
}

// 登录
export interface LoginType {
    username: string;
    password: string;
}
export interface TokenType{
    token:string
}

// 收藏
export interface FavoritesType extends TokenType{
    id:string
}