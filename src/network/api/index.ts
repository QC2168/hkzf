import Api, {ApiType} from '../request';
import {ResponseDataType, SwiperDataType, GroupDataType, NewsDataType} from '../types';
import {AxiosRequestConfig} from 'axios';
import responseInterceptor from '../Interceptors/responseInterceptor';
import requestInterceptor from '../Interceptors/requestInterceptor';
import {BASE_URL} from '../../utils';
const cfg: AxiosRequestConfig = {
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {},
};
const option:ApiType={
    cfg:{
        baseURL: BASE_URL,
        timeout: 5000,
    },
    interceptor:{
        requestInterceptor,
        responseInterceptor
    }
}
const ApiInstance=new Api(option)

export const getSwiper=()=>{
    return ApiInstance.request<SwiperDataType[]>({
        url: '/home/swiper',
        method: 'get'
    })
}

export const getGroups=()=>{
    return ApiInstance.request<GroupDataType[]>({
        url: '/home/groups',
        method: 'get'
    })
}

export const getNews=()=>{
    return ApiInstance.request<NewsDataType[]>({
        url: '/home/news',
        method: 'get'
    })
}
