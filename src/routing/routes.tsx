import React from "react";
import {RouteObject, Navigate} from 'react-router-dom';

import {Menus, Paths} from './consts';
import {Admin, Map, Profile} from '../pages';


export interface IRoute extends RouteObject{
    path: Paths;
    label?: string;
    menuName?: Menus;
    children?: IRoute[];
}

const redirectElement = <Navigate to={'/'}/>;

export const getRoutes = (isAuth: boolean, isAdmin: boolean ): IRoute[] => [
    {
        path: '/',
        element: <Map/>,
        label: 'Главная',
        menuName: 'main',
    },
    {
        path: 'admin',
        element: isAdmin ? <Admin/>: redirectElement,
        label: 'Админ панел',
        menuName: 'admin',
        children: [
            {
                path: 'users',
                element: <div>users</div>,
                label: 'Пользователи',
            },
            {
                path: 'events',
                element: <div>events</div>,
                label: 'События',
            },
        ],
    },
    {
        path: 'profile',
        element: isAuth ? <Profile />: redirectElement,
        label: 'Профиль',
        menuName: 'user',
    }
];