import {AxiosRequestConfig} from 'axios';
import {GetToken} from "../../utils";


export default (res: AxiosRequestConfig)=> {
    // 获取token
    if (res.headers){
        res.headers['authorization']=GetToken()
    }else{
        res.headers={
            authorization:GetToken()
        }
    }

    return res
}
