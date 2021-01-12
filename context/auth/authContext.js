import { createContext, useReducer } from 'react';
import { types } from '../../types/types';
import { authReducer } from './authReducer';

import clienteAxios from '../../config/axios';
import { authTokenAxios } from '../../config/authTokenAxios';


export const authContext = createContext();

export const AuthProvider = ({children}) => {

    //  Initial State
    const initialState = {
        token:  typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '',
        autenticado: false,
        usuario: null,
        mensaje: null
    }

    // Defining reducer
    const [state, dispatch] = useReducer(authReducer, initialState)

    // Registrar nuevos clientes
    const registrarUsuario = async datos =>{
        try {
            const {data} = await clienteAxios.post('api/users/create', datos)
            dispatch({
                type: types.authRegisterMsg,
                payload: data.msg
            })
        } catch (error) {
            dispatch({
                type: types.authRegisterError,
                payload: error.response.data.msg
            })
        }

        setTimeout(() => {
            dispatch({
                type: types.authMsgCleaner
            })
        }, 3000);
    }

    // Autenticar Usuario
    const iniciarSesion = async datos =>{

        try {
            const {data} = await clienteAxios.post('api/auth/', datos)
            localStorage.setItem('token', data.token)
            authTokenAxios(data.token)
            
            dispatch({
                type: types.authLogin,
                payload:{
                    token: data.token,
                    usuario: data.user
                }
            })
        } catch (error) {

            dispatch({
                type: types.authLoginError,
                payload: error.response.data.msg
            })
        }

        setTimeout(() => {
            dispatch({
                type: types.authMsgCleaner
            })
        }, 3000);
    }

    // Retorna el usuario autenticado en base al JWT
    const usuarioAutenticado = async () =>{
        const token = localStorage.getItem('token');
        if(token){
            authTokenAxios(token)
        }

        try {
            const { data } = await clienteAxios.get('/api/auth/');
            dispatch({
                type: types.authLogin,
                payload:{
                    token: data.token,
                    usuario: data.user
                }
            })
        } catch (error) {
            console.log('Bienvenido a BrsTransfer');
        }
    }

    const cerrarSesion = () =>{
        localStorage.removeItem('token')
        authTokenAxios(null)
        dispatch({
            type: types.authLogout,
        })
    }

    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {children}
        </authContext.Provider>
    )
}