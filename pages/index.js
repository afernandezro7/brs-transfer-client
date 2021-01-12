import {Layoult} from '../components/Layoult'
import {useContext, useEffect} from 'react';
import {authContext} from '../context/auth/authContext';
import { appContext } from '../context/app/appContext';
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Dropzone } from '../components/UI/Dropzone'
import { Alert } from '../components/UI/Alert';

export default function Home() { 
    
    // Extraer el usuario autenticado de localstorage
    const { usuarioAutenticado } = useContext(authContext)
    const { file_msg, url } = useContext(appContext)
    const router = useRouter()

    useEffect(() => {   
        const token = localStorage.getItem('token');    
        if(token){
            usuarioAutenticado()       
        }   
    }, [])

    return (
        <Layoult>
            <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
                {
                    url
                    ? 
                      <>
                        <p className="text-center text-2xl mt-10">
                            <span className="font-bold text-red-700 text-4xl uppercase">Tu URL es: </span> 
                            {`${process.env.frontendURL}/enlaces/${url}`}
                        </p> 
                        <button
                            type="button"
                            className="mt-10 bg-red-400 hover:bg-gray-900 rounded w-full p-2 text-white uppercase font-bold"
                            onClick={ ()=>navigator.clipboard.writeText(`${process.env.frontendURL}/enlaces/${url}`) }
                        >Copiar Enlace</button>
                      </>
                    : <>
                        {
                            file_msg
                            && <Alert/>
                        }
                        <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
                            <Dropzone/>
                            <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                                <h2 className="text-4xl font-sans font-bold textgray-800 my-4">Compartir Archivos de forma sencilla y privada</h2>
                                <p className="text-lg leading-loose">
                                    <span className="text-red-500 font-bold">BRS-TRANSFER</span> te permite compartir archivos con cifrado de extremo a extremo y el archivo que es eliminado después de ser descargado. Así que puedes mantener lo que compartes en privado y asegurar que tus cosas no permanezcan en línea para siempre
                                </p>
                                <Link href='/crearcuenta'>
                                    <a className="text-red-500 font-bold text-lg hover:text-red-700">Crea una cuenta para mayores beneficios</a>
                                </Link>
                            </div>
                        </div>
                    </>
                }
            </div>
        </Layoult>
    )
}

