import {FC} from "react";
import {useNavigate} from 'react-router-dom';

import * as paths from '../appRouter/paths';
import {useUserRoles} from "../hooks";


const withOnlyAdmin = (Component: FC) => {
    const roles = useUserRoles();
    const navigator = useNavigate();

    if (roles.includes('admin')) {
        navigator(paths.HOME);
    }

    return <Component>

    </Component>
}