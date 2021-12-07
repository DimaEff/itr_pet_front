import React, {FC} from 'react';
import {Link, Outlet} from "react-router-dom";


const Admin: FC = ({children}) => {
    return (
        <div>
            <div>
                <Link to={'users'}>Test</Link>
                <Link to={'events'}>Test</Link>
                Admin
            </div>
            <Outlet />
        </div>
    );
};

export default Admin;