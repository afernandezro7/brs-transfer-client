import Link from 'next/link'
import { useContext } from 'react';
import { authContext } from '../context/auth/authContext';
import { appContext } from '../context/app/appContext';

export const Header = () => {

    const { autenticado, usuario, cerrarSesion } = useContext(authContext)
    const { limpiarState } = useContext(appContext)

    return (
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            <Link href="/">
                <img 
                    src="/aniversario.png"
                    alt="logo"
                    className="w-64 mb-8 md:mb-0 cursor-pointer"
                    onClick={ limpiarState }
                />
            </Link>
            <div>
                {
                    autenticado
                    ? 
                    <div className="flex items-center">
                        <p className="mr-2">Hola {usuario.name}</p>
                        <button 
                            type="button"
                            className="bg-gray-600 px-5 py-2 rounded-md font-bold text-white uppercase"
                            onClick={ cerrarSesion }
                        >Cerrar Sesión</button>
                    </div>
                    :
                    <>
                        <Link href="/login">
                            <a className="bg-pink-600 px-5 py-2 mr-2 rounded-md font-bold text-white uppercase">Iniciar Sesión</a>
                        </Link>
                        <Link href="/crearcuenta">
                            <a className="bg-gray-600 px-5 py-2 rounded-md font-bold text-white uppercase">Crear Cuenta</a>
                        </Link>
                    </>
                    
                }
            </div>
        </header>
    )
}
