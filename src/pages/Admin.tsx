import React from 'react';
import {Link} from "react-router-dom";


const Admin = () => {
    return (
        <div>
            <Link to={'users'}>Test</Link>
            <Link to={'events'}>Test</Link>
            Admin
        </div>
    );
};

export default Admin;