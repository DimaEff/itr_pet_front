import React, {lazy} from "react";
import {Navigate, RouteObject} from 'react-router-dom';
import {withSuspense} from 'react-suspenser';

import {Menus, Paths} from './consts';
import {Home} from '../pages';
import {Loader} from "../components/common/Loader";


const loader = <Loader withBackdrop/>;
const RedirectElement = () => <Navigate to={'/'}/>;

const Profile = withSuspense(loader)(
    lazy(() => import('../pages/Profile'))
);

const Admin = withSuspense(loader)(
    lazy(() => import('../pages/Admin'))
);

const AdminUsers = withSuspense(loader)(
    lazy(() => import('../components/Admin/Users/AdminUsers'))
);

const AdminEvents = withSuspense(loader)(
    lazy(() => import('../components/Admin/Events/AdminEvents'))
);

const AdminEventTypes = withSuspense(loader)(
    lazy(() => import('../components/Admin/EventTypes/AdminEventTypes'))
);

export interface IRoute extends RouteObject {
    path: Paths;
    label?: string;
    menuName?: Menus;
    children?: IRoute[];
}


export const getRoutes = (isAuth: boolean, isAdmin: boolean): IRoute[] => [
    {
        path: '/',
        element: <Home/>,
        label: 'Home',
        menuName: 'main',
    },
    {
        path: 'admin',
        element: isAdmin ? <Admin/> : <RedirectElement/>,
        label: 'Admin panel',
        menuName: 'admin',
        children: [
            {
                path: 'users',
                element: <AdminUsers/>,
                label: 'Users',
                menuName: 'admin.children',
            },
            {
                path: 'events',
                element: <AdminEvents/>,
                label: 'Events',
                menuName: 'admin.children',
            },
            {
                path: 'event-types',
                element: <AdminEventTypes/>,
                label: 'EventCard Types',
                menuName: 'admin.children',
            },
        ]
    },
    {
        path: 'profile',
        element: isAuth ? <Profile/> : <RedirectElement/>,
        label: 'Profile',
        menuName: 'user',
    }
];