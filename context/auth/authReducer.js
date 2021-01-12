import { types } from "../../types/types";


export const authReducer = (state, action) => {
    
    switch (action.type) {
        case types.authRegisterMsg:
        case types.authRegisterError:
        case types.authLoginError:
            return {
                ...state,
                mensaje:action.payload
            }
        case types.authMsgCleaner:
            return {
                ...state,
                mensaje: null
            }
            case types.authLogin:
                return {
                    ...state,
                    token: action.payload.token,
                    usuario: action.payload.usuario,
                    autenticado: true
                }
            case types.authLogout:
                return {
                    ...state,
                    token: '',
                    usuario: null,
                    autenticado: false
                }
    
        default:
            return state;
    }
}
