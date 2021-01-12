import { types } from "../../types/types";


export const appReducer = (state, action) => {

    switch (action.type) {
        case types.appFileShowAlert:
            return {
               ...state,
               file_msg: action.payload
            }
        case types.appFileCleanAlert:
            return {
               ...state,
               file_msg: null
            }
        case types.appFileUploaded:
            return {
               ...state,
               name: action.payload.name,
               original_name: action.payload.original_name,
               loading: false
            }
        case types.appFileUploadedError:
            return {
               ...state,
               file_msg: action.payload,
               loading: false
            }
        case types.appLoadingFileUploaded:
            return {
               ...state,
               loading: true
            }
        case types.appFileLinkSuccess:
            return {
               ...state,
               url: action.payload
            }
        case types.appFileLinkError:
            return {
               ...state,
               file_msg: action.payload
            }
        case types.appCleanState:
            return {
               ...state,
               url: '',
               name: null,
               original_name: null
            }
        case types.appSetPassword:
            return {
               ...state, 
               password: action.payload
            }
        case types.appSetDownloads:
            return {
               ...state, 
               downloads: action.payload
            }
    
        default:
            state
    }

}