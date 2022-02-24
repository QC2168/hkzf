import {atom} from 'jotai';
import {cityType, HousesRecordType, UserStoreType} from './types';
import {addLocalStorage, SetToken} from "../utils";

export const cityAtom = atom<cityType>({
    cityName: '广州市',
    cityID: 'AREA|e4940177-c04c-383d'
});
export const updateCityAtom = atom(
    (get) => get(cityAtom),
    (get, set, city: cityType) => {
        addLocalStorage<cityType>('cityAtom',city)
        set(cityAtom, city)
    }
);

export const housesRecordsAtom = atom<HousesRecordType[]>([]);
export const addHousesRecordsAtom = atom(
    (get) => get(housesRecordsAtom),
    (get, set, HousesRecord: HousesRecordType) => {
        const newArr:HousesRecordType[]=[...get(housesRecordsAtom), HousesRecord]
            addLocalStorage<HousesRecordType[]>('cityAtom',newArr)
        set(housesRecordsAtom, newArr)
    }
);


// 登录数据
export const userStoreAtom = atom<UserStoreType>({username: '', token: ''});
export const updateUserStoreAtom = atom(
    (get) => get(userStoreAtom),
    (get, set, userStore:UserStoreType) => {
        // 将token放到本地存储
        SetToken(userStore.token)
        set(userStoreAtom, userStore)
    }
);
