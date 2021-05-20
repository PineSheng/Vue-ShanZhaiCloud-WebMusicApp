//1. 导入axios对象
import axios from "axios";
//2. 创建对象实例，create方法
const Server = axios.create({
    //请求接口的基础地址
    baseURL: 'http://121.4.39.188:3000/', 
    //设置超时时间
    timeout: 4000 
})

export default Server // 导出自定义创建 axios 对象