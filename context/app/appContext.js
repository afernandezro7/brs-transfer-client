import { createContext, useReducer } from 'react';
import clienteAxios from '../../config/axios';
import { types } from '../../types/types';
import { appReducer } from './appReducer';

export const appContext = createContext();

export const AppProvider = ({children}) => {
    //  Initial State
    const initialState = {
        file_msg: null,
        name: null,
        original_name: null,
        loading: false,
        downloads: 1,
        password: null,
        author: null,
        url: ''
    }

    // Defining reducer
    const [state, dispatch] = useReducer(appReducer, initialState)

    // Mostrar Alerta
    const mostrarAlerta = msg =>{
        dispatch({
            type: types.appFileShowAlert,
            payload: msg
        })
    }

    const limpiarAlerta = () =>{
        dispatch({
            type: types.appFileCleanAlert
        })
    }

    const subirArchivo = async(formdata, nombreArchivo)=>{

        dispatch({
            type: types.appLoadingFileUploaded,
            payload: true
        })

        try {           
            const resultado = await clienteAxios.post('api/uploads/',formdata)
            dispatch({
                type: types.appFileUploaded,
                payload: {
                    name: resultado.data.archive,
                    original_name: nombreArchivo
                }
            })
        } catch (error) {

            dispatch({
                type: types.appFileUploadedError,
                payload: error.response.data.msg
            })

            setTimeout(() => {
                dispatch({
                    type: types.appFileCleanAlert
                })
            }, 3000);
        }

    }

    const crearEnlace = async()=>{

        const data = {
            original_name: state.original_name,
            name: state.name,
            password: state.password,
            downloads: state.downloads
        }

        try {
            const respuesta = await clienteAxios.post('api/links/create', data)
            dispatch({
                type: types.appFileLinkSuccess,
                payload: respuesta.data.link.url
            })
        } catch (error) {

            dispatch({
                type: types.appFileLinkError,
                payload: error.response.data.msg
            })

            setTimeout(() => {
                dispatch({
                    type: types.appFileCleanAlert
                })
            }, 3000);
        }


    }

    const limpiarState = ()=>{
        dispatch({
            type: types.appCleanState
        })
    }

    const introducirPassword = (password)=>{
        dispatch({
            type: types.appSetPassword,
            payload: password
        })
    }
    const introducirDescargas = (descargas)=>{
        dispatch({
            type: types.appSetDownloads,
            payload: descargas
        })
    }

    return (
        <appContext.Provider
            value={{
                file_msg: state.file_msg,
                name: state.name,
                original_name: state.original_name,
                loading: state.loading,
                downloads: state.downloads,
                password: state.password,
                author: state.author,
                url: state.url,
                mostrarAlerta,
                limpiarAlerta,
                subirArchivo,
                crearEnlace,
                limpiarState,
                introducirPassword,
                introducirDescargas
            }}
        >
            {children}
        </appContext.Provider>
    )
}