import {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";


interface IUseRoles {
    isAdmin: boolean;
    roles: string[];
}

const useRoles = (): IUseRoles => {
    const {isAuthenticated, getIdTokenClaims} = useAuth0();
    const [roles, setRoles] = useState<string[]>([]);

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

    return {isAdmin: roles.includes('admin') || roles.includes('testAdmin'), roles};
}

export default useRoles;