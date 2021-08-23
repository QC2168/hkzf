import axios from "axios";

export const getCurrentCity = () => {
//    判断本地存储是否有定位的城市
    const localCity = JSON.parse(localStorage.getItem('hkzf_city'))
    if (!localCity) {
        //    没有，就使用首页中获取定位城市的代码来获取，并且存储到本地存储中，然后返回城市
        return new Promise((resolve, reject) => {
            const myCity = new window.BMap.LocalCity()
            myCity.get(async (res) => {
                try {
                    const result = await axios.get(`http://127.0.0.1:8009/area/info?name=${res.name}`)
                    // 存储到本地存储
                    localStorage.setItem('hkzf_city', JSON.stringify(result.data.body))
                    resolve(result.data.body)
                } catch (e) {
                    // 获取失败
                    reject(e)
                }

            })
        })
    } else {
        // 如果有 直接返回
        // 这里的promise不会失败，直接返回成功的就可以了
        return Promise.resolve(localCity)
    }
}
