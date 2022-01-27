import { atom } from 'jotai'
import {cityType} from './types';

export const cityAtom = atom<cityType>({
    cityName:'北京',
    cityID:'AREA|88cff55c-aaa4-e2e0'
})
export const countAtom = atom<number>(0)
