import React, {lazy} from "react";
import {RouteObject, Navigate} from 'react-router-dom';
import {withSuspense} from 'react-suspenser';

import {Menus, Paths} from './consts';
import {Home} from '../pages';
import {Loader} from "../components/common/Loader";
import {AdminEvents, AdminUsers} from "../components/Admin";


const loader = <Loader withBackdrop/>;
const RedirectElement = () => <Navigate to={'/'}/>;

const Admin = withSuspense(loader)(
    lazy(() => import('../pages/Admin'))
);

const Profile = withSuspense(loader)(
    lazy(() => import('../pages/Profile'))
);


export interface IRoute extends RouteObject{
    path: Paths;
    label?: string;
    menuName?: Menus;
    children?: IRoute[];
}


export const getRoutes = (isAuth: boolean, isAdmin: boolean ): IRoute[] => [
    {
        path: '/',
        element: <Home/>,
        label: 'Home',
        menuName: 'main',
    },
    {
        path: 'admin',
        element: isAdmin ? <Admin />: <RedirectElement />,
        label: 'Admin panel',
        menuName: 'admin',
    },
    {
        path: 'profile',
        element: isAuth ? <Profile />: <RedirectElement />,
        label: 'Profile',
        menuName: 'user',
    }
];