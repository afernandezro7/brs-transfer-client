import { useCallback, useContext } from 'react'
import { useDropzone } from 'react-dropzone'
import { authContext } from '../../context/auth/authContext'
import { appContext } from '../../context/app/appContext'
import { Form } from '../Form'

export const Dropzone = () => {

    const { mostrarAlerta, limpiarAlerta, subirArchivo, loading, crearEnlace } = useContext(appContext)
    const { usuario, autenticado } = useContext(authContext)
    
    const onDropAccepted = useCallback( async(acceptedFiles)=>{

        //Crear un formdata
        const formdata = new FormData()
        formdata.append('archive',acceptedFiles[0])
        
        subirArchivo(formdata, acceptedFiles[0].path)

        
    })
    
    const onDropRejected = ( e )=>{
        mostrarAlerta('no se pudo subir, el límite es 5Mb, obten una cuenta para archivos más grandes');
        console.log(e);

        setTimeout(() => {
            limpiarAlerta()
        }, 6000);
    }
    
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({onDropAccepted, onDropRejected, maxSize: 5000000, maxFiles:1})
    

    const fileItems = acceptedFiles.map( file =>(
        <li 
            key={ file.lastModified }
            className="bg-white flex- p-3 mb-4 shadow-lg rounded"
        
        >
            <p className="font-bold text-xl">{ file.path }</p>
            <p className="text-sm text-grey-500">{ (file.size / Math.pow(1024, 2)).toFixed(3) } Mbytes</p>
        </li>
    ));

    return (
        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
            
            {
                acceptedFiles.length > 0
                    ?
                    <div className="mt-10 w-full">
                        <h4 className="text-2xl font-bold text-center mb-4">Archivo</h4>
                        <ul>
                            { fileItems }
                        </ul>

                        {
                            autenticado
                            && <Form/>

                        }

                        {
                            loading
                            ? 
                            <p className="my-10 text-center text-gray-600">
                                Subiendo Archivo...
                            </p>
                            :
                            <button
                                className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                                type="button"
                                onClick= { crearEnlace }
                            >Crear Enlace</button>
                        }
                    </div> 
                    : 
                    <div { ...getRootProps( {className: 'dropzone w-full py-32'} )}>
                        
                        <input 
                            className="h-100" 
                            { ...getInputProps() } 
                        />

                        
                            {
                                isDragActive 
                                ? <p className="text2xl text-center text-gray-600">Suelte el archivo aquí</p>
                                : <div className="text-center">
                                    <p className="text-2xl text-center text-gray-600">Selecciona un archivo o arrástralo</p>
                                    <button 
                                        className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                                        type="button"
                                    >Selecciona archivos para subir</button>
                                </div>                  
                            }

                    </div>
            }
            
        </div>
    )
}
