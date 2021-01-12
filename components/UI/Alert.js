import React from 'react'
import { useContext } from 'react';
import { authContext } from '../../context/auth/authContext';
import { appContext } from '../../context/app/appContext';


export const Alert = () => {

    const { mensaje } = useContext(authContext)
    const { file_msg } = useContext(appContext)

    return (
        <div className="bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto">
            { mensaje || file_msg }
        </div>
    )
}
