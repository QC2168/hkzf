import Api, {ApiType} from '../request';
import {
    ResponseDataType,
    SwiperDataType,
    GroupDataType,
    NewsDataType,
    HousesListType,
    ConditionType,
    HousesItemDetailType, HousesMapItemType, LoginType, TokenType, FavoritesType, HousesItemType
} from '../types';
import {AxiosRequestConfig} from 'axios';
import responseInterceptor from '../Interceptors/responseInterceptor';
import requestInterceptor from '../Interceptors/requestInterceptor';
import {BASE_URL} from '../../utils';
import {LogType} from 'vite';

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

export const getHousesList = (cityId: string, params: paramsType = {}) => {
    const {
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
    } = params;
    return ApiInstance.request<HousesListType>({
        url: '/houses',
        method: 'get',
        params: {
            cityId,
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

export const getCondition = (cityId: string, params: paramsType = {}) => {
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

export const getHousesDetail = (housesCode: string) => {
    return ApiInstance.request<HousesItemDetailType>({
        url: `/houses/${housesCode}`,
        method: 'get'
    });
};
// 地图找房

export const getMapHouses = (housesCode: string) => {
    return ApiInstance.request<HousesMapItemType[]>({
        url: '/area/map',
        params: {
            id: housesCode
        }
    });
};

export const login = ({username, password}: LoginType) => {
    return ApiInstance.request<TokenType>({
        url: '/user/login',
        method: 'POST',
        data: {
            username,
            password
        }
    });
};

// 收藏商品
export const favorites=(id:string)=>{
    return ApiInstance.request<unknown>({
        url:`/user/favorites/${id}`,
        method:'POST'
    })

}// 获取收藏商品
export const favoritesHouses=()=>{
    return ApiInstance.request<HousesItemType[]>({
        url:`/user/favorites`,
    })

}