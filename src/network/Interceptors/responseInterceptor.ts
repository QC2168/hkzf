import {AxiosResponse} from 'axios';
import {Toast} from 'antd-mobile';
import {FrownOutline} from 'antd-mobile-icons';

export default (response: AxiosResponse) => {
    const {data: {status, body, description}} = response;
    // 如果http响应状态码response.status正常，则直接返回数据
    if (status === 200) {
        return body;
    }

    // 其他情况
    Toast.show({
        icon: 'fail',
        content: description,
        maskClickable: false,
        duration: 5000
    });
};
