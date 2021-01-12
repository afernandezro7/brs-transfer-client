import React, { useContext, useState } from 'react'
import { appContext } from '../context/app/appContext'

export const Form = () => {

    const [passProtect, setPassProtect] = useState(false)
    const { introducirPassword, introducirDescargas } = useContext(appContext)

    return (
        <div className="w-full mt-20">
            <label className="text-lg text-gray-800">Eliminar después de:</label>
            <select 
                className="appereance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
                onChange={ (e)=>introducirDescargas(parseInt(e.target.value)) }
            >
                <option value="1" defaultValue>1 Descarga</option>
                <option value="5" >5 Descargas</option>
                <option value="10">10 Descargas</option>
                <option value="20">20 Descargas</option>
            </select>

            <div className="mt-4">
                <div className="flex justify-between items-center">

                    <label className="text-lg text-gray-800 mr-2">Proteger con contraseña</label>
                    <input
                        type="checkbox"
                        className=""
                        onChange={ ()=> setPassProtect(!passProtect) }
                    />
                </div>
                {
                    passProtect
                    &&
                    <input
                        type="password"
                        autoComplete="new-password"
                        className="appereance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
                        onChange={ (e)=>introducirPassword(e.target.value) }

                    />
                }
            </div>
        </div>
    )
}
