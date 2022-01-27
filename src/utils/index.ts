// 获取环境变量中的url
import {useEffect} from 'react';

export const BASE_URL = import.meta.env.VITE_APP_URL;

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback();
    }, []);
};

