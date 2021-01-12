import { useContext, useState } from 'react'
import {Layoult} from '../../components/Layoult'
import { Alert } from '../../components/UI/Alert'
import clienteAxios from '../../config/axios'
import { appContext } from '../../context/app/appContext'



export async function getServerSideProps({params}){
    
    try {
        const {data} = await clienteAxios.get(`/api/links/${params.enlace}`)

        return {
            props:{
                enlace: data.link,
                hasPassword: data.password
            }
        }
    } catch (error) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
    
}


export default function Enlace ({enlace, hasPassword}) {

    const [isProtected, setProtected] = useState(hasPassword)
    const [password, setPassword] = useState('')
    const { file_msg, mostrarAlerta, limpiarAlerta } = useContext(appContext)

    const verificarPassword = async e =>{
        e.preventDefault();
        
        try {
            const {data} = await clienteAxios.post(`/api/links/${enlace.url}`, {password} ) 
           
            if(data.ok){
                setProtected(false)
            }
        } catch (error) {
            mostrarAlerta(error.response.data.msg);

            setTimeout(() => {
                limpiarAlerta()  
            }, 3000);

        }
    }

    return (
        <Layoult>
            {
                isProtected 
                ?<>
                    <p className="text-center">Este enlace está protegido por un Password, colócalo a continuación</p>
                    {
                        file_msg && <Alert/>
                    }
                    <div className="flex justify-center mt-5">
                        <div className="w-full max-w-lg">
                            <form
                                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                onSubmit={ verificarPassword }
                            >
                                <div className="mb-4">
                                    <label 
                                        className="block text-black text-sm font-bold mb-2"
                                        htmlFor="nombre"
                                    >Contraseña</label>
                                    <input
                                        type="password"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        onChange={ (e)=> setPassword(e.target.value) }
                                        value= { password }
                                    />
                                </div>
                                <input
                                    type="submit"
                                    className="bg-red-400 hover:bg-gray-900 rounded w-full p-2 text-white uppercase font-bold"
                                    value="Validar Contraseña"
                                />

                            </form>
                        </div>
                    </div>
                    
                </>
                :<>
                    <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo:</h1>       
                    <div className="flex items-center justify-center mt-10">
                        <a href={`${process.env.backendURL}/api/uploads/${enlace.name}`} className="bg-red-500 text-center text-white px-10 py-3 rounded uppercase font-bold cursor-pointer">Aquí</a>
                    </div>
                </>
            }


        </Layoult>
    )
}
