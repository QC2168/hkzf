const TOKEN_NAME = 'hkzf_token';

// 获取token
export const getToken = () => localStorage.getItem(TOKEN_NAME);

// 设置token
export const setToken = (value) => localStorage.setItem(TOKEN_NAME, value);

// 删除token
export const removeToken = () => localStorage.removeItem(TOKEN_NAME);

// 是否登录
export const isAuth = () => !!getToken();
