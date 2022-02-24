// 获取环境变量中的url
export const BASE_URL = import.meta.env.VITE_APP_URL;

export const SetToken = (token: string): boolean => {
    localStorage.setItem('token', token)
    return true
}
export const GetToken = (): string => {
    const token: string | null = localStorage.getItem('token')
    if (token !== null) {
        return token
    } else {
        return ''
    }

}
export const addLocalStorage=<T>(name:string,data:T):boolean=>{
    const value=JSON.stringify(data)
    localStorage.setItem(name, value)
    return true
}