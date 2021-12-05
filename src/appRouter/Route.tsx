import React, {FC} from 'react';
import {Route as R} from 'react-router-dom';

import {IRoute} from "./routes";



interface RouteProps {
    route: IRoute;
}

const Route: FC<RouteProps> = ({route}) => {
    return (
        <R
            index={route.index}
            path={route.path}
            element={route.element}
        >
            {route.children?.map(r => <Route route={r}/>)}
        </R>
    );
};

export default Route;