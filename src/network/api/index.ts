import Api, {ApiType} from '../request';
import {
    ResponseDataType,
    SwiperDataType,
    GroupDataType,
    NewsDataType,
    HousesListType,
    ConditionType,
    HousesItemDetailType,
    HousesMapItemType,
    LoginType,
    TokenType,
    FavoritesType,
    HousesItemType,
    HousesItemReleaseType,
    RecordCountType
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

export const getCondition = (id: string) => {
    return ApiInstance.request<ConditionType>({
        url: '/houses/condition',
        method: 'get',
        params: {
            id,
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

export const register = ({username, password}: LoginType) => {
    return ApiInstance.request<TokenType>({
        url: '/user/registered',
        method: 'POST',
        data: {
            username,
            password
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
export  const favorites=(id: string, query :boolean= false)=>{
    return ApiInstance.request<null | { isFavorite: boolean }>({
        url: `/user/favorites/${id}`,
        method: query ? 'GET' : 'POST'
    })
}

// 获取收藏商品
export const favoritesHouses = () => {
    return ApiInstance.request<HousesItemType[]>({
        url: `/user/favorites`,
    })
}
// 获取收藏商品数量
export const favoriteCount = () => {
    return ApiInstance.request<{count:number}>({
        url: `/user/favoritesCount`,
    })
}

// 获取房屋查询数据
export const housesParams=()=>{
    return ApiInstance.request<unknown>({
        url:'/houses/params'
    })
}

// 上传图片
export const housesImageUpload=(file:File)=>{
    let data=new FormData()
    data.append('file',file)
    return ApiInstance.request<[string]>({
        url:'/houses/image',
        method:'post',
        headers:{
          'Content-Type':'multipart/form-data'
        },
        data
    })
}

// 发布房屋
export const releaseHouses=({title,description,houseImg,oriented,supporting,price,roomType,size,floor,community}:HousesItemReleaseType)=>{
return ApiInstance.request<unknown>({
    url:'/user/houses',
    method:'post',
    data:{
        title,description,houseImg,oriented,supporting,price,roomType,size,floor,community
    }
})
}

// 请求收藏数量和浏览记录数量
export const getHistory=()=>{
    return ApiInstance.request<RecordCountType>({

    })
}

// 请求个人信息
export const getUserInfo=()=>{
return ApiInstance.request<unknown>({
    url:'/user',
    method:'get',
})
}