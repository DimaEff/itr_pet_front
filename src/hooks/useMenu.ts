import {Menus, getRoutes} from "../routing";
import {useAuth0} from "@auth0/auth0-react";

import {useRoles} from "./index";
import {IRoute} from "../routing/routes";


const useMenu = (names?: Menus[]): IRoute[] => {
    const {isAuthenticated} = useAuth0();
    const {isAdmin} = useRoles();

    return !names ?
        getRoutes(isAuthenticated, isAdmin):
        getRoutes(isAuthenticated, isAdmin)
            .filter(({menuName}) => menuName && names.includes(menuName));
}

export default useMenu;