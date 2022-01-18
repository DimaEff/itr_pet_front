import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";
import {useEffect} from "react";


const useTokenForRequests = () => {
    const {isAuthenticated, getAccessTokenSilently} = useAuth0();

    useEffect(() => {
        const addToken = async () => {
            const token = await getAccessTokenSilently();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('auth0_token', token);
        }

        if (isAuthenticated) {
            addToken();
        }
    }, [isAuthenticated])

    // axios.interceptors.request.use(async (request) => {
    //     if (isAuthenticated && request.headers) {
    //         const token = await getAccessTokenSilently();
    //         request.headers.Authorization = `Bearer ${token}`;
    //     }
    //     return request;
    // });
}

export default useTokenForRequests;