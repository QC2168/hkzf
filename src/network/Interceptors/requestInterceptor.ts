import {AxiosRequestConfig} from 'axios';
import {GetToken} from "../../utils";


export default (res: AxiosRequestConfig)=> {
    // 获取token
    res.headers={
        authorization:GetToken()
    }
    return res
}
