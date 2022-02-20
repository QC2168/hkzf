import { atom } from 'jotai'
import {cityType, HousesRecordType} from './types';

export const cityAtom = atom<cityType>({
    cityName:'广州市',
    cityID:'AREA|e4940177-c04c-383d'
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
