import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";


const useTokenForRequests = () => {
    const {isAuthenticated, getAccessTokenSilently} = useAuth0();
    if (isAuthenticated) {
        getAccessTokenSilently()
            .then(t => axios.defaults.headers.common['Authorization'] = `Bearer ${t}`);

    }

    // axios.interceptors.request.use(async (request) => {
    //     if (isAuthenticated && request.headers) {
    //         const token = await getAccessTokenSilently();
    //         request.headers.Authorization = `Bearer ${token}`;
    //     }
    //     return request;
    // });
}

export default useTokenForRequests;