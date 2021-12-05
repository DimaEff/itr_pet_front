import React, {ComponentElement, FC} from "react";

import * as paths from './paths';
import {Map, Admin} from '../pages';


export interface IRoute {
    path: string;
    element: ComponentElement<any, any>;
    index?: boolean;
    children?: IRoute[];
    protectHOC?: (component: FC) => FC;
}

export const ROUTES: IRoute[] = [
    {
        path: paths.HOME,
        element: <Map/>,
    },
    {
        path: paths.ADMIN,
        element: <Admin/>,
        children: [
            {
                path: 'users',
                element: <div>users</div>,
            },
            {
                path: 'events',
                element: <div>events</div>,
            },
        ],
    },
];