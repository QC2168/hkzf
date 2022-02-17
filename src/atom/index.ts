import { atom } from 'jotai'
import {cityType, HousesRecordType} from './types';

export const cityAtom = atom<cityType>({
    cityName:'北京',
    cityID:'AREA|88cff55c-aaa4-e2e0'
})
export const updateCityAtom=atom(
    (get)=>get(cityAtom),
    (get,set,city:cityType)=>set(cityAtom,city)
)

export const housesRecordsAtom=atom<HousesRecordType[]>([])
export const addHousesRecordsAtom=atom(
    (get)=>get(housesRecordsAtom),
    (get,set,HousesRecord:HousesRecordType)=>set(housesRecordsAtom,[...get(housesRecordsAtom),HousesRecord])
)

export const housesFavoritesAtom=atom<HousesRecordType[]>([])
export const addHousesFavoritesAtom=atom(
    (get)=>get(housesFavoritesAtom),
    (get,set,housesFavorite:HousesRecordType)=>set(housesFavoritesAtom,[...get(housesFavoritesAtom),housesFavorite])
)
