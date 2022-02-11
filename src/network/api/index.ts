import Api, {ApiType} from '../request';
import {ResponseDataType, SwiperDataType, GroupDataType, NewsDataType, HousesListType, ConditionType} from '../types';
import {AxiosRequestConfig} from 'axios';
import responseInterceptor from '../Interceptors/responseInterceptor';
import requestInterceptor from '../Interceptors/requestInterceptor';
import {BASE_URL} from '../../utils';

const cfg: AxiosRequestConfig = {
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {},
};
const option: ApiType = {
    cfg: {
        baseURL: BASE_URL,
        timeout: 5000,
    },
    interceptor: {
        requestInterceptor,
        responseInterceptor
    }
};
const ApiInstance = new Api(option);

export const getSwiper = () => {
    return ApiInstance.request<SwiperDataType[]>({
        url: '/home/swiper',
        method: 'get'
    });
};

export const getGroups = () => {
    return ApiInstance.request<GroupDataType[]>({
        url: '/home/groups',
        method: 'get'
    });
};

export const getNews = () => {
    return ApiInstance.request<NewsDataType[]>({
        url: '/home/news',
        method: 'get'
    });
};

export const getHousesList = (cityId: string) => {
    return ApiInstance.request<HousesListType>({
        url: '/houses',
        method: 'get',
        params: {
            cityId
        }
    });
};

interface paramsType {
    area?: string;
    subway?: string;
    rentType?: string;
    price?: string;
    more?: string;
    roomType?: string;
    oriented?: string;
    characteristic?: string;
    floor?: string;
    start?: string;
    end?: string;
}

export const getCondition = (cityId: string, params: paramsType={}) => {
    const {
        area = '',
        subway = '',
        rentType = '',
        price = '',
        more = '',
        roomType = '',
        oriented = '',
        characteristic = '',
        floor = '',
        start = '',
        end = ''
    } = params;
    return ApiInstance.request<ConditionType>({
        url: '/houses/condition',
        method: 'get',
        params: {
            id: cityId,
            area,
            subway,
            rentType,
            price,
            more,
            roomType,
            oriented,
            characteristic,
            floor,
            start,
            end
        }
    });
};
