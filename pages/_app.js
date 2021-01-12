import { AppProvider } from "../context/app/appContext";
import { AuthProvider } from "../context/auth/authContext";


const MyApp = ({ Component , pageProps}) => {
    return (
        <AuthProvider>
            <AppProvider>
                <Component {...pageProps}/>
            </AppProvider>
        </AuthProvider>
    )
}

export default MyApp;

