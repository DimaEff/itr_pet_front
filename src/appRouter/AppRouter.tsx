import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

// import Route from './Route';
import {IRoute, ROUTES} from './routes'
import {Admin, Map} from "../pages";


const AppRouter = () => {
    const routes = (rs: IRoute[] | undefined) => rs?.map(r => <Route path={r.path} element={r.element}>
        {routes(r.children)}
    </Route>)

    return (
        <Routes>
            {routes(ROUTES)}
            {/*{ROUTES.map(r => <Route route={r}/>)}*/}
            <Route path="*" element={<Map />} />
        </Routes>
    );
};

export default AppRouter;