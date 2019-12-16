import {authcall} from '../api/apiCall'

export default {
    install(Vue){
        console.log(Vue.cookies,Vue,'hi')
        if( Vue.$cookies.isKey('x-auth-token') ){
            authcall.interceptors.request.use(
                config => {
                  config.headers['x-auth-token'] = Vue.$cookies.get('x-auth-token');
                  return config;
                })
            }
        if( !Vue.$cookies.isKey('checkLogedin') ){ 
            Vue.$cookies.set('checkLogedin','false')
        }
    }
} 