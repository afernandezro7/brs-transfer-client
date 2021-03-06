import Head from 'next/head'
import { Header } from './Header'

export const Layoult = ({children}) => {
    return (
        <>
            <Head>
                <title>BRS Transfer</title>
                <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"/>
            </Head>

            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto">

                    <Header/>

                    <main className="mt-10">
                        {children}   
                    </main>
                    
                </div>
            </div>

        </>
    )   
}
