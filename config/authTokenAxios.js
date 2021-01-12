import clienteAxios from "./axios";


export const authTokenAxios = (token) => {
    if(token){
        clienteAxios.defaults.headers.common['token'] = token;
    }else{
        delete clienteAxios.defaults.headers.common['token'];
    }
}
