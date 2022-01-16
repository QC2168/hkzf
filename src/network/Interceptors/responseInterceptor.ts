import {AxiosResponse} from 'axios';
import {Toast} from 'antd-mobile';

export default (response: AxiosResponse)=> {
    const {data: {status, body}} = response;
    // 如果http响应状态码response.status正常，则直接返回数据
    if (status === 200) {
        return body;
    }

    // 其他情况
    Toast.show({
        icon: 'fail',
        content: '网络请求异常',
        maskClickable: false
    });
};
