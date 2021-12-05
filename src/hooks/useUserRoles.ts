import {useAuth0} from "@auth0/auth0-react";
import {useEffect, useState} from "react";


const useUserRoles = (): string[] => {
    const {isAuthenticated, getIdTokenClaims} = useAuth0();
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const getRoles = async () => {
            const key = process.env.REACT_APP_AUTH0_AUDIENCE + '/roles';
            const idTokenClaims = await getIdTokenClaims();
            setRoles(idTokenClaims[key]);
        };

        if (isAuthenticated) {
            getRoles();
        }
    }, [isAuthenticated]);

    return roles;
}

export default useUserRoles;