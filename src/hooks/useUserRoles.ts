import {useAuth0} from "@auth0/auth0-react";


const useUserRoles = (): () => Promise<string[] | null> => {
    const {isAuthenticated, getIdTokenClaims} = useAuth0();

    return async (): Promise<string[] | null> => {
        if (!isAuthenticated) {
            return null;
        }

        const key = process.env.REACT_APP_AUTH0_AUDIENCE + '/roles';
        const idTokenClaims = await getIdTokenClaims();

        return idTokenClaims[key];
    };
}

export default useUserRoles;