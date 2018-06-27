/**
 * Created by superman on 17/2/16.
 * http配置
 */

import axios from 'axios'
import store from '../store/store'
import router from '../router'

// axios 配置
axios.defaults.timeout = 50000;

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.token) {
            config.headers.provider_sid = `${store.state.token}`;//${}es6语法，在字符串中使用变量。
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });
// http response 拦截器

axios.interceptors.response.use(
    response => {
        if(response.data.code==202){
            store.commit("logout");
            router.replace({
                name: 'login'
                // query: {redirect: router.currentRoute.fullPath}                       
            })

        }
        return response;
    },
    error => {
        if (error.response) {
           
            switch (error.response.code) {
                case 202:
                    // 401 清除token信息并跳转到登录页面
                    store.commit("logout");
                    router.replace({
                        path: 'login'
                        // query: {redirect: router.currentRoute.fullPath}                       
                    })
            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        // return Promise.reject(error.response.data)
    });
export default axios;
