import {useAuth0} from "@auth0/auth0-react";

import {getRoutes, Menus} from "../routing";
import {useRoles} from "./index";
import {IRoute} from "../routing/routes";


const isRouteIncluded = (names: Menus[], menuName: Menus | undefined) => menuName && names.includes(menuName);

const useMenu = (names?: Menus[], deep = false): IRoute[] => {
    const {isAuthenticated} = useAuth0();
    const {isAdmin} = useRoles();

    const routes = getRoutes(isAuthenticated, isAdmin);

    if (!names) {
        return routes;
    }

    if (!deep) {
        return routes.filter(({menuName}) => isRouteIncluded(names, menuName));
    }

    const includedRoutes: IRoute[] = [];
    routes.forEach(function f(route) {
        const {children, menuName} = route;

        if (children) {
            children.forEach(f);
        }

        if (isRouteIncluded(names, menuName)) {
            includedRoutes.push(route);
        }
    });

    return includedRoutes;
}

export default useMenu;